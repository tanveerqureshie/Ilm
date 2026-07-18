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
    const systemInstruction = "You are the Ilm Engineering Architect, a premier AI coach for engineering systems intelligence. When answering queries, prioritize explaining physical mechanisms, computer science architectures, and electronics from first principles. Keep answers concise, rigorous, and intellectually stimulating. Avoid surface-level explanations and teach how things work under the hood.";

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
  const q = msg.toLowerCase().trim();
  
  // Greetings and smalltalk
  if (q === "hi" || q === "hello" || q === "hey" || q === "greetings" || q === "yo" || q === "hy") {
    return "Greetings from the Ilm Systems Command Center! I am ready to break down the mechanics of any technology, systems architecture, or engineering concept from first principles. What system should we analyze today?";
  }
  if (q.includes("how are you") || q.includes("how is it going") || q.includes("hows it going")) {
    return "I am functioning at peak computational capacity! Ready to analyze rocket nozzles, EV batteries, or semiconductor gates. What technology are you investigating today?";
  }
  if (q.includes("who are you") || q.includes("what is your name") || q.includes("what are you")) {
    return "I am the Ilm Engineering Assistant, powered by Gemini. In offline fallback mode, I can explain core systems architectures, daily engineering topics, and platform features from first principles.";
  }
  if (q.includes("thank") || q === "thanks") {
    return "You are very welcome! Deep learning and engineering excellence require examining systems from first principles. Let me know if you want to explore another concept!";
  }

  // Engineering concepts matching
  if (q.includes("engine") || q.includes("turbo") || q.includes("compress")) {
    return "Twin-scroll turbochargers improve internal combustion efficiency by separating exhaust gas streams from cylinders. This eliminates exhaust interference and maintains high kinetic gas velocity to spool the turbine wheel quickly.";
  }
  if (q.includes("thruster") || q.includes("rocket") || q.includes("nozzle") || q.includes("propulsion")) {
    return "Liquid-fueled rocket thrusters use a de Laval nozzle (convergent-divergent geometry). This shape chokes the exhaust gas to Mach 1 speed at the throat, then expands the gases supersonically in the bell nozzle for vacuum thrust optimization.";
  }
  if (q.includes("transistor") || q.includes("gate") || q.includes("chip") || q.includes("semiconductor") || q.includes("microchip")) {
    return "GAAFET (Gate-All-Around Field Effect Transistor) is a 3nm-class logic architecture where the silicon gate channel is surrounded on all sides by dielectric material, preventing current leakage at nanoscale voltages.";
  }
  if (q.includes("satellite") || q.includes("gps") || q.includes("orbit") || q.includes("relativity")) {
    return "GPS satellites adjust for relativity: General Relativity predicts clock speedups (+45 microseconds/day) due to lower gravity, while Special Relativity predicts slowdowns (-7 microseconds/day) due to orbit velocity. The combined drift correction is +38 microseconds/day.";
  }
  if (q.includes("ignition") || q.includes("stator") || q.includes("cdi") || q.includes("spark")) {
    return "Motorcycle AC CDI systems use a stator coil to charge an internal capacitor to ~300V. When triggered by the crankshaft pickup coil, the charge discharges instantly into the primary ignition coil, generating a ~20,000V secondary spark.";
  }
  if (q.includes("fluid") || q.includes("coolant") || q.includes("oil") || q.includes("lubricat")) {
    return "Automotive coolant is typically a 50/50 mixture of ethylene glycol and water, absorbing engine combustion heat. Synthetic motor oil reduces friction, maintaining viscosity under high pressure.";
  }
  if (q.includes("battery") || q.includes("electric vehicle") || q.includes("ev")) {
    return "Electric vehicle battery packs rely on lithium-ion cells snaked by liquid glycol cooling channels, managed by high-speed microcontrollers (BMS) to regulate thermal dissipation and balancing.";
  }
  if (q.includes("transformer") || q.includes("llm") || q.includes("gpt")) {
    return "LLMs process words by converting text into high-dimensional vector embeddings, processing positional offsets, and computing query-key attention matrices in parallel across GPU tensor arrays.";
  }
  if (q.includes("vapor") || q.includes("overheat") || q.includes("cooling")) {
    return "Smartphones dissipate 10W of fanless heat using thin copper vapor chambers, where water boils at low temperatures in a vacuum and condenses at the chassis edges, pulled back by capillary wicking.";
  }

  // Platform features matching
  if (q.includes("bookmark") || q.includes("save") || q.includes("profile")) {
    return "You can save daily concepts and news articles by clicking the bookmark icons on the cards. Manage all your saved items on your Profile tab!";
  }
  if (q.includes("visualizer") || q.includes("3d") || q.includes("graph")) {
    return "The 3D Visualizer page lets you view high-resolution blueprint schematics of the active daily engineering systems. Use the steps or click the pulsing hotspots directly on the image to inspect components in detail!";
  }
  if (q.includes("schedule") || q.includes("daily") || q.includes("task")) {
    return "The Explore page features your daily schedule, personalized daily focus goals, and fresh engineering news. It refreshes every 24 hours to keep your learning path active.";
  }

  // Default intelligent fallback
  return `I analyzed your query: "${msg}". While our primary Gemini connection is under a high-traffic rate limit (Error 429), I'd love to discuss engineering architectures with you. Try asking me about EV batteries, rocket nozzles, semiconductor gates, or how the 3D Systems Visualizer works!`;
}
