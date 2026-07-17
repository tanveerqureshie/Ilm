import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let userMessage = "";
  try {
    const { message, history } = await req.json();
    userMessage = message || "";
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      const responseText = getFallbackResponse(userMessage);
      return NextResponse.json({ text: responseText });
    }

    const contents: any[] = [];
    const systemInstruction = "You are Ilm Assistant, a helpful AI guide for the Ilm daily knowledge dashboard. Keep answers concise, intellectual, and friendly.";

    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        });
      });
    }

    contents.push({
      role: "user",
      parts: [{ text: `${systemInstruction}\n\nUser: ${userMessage}` }]
    });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error(`Gemini API Response Error Status: ${response.status}, Body: ${errBody}`);
      throw new Error(`Gemini API failed with status ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't process that request.";
    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("Gemini API Route Error:", error);
    // Graceful fallback to offline smart assistant instead of breaking the chatbot experience
    const fallbackText = getFallbackResponse(userMessage);
    return NextResponse.json({ text: fallbackText });
  }
}

function getFallbackResponse(msg: string): string {
  const q = msg.toLowerCase();
  if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
    return "Hello! I am your Ilm daily learning companion. How can I help you today?";
  }
  if (q.includes("about") || q.includes("creator") || q.includes("who built")) {
    return "Ilm is a daily knowledge operating system designed to help learners build positive daily habits. You can read more in our About page!";
  }
  if (q.includes("latent") || q.includes("samay")) {
    return "Yes! Samay Raina's hit show 'India's Got Latent' has opened auditions for Season 2. You can read the latest updates in our Scroll Ilm tab!";
  }
  if (q.includes("concept") || q.includes("quantum")) {
    return "Today's featured concept in the Knowledge Hub is Quantum Superposition. It lets qubits represent 0 and 1 simultaneously!";
  }
  return `Regarding your query: "${msg}". I am here to help you study, keep track of goals, and practice daily puzzles!`;
}
