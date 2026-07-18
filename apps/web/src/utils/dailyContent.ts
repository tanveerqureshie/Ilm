// Date-seeded daily content generator for Ilm
// Ensures content changes dynamically every calendar day

export interface DailyNews {
  worldNews: { title: string; summary: string; source: string; tag: string }[];
  indiaTechNews: { title: string; summary: string; source: string; tag: string }[];
  jkNews: { title: string; summary: string; source: string; tag: string }[];
  youtuberNews: { title: string; summary: string; source: string; tag: string }[];
}

export interface DailyConcepts {
  upsc: { title: string; summary: string; tag: string; significance: string };
  medical: { title: string; summary: string; tag: string; significance: string };
  finance: { title: string; summary: string; tag: string; significance: string };
  tech: { title: string; summary: string; tag: string; significance: string };
}

export interface DailyVocab {
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  definition: string;
  hindiTranslation: string;
  urduTranslation: string;
  example: string;
  synonyms: string[];
}

export interface DailyChallenge {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

// Simple deterministic hash based on calendar date
function getSeededIndex(length: number, offset: number = 0): number {
  if (typeof window === "undefined") return 0;
  const d = new Date();
  const seed = (d.getFullYear() * 372) + (d.getMonth() * 31) + d.getDate() + offset;
  return seed % length;
}

// 1. Database of News Items
const WORLD_NEWS_POOL = [
  {
    title: "Global Central Banks Coordinate Rate Strategies",
    summary: "In a joint meeting, monetary authorities signaled a transition to structured rate easing to buffer secondary job markets against manufacturing contraction.",
    source: "Financial Times",
    tag: "World News"
  },
  {
    title: "Fusion Energy Output Reaches Commercial Threshold Milestone",
    summary: "Experimental reactors achieved sustained ignition temperatures for over an hour, indicating viable engineering progress towards grid integration.",
    source: "Nature Energy",
    tag: "World News"
  },
  {
    title: "Global Grain Trade Corridors Shift to South American Ports",
    summary: "Infrastructure investments in Brazil and Argentina have restructured supply routes, lowering transport costs across the Pacific basin.",
    source: "Reuters",
    tag: "World News"
  },
  {
    title: "NASA Webb Telescope Uncovers Atmosphere on TRAPPIST-1 Exoplanet",
    summary: "Astronomers detected trace carbon signatures on the Earth-sized exoplanet, a key milestone in the search for habitable biosignatures outside our solar system.",
    source: "Nature Astronomy",
    tag: "World News"
  },
  {
    title: "Global Climate Accord Enforces Maritime Shipping Emissions Cap",
    summary: "A coalition of 120 countries passed binding limits on carbon outputs for international container fleets, accelerating transition to hydrogen fuel.",
    source: "Bloomberg Green",
    tag: "World News"
  },
  {
    title: "Renewable Energy Crosses 40% Threshold Across European Union",
    summary: "Wind and solar infrastructure outpaced coal and gas generation combined for the first time during the second quarter of the fiscal year.",
    source: "Euronews",
    tag: "World News"
  }
];

const INDIA_TECH_NEWS_POOL = [
  {
    title: "India Launches Indigenous Quantum Crypto Sandbox",
    summary: "The Ministry of Electronics is deploying quantum key distribution trials across banking sectors in Delhi and Bengaluru to secure public ledgers.",
    source: "ET Tech",
    tag: "India Technology"
  },
  {
    title: "Domestic Semiconductor Fabricator Commences Pilot Production",
    summary: "India's first commercial silicon fabrication unit began processing test wafers, targeting power-management microchips for electric vehicles.",
    source: "LiveMint",
    tag: "India Technology"
  },
  {
    title: "Defense Startup Unveils Autonomous High-Altitude Drone Grid",
    summary: "A Bengaluru startup completed successful test flights of solar-powered surveillance drones capable of remaining airborne for consecutive weeks.",
    source: "Hindustan Times",
    tag: "India Technology"
  },
  {
    title: "ISRO Launches Next-Gen Navigation Satellite Fleet",
    summary: "The Indian Space Research Organisation deployed advanced NavIC satellites to improve civilian location accuracy down to one meter.",
    source: "NDTV Tech",
    tag: "India Technology"
  },
  {
    title: "Unified Payments Interface (UPI) Launches Across South East Asia",
    summary: "India's instant payment framework is now accepted in Singapore and Thailand, enabling seamless cross-border retail merchant transfers.",
    source: "Business Standard",
    tag: "India Technology"
  },
  {
    title: "AI Startup Launches Localized Indic LLM for Healthcare Diagnostics",
    summary: "A new medical foundation model trained on regional Indian dialects helps rural practitioners translate diagnostics records instantly.",
    source: "TechCrunch",
    tag: "India Technology"
  }
];

const JK_NEWS_POOL = [
  {
    title: "Chenab Rail Bridge Commences Regular Passenger Operations",
    summary: "The world's highest rail arch bridge is now fully operational, cutting travel times between Jammu and Srinagar by over four hours.",
    source: "Greater Kashmir",
    tag: "J&K Update"
  },
  {
    title: "Geothermal Power Exploration Begins in Puga Valley",
    summary: "Energy researchers began core drilling in the high-altitude valley, tapping into subsurface hot springs to generate clean energy for remote hamlets.",
    source: "Kashmir Reader",
    tag: "J&K Update"
  },
  {
    title: "Kashmir Saffron Receives Boost with New Cold-Chain Facility",
    summary: "A state-of-the-art storage facility in Pampore is helping growers preserve aromatic qualities, fetching premium export values globally.",
    source: "Kashmir Life",
    tag: "J&K Update"
  },
  {
    title: "J&K Tourism Registers Record-Breaking Winter Footfall in Gulmarg",
    summary: "Over one million visitors arrived during the winter season, boosting regional hospitality sectors and creating local micro-entrepreneurship roles.",
    source: "Greater Kashmir",
    tag: "J&K Update"
  },
  {
    title: "Srinagar Smart City Deploys Fully Electric Public Bus Fleet",
    summary: "Eighty zero-emission buses commenced passenger routes across the district, targeting reduced particulate pollution near Dal Lake.",
    source: "Rising Kashmir",
    tag: "J&K Update"
  },
  {
    title: "Gurez Valley Connected to National Electricity Grid",
    summary: "The high-altitude border valley received standard transmission line connectivity, ending decade-long reliance on diesel generator grids.",
    source: "Kashmir Reader",
    tag: "J&K Update"
  }
];

const YOUTUBER_NEWS_POOL = [
  {
    title: "Tech Burner Announces Creative Tech Studio Expansion",
    summary: "Shlok Srivastava revealed plans to establish a hardware incubation workshop in Mumbai, encouraging youth to construct consumer gadgets locally.",
    source: "Creator Economy Digest",
    tag: "Indian Creator Community"
  },
  {
    title: "Sandeep Maheshwari Launches Free Offline Mental Health Seminars",
    summary: "The veteran educational creator announced a country-wide series of free interactive workshops focusing on student stress relief and career choices.",
    source: "YouTube Community Wire",
    tag: "Indian Creator Community"
  },
  {
    title: "CarryMinati Achieves Milestone with Charity Streaming Drive",
    summary: "Ajey Nagar hosted a 24-hour streaming session, collecting over 50 Lakhs for flood rehabilitation programs across Eastern India states.",
    source: "Social Samosa",
    tag: "Indian Creator Community"
  },
  {
    title: "Tech Burner's 'Overlays' Brand Launches Recycled Tech Wear",
    summary: "Shlok Srivastava released a new lineup of sustainable consumer merchandise designed from processed ocean plastics.",
    source: "Indian Retailer",
    tag: "Indian Creator Community"
  },
  {
    title: "Sandeep Maheshwari Hosts Panel on Youth Career Stress Solutions",
    summary: "The speaker brought together educators and psychologists to detail actionable ways for students to deal with exam pressures.",
    source: "Education Times",
    tag: "Indian Creator Community"
  },
  {
    title: "CarryMinati Launches Satirical Parody Video on Short-Video Trends",
    summary: "Ajey Nagar released a new comedic satire commenting on viral algorithms, racking up ten million views within hours of publication.",
    source: "Social Samosa",
    tag: "Indian Creator Community"
  }
];

// 2. Database of Concepts
const UPSC_POOL = [
  {
    title: "Basic Structure Doctrine",
    summary: "A landmark judicial doctrine ruling that the Parliament can amend the Constitution, but cannot destroy its core identity.",
    tag: "UPSC Polity",
    significance: "Established by the Supreme Court in the Kesavananda Bharati case (1973), securing judicial checks over legislative amendments."
  },
  {
    title: "Article 21: Right to Life & Personal Liberty",
    summary: "Declares that no person shall be deprived of life or personal liberty except according to procedure established by law.",
    tag: "UPSC Polity",
    significance: "Widely expanded by the judiciary to include the right to clean water, privacy, shelter, and a pollution-free environment."
  },
  {
    title: "Panchayati Raj System (73rd Amendment)",
    summary: "Constitutionalized local self-governance at the village level, mandating regular elections and reserving seats for women.",
    tag: "UPSC Governance",
    significance: "Transferred administrative power to rural councils, creating a decentralized structural tier of Indian democracy."
  }
];

const MEDICAL_POOL = [
  {
    title: "CAR-T Cell Immunotherapy",
    summary: "Modifying a patient's T-cells in the laboratory so they can specifically target and destroy cancer cells.",
    tag: "Medical Science",
    significance: "Represents a paradigm shift in oncology, offering potential long-term remission for leukemia and lymphoma cases."
  },
  {
    title: "CRISPR-Cas9 Gene Editing",
    summary: "A biochemical tool that acts like cellular scissors to edit genetic code sequences at precise DNA loci.",
    tag: "Medical Science",
    significance: "Allows researchers to modify disease-causing genes directly, paving the way for treating hereditary blood disorders."
  },
  {
    title: "Neuroplasticity & Synaptic Pruning",
    summary: "The human brain's ability to reorganize itself by forming new neural pathways and eliminating redundant synapses.",
    tag: "Neurology",
    significance: "Explains how the brain recovers from injuries, adjusts to novel environments, and locks in newly learned skills."
  }
];

const FINANCE_POOL = [
  {
    title: "Quantitative Easing (QE)",
    summary: "A monetary policy where a central bank purchases government securities to lower interest rates and inject liquidity.",
    tag: "Finance & Macroeconomics",
    significance: "Used as a stabilization tool during economic crises to encourage commercial borrowing and maintain credit flow."
  },
  {
    title: "Yield Curve Inversion",
    summary: "A financial phenomenon where short-term debt instruments carry higher yields than long-term bonds of the same credit risk.",
    tag: "Market Dynamics",
    significance: "Historically considered one of the most reliable leading indicators of upcoming macroeconomic recessions."
  },
  {
    title: "Modern Monetary Theory (MMT)",
    summary: "A controversial macroeconomic theory asserting that sovereign governments with fiat currencies can print unlimited money to fund public spendings.",
    tag: "Economic Theory",
    significance: "Shifts the emphasis from balancing annual federal deficits to monitoring structural inflation limits."
  }
];

const TECH_POOL = [
  {
    title: "Reasoning LLMs (System 2 Thinking)",
    summary: "Generative architectures that execute deliberate, step-by-step reasoning steps internally before producing text.",
    tag: "Artificial Intelligence",
    significance: "Greatly improves output accuracy in complex logic areas like math proofs, legal analysis, and code debugging."
  },
  {
    title: "Zero-Knowledge Proofs (ZKP)",
    summary: "A cryptographic method enabling one party to prove to another that a statement is true without revealing any secret data.",
    tag: "Cryptography",
    significance: "Forms the foundational architecture of privacy-centric blockchain networks and secure digital identities."
  },
  {
    title: "Graph Database Architectures",
    summary: "Database engines that represent records as nodes and relationships as edges rather than rows in rigid tables.",
    tag: "Data Infrastructure",
    significance: "Optimized for modeling complex, multi-layered associations like social network graphs and AI knowledge maps."
  }
];

// 3. Database of Vocabulary
const VOCAB_POOL: DailyVocab[] = [
  {
    word: "Ephemeral",
    pronunciation: "/ɪˈfemərəl/",
    partOfSpeech: "adjective",
    definition: "Lasting for a very short time; transient.",
    hindiTranslation: "अल्पकालिक (Alpakalik)",
    urduTranslation: "فانی (Faani) / عارضی (Aarzi)",
    example: "The beauty of spring cherry blossoms is ephemeral, lasting only a few days.",
    synonyms: ["fleeting", "transient", "short-lived"]
  },
  {
    word: "Resilient",
    pronunciation: "/rɪˈzɪliənt/",
    partOfSpeech: "adjective",
    definition: "Able to withstand or recover quickly from difficult conditions; tough.",
    hindiTranslation: "लचीला / जुझारू (Lachila)",
    urduTranslation: "لچکدار (Lachakdar) / ثابت قدم (Sabit Qadam)",
    example: "The local farmers showed a resilient spirit, rebuilding their fields immediately after the heavy rains.",
    synonyms: ["tough", "hardy", "adaptable"]
  },
  {
    word: "Pragmatic",
    pronunciation: "/præɡˈmætɪk/",
    partOfSpeech: "adjective",
    definition: "Dealing with situations practically and realistically rather than theoretically.",
    hindiTranslation: "व्यावहारिक (Vyavaharik)",
    urduTranslation: "عملی پسند (Amali Pasand)",
    example: "Taking a pragmatic approach to financing helped the small cooperative avoid bankruptcy.",
    synonyms: ["practical", "sensible", "down-to-earth"]
  },
  {
    word: "Ambivalent",
    pronunciation: "/æmˈbɪvələnt/",
    partOfSpeech: "adjective",
    definition: "Having mixed feelings or contradictory ideas about something or someone.",
    hindiTranslation: "दुविधा में (Duvidha mein)",
    urduTranslation: "تذبذب میں (Tazabzub mein) / دوغلا (Doghla)",
    example: "She remained ambivalent about the job offer, weighing the high salary against the long commute.",
    synonyms: ["undecided", "uncertain", "conflicted"]
  }
];

// 4. Database of Quiz Challenges
const CHALLENGE_POOL: DailyChallenge[] = [
  {
    question: "Evaluate the derivative: d/dx [sin(x) * e^x]",
    options: [
      "cos(x) * e^x",
      "e^x * [sin(x) + cos(x)]",
      "e^x * [sin(x) - cos(x)]",
      "sin(x) * e^x"
    ],
    answer: "e^x * [sin(x) + cos(x)]",
    explanation: "Using the Product Rule: (u*v)' = u'v + uv'. Let u = sin(x) and v = e^x. Thus, u' = cos(x) and v' = e^x. Output = cos(x)e^x + sin(x)e^x = e^x [sin(x) + cos(x)]."
  },
  {
    question: "UPSC Polity: Which case established the 'Basic Structure Doctrine' in India?",
    options: [
      "Golaknath v. State of Punjab (1967)",
      "Kesavananda Bharati v. State of Kerala (1973)",
      "Minerva Mills v. Union of India (1980)",
      "Maneka Gandhi v. Union of India (1978)"
    ],
    answer: "Kesavananda Bharati v. State of Kerala (1973)",
    explanation: "The landmark 13-judge bench in Kesavananda Bharati ruled that while Parliament has wide power to amend, it cannot alter the Constitution's core basic structure."
  },
  {
    question: "Trigonometry: Simplify the expression [sin²(θ) + cos²(θ)] / sec²(θ)",
    options: [
      "cos²(θ)",
      "sin²(θ)",
      "tan²(θ)",
      "1"
    ],
    answer: "cos²(θ)",
    explanation: "We know sin²(θ) + cos²(θ) = 1. Therefore, the expression simplifies to 1 / sec²(θ). Since sec(θ) = 1/cos(θ), this is equivalent to cos²(θ)."
  }
];

// Export helpers to get daily seeded content
export function getDailyNews(): DailyNews {
  const wIdx1 = getSeededIndex(WORLD_NEWS_POOL.length, 0);
  const iIdx1 = getSeededIndex(INDIA_TECH_NEWS_POOL.length, 1);
  const jIdx1 = getSeededIndex(JK_NEWS_POOL.length, 2);
  const yIdx1 = getSeededIndex(YOUTUBER_NEWS_POOL.length, 3);

  const wIdx2 = (wIdx1 + 1) % WORLD_NEWS_POOL.length;
  const iIdx2 = (iIdx1 + 1) % INDIA_TECH_NEWS_POOL.length;
  const jIdx2 = (jIdx1 + 1) % JK_NEWS_POOL.length;
  const yIdx2 = (yIdx1 + 1) % YOUTUBER_NEWS_POOL.length;

  return {
    worldNews: [WORLD_NEWS_POOL[wIdx1], WORLD_NEWS_POOL[wIdx2]],
    indiaTechNews: [INDIA_TECH_NEWS_POOL[iIdx1], INDIA_TECH_NEWS_POOL[iIdx2]],
    jkNews: [JK_NEWS_POOL[jIdx1], JK_NEWS_POOL[jIdx2]],
    youtuberNews: [YOUTUBER_NEWS_POOL[yIdx1], YOUTUBER_NEWS_POOL[yIdx2]]
  };
}

export function getDailyConcepts(): DailyConcepts {
  const uIdx = getSeededIndex(UPSC_POOL.length, 10);
  const mIdx = getSeededIndex(MEDICAL_POOL.length, 11);
  const fIdx = getSeededIndex(FINANCE_POOL.length, 12);
  const tIdx = getSeededIndex(TECH_POOL.length, 13);

  return {
    upsc: UPSC_POOL[uIdx],
    medical: MEDICAL_POOL[mIdx],
    finance: FINANCE_POOL[fIdx],
    tech: TECH_POOL[tIdx]
  };
}

export function getDailyVocab(): DailyVocab {
  const vIdx = getSeededIndex(VOCAB_POOL.length, 20);
  return VOCAB_POOL[vIdx];
}

export function getDailyChallenge(): DailyChallenge {
  const cIdx = getSeededIndex(CHALLENGE_POOL.length, 30);
  return CHALLENGE_POOL[cIdx];
}
