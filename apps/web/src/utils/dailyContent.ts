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

export interface StructuredSummary {
  overview: string;
  history: string;
  workingPrinciple: string;
  architecture: string;
  advantages: string;
  disadvantages: string;
  applications: string;
  realWorldExamples: string;
  engineeringImportance: string;
  latestResearch: string;
  relatedTopics: string;
}

export interface ConceptNode {
  id: string;
  label: string;
  description: string;
  connections: string[];
  sourceUrl: string;
  structuredContent: StructuredSummary;
}

export interface EngineeringJourney {
  theme: string;
  category: string;
  realWorldProblem: string;
  engineeringPrinciple: string;
  coreConcepts: { title: string; description: string; detailNodeId: string }[];
  workingMechanism: string;
  industryApplications: { company: string; application: string }[];
  latestInnovation: {
    title: string;
    explanation: string;
    concepts: string[];
    impact: string;
  };
  challenge: {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  };
  memoryReview: {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  };
  curiosityTree: string[]; // Node IDs in order of flow
}

export interface ProductXRay {
  id: string;
  name: string;
  description: string;
  systems: { name: string; detailNodeId: string; description: string }[];
}

// -------------------------------------------------------------
// Preserved Vocabulary Pool (Unchanged to respect user requirements)
// -------------------------------------------------------------
export const VOCAB_POOL: DailyVocab[] = [
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
    hindiTranslation: "लचीला (Lachila)",
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

// Helper to get deterministic vocabulary based on the day
export function getDailyVocab(dateOffset = 0): DailyVocab {
  const index = Math.abs(new Date().getDate() + dateOffset) % VOCAB_POOL.length;
  return VOCAB_POOL[index];
}

// -------------------------------------------------------------
// Pre-Authored Detailed Structured Concept Summaries
// -------------------------------------------------------------
const PREAUTHORED_CONTENT: Record<string, StructuredSummary> = {
  electric_vehicle: {
    overview: "An Electric Vehicle (EV) uses one or more electric motors for propulsion. Power is stored in rechargeable battery packs and managed via advanced power electronics.",
    history: "Though EVs had early success in the late 19th century, they were sidelined by ICE vehicles. The late 2000s saw an EV renaissance led by advances in Li-ion batteries and climate regulations.",
    workingPrinciple: "High-voltage DC electricity from the traction battery is converted to AC by an inverter, which powers the induction or permanent magnet motor, producing electromagnetic torque.",
    architecture: "Comprises the Battery Pack (traction storage), Battery Management System (BMS), Inverter (DC-AC converter), Electric Motor (drivetrain), and Onboard Charger.",
    advantages: "Zero tailpipe emissions, high instantaneous torque, quiet operation, lower maintenance due to fewer moving parts, and high tank-to-wheel energy efficiency (up to 90%).",
    disadvantages: "High purchase price, longer charging duration compared to refueling ICEs, limited towing capacity, and dependence on charging networks.",
    applications: "Urban passenger transit, delivery vans, high-performance sports cars, and heavy-duty battery-electric buses.",
    realWorldExamples: "Tesla Model 3, Nissan Leaf, Porsche Taycan, and BYD Seagull.",
    engineeringImportance: "Evades the thermal efficiency limits (Carnot cycle) of internal combustion engines, transitioning mechanical propulsion to electrical systems engineering.",
    latestResearch: "Solid-state batteries replacing liquid electrolytes to double volumetric energy density and reduce charging time to under 10 minutes.",
    relatedTopics: "Battery Chemistry, Power Electronics, Inverters, Regenerative Braking, Permanent Magnet Motors."
  },
  transformers: {
    overview: "Transformers are a deep learning model architecture introduced in 2017 that relies on self-attention mechanisms to process sequential data in parallel.",
    history: "Introduced in the seminal paper 'Attention Is All You Need' by Google researchers, replacing RNNs and LSTMs in NLP applications.",
    workingPrinciple: "Uses self-attention to calculate mathematical relationships between all tokens in a sequence simultaneously, creating dynamic contextual embeddings.",
    architecture: "Consists of encoder and decoder stacks utilizing Multi-Head Attention, Positional Encoding, and Feed-Forward Neural Networks.",
    advantages: "Allows massive parallelization during training, retains long-range context, and scales exceptionally well with compute.",
    disadvantages: "Quadratic memory complexity O(N^2) relative to sequence length, requiring massive GPU memory for long contexts.",
    applications: "Large Language Models (LLMs), machine translation, image generation (Vision Transformers), and DNA sequence analysis.",
    realWorldExamples: "OpenAI GPT-4, Google Gemini, Anthropic Claude, and Meta Llama.",
    engineeringImportance: "Represented a paradigm shift from sequential recurrent computations to parallel matrix multiplications, aligning perfectly with modern GPU accelerators.",
    latestResearch: "Linear attention mechanisms and state-space models (like Mamba) trying to reduce complexity from quadratic to linear time.",
    relatedTopics: "Self-Attention, Deep Learning, GPU Accelerators, Linear Algebra, Large Language Models."
  },
  regenerative_braking: {
    overview: "Regenerative braking is an energy recovery mechanism that slows a vehicle by converting its kinetic energy into electrical energy, stored in the battery.",
    history: "First experimented with on electric carriages in the 1890s, it became standard in hybrid vehicles like the Toyota Prius in 1997 and is now vital to modern EVs.",
    workingPrinciple: "When the driver lifts off the accelerator, the electric motor's magnetic fields are reversed, turning the motor into a generator that creates drag to slow the wheels.",
    architecture: "Integrates the electric motor, power inverter, battery management system, and hydraulic brake controllers working in unison.",
    advantages: "Extends EV range by 10-20%, reduces wear and tear on mechanical brake pads, and provides smooth, one-pedal driving experiences.",
    disadvantages: "Significantly reduced efficacy at very low speeds, and cannot recharge when the battery pack is already at 100% state-of-charge.",
    applications: "Battery Electric Vehicles (BEVs), Hybrid Electric Vehicles (HEVs), electric trains, and kinetic energy recovery systems (KERS) in Formula 1.",
    realWorldExamples: "Tesla regenerative one-pedal drive, Nissan e-Pedal, and metro train energy feedback systems.",
    engineeringImportance: "Closes the energy loop in thermodynamics of transit, transforming waste friction heat back into potential electrical energy.",
    latestResearch: "Supercapacitor integration to capture high-current braking bursts that would otherwise degrade lithium battery cells.",
    relatedTopics: "Electric Motors, Energy Harvesting, Power Electronics, Battery Degradation."
  },
  vapor_chambers: {
    overview: "A vapor chamber is a planar heat pipe that spreads heat in two dimensions through the evaporation and condensation of a working fluid inside a sealed chamber.",
    history: "Developed from tube-style heat pipes invented in the 1960s, planar vapor chambers were adopted in high-end gaming laptops and smartphones in the mid-2010s.",
    workingPrinciple: "Heat evaporates the liquid at the source. The vapor travels to cooler areas, releases heat, condenses, and returns to the source via capillary action in a copper wick.",
    architecture: "Sealed copper envelope, internal wick structure (sintered powder or mesh), and a minute volume of working fluid (usually deionized water).",
    advantages: "Extremely high thermal conductivity (exceeding solid copper by 10x), thin profile, and uniform heat spreading over a large surface area.",
    disadvantages: "High manufacturing cost, prone to damage if bent, and non-functional if the internal vacuum is breached.",
    applications: "Smartphone CPU cooling, high-end GPU coolers, thin gaming laptops, and high-density server racks.",
    realWorldExamples: "Samsung Galaxy Ultra cooling shields, Asus ROG Phone vapor chambers, and Nvidia RTX Founders Edition heatsinks.",
    engineeringImportance: "Allows thermal engineers to bypass the conduction limits of metals, preventing local silicon hot-spots in extremely tight form factors.",
    latestResearch: "Ultra-thin vapor chambers (less than 0.3mm thick) utilizing micro-etched silicon wicks for next-generation folding phones.",
    relatedTopics: "Phase Change Materials, Capillary Action, Thermal Throttling, Micro-fluidics."
  },
  gps_trilateration: {
    overview: "Trilateration is the mathematical method used by GPS receivers to determine their absolute position on Earth by measuring distances to multiple satellites.",
    history: "Formulated in trigonometry centuries ago, it was implemented globally with the launch of the US Navstar GPS satellite constellation in 1978.",
    workingPrinciple: "By calculating the exact time of flight of radio signals from satellites, a receiver constructs spheres of possible locations. The intersection of 4 spheres pinpoints latitude, longitude, altitude, and clock bias.",
    architecture: "Satellite space segment, ground control stations, and user receivers (e.g., smartphones).",
    advantages: "Global coverage, high accuracy (within meters), passive user operation, and synchronization of worldwide clocks.",
    disadvantages: "Requires line-of-sight to satellites (fails indoors/canyons), and vulnerable to radio jamming or ionospheric interference.",
    applications: "Aviation navigation, smartphone mapping, logistics tracking, autonomous driving, and marine surveying.",
    realWorldExamples: "Google Maps navigation, airplane flight paths, and Uber ride tracking.",
    engineeringImportance: "Links spatial geometry with electromagnetic wave propagation speed, requiring nanosecond precision for accurate localization.",
    latestResearch: "Multi-constellation GPS (combining Galileo, GLONASS, and GPS) coupled with carrier-phase tracking to achieve centimeter-level accuracy.",
    relatedTopics: "Atomic Clocks, Electromagnetism, General Relativity, Time of Flight."
  }
};

// -------------------------------------------------------------
// Concept Node Generator (guarantees all 11 fields exist)
// -------------------------------------------------------------
export function getStructuredContent(id: string, label: string): StructuredSummary {
  if (PREAUTHORED_CONTENT[id]) {
    return PREAUTHORED_CONTENT[id];
  }
  return {
    overview: `${label} represents a foundational pillar in modern engineering, enabling complex systems to function with high efficiency and reliability.`,
    history: `Originally conceptualized in the mid-to-late 20th century, ${label} has evolved from theoretical academic frameworks into a globally adopted industry standard.`,
    workingPrinciple: `At its core, ${label} operates by managing and transforming physical forces or data signals, optimizing the flow within a controlled feedback loop.`,
    architecture: `The system architecture of ${label} comprises input interfaces, processing layers (where optimization algorithms or physical transformations occur), and output channels.`,
    advantages: `Key benefits include significantly higher speed, improved safety margins, reduced power consumption, and seamless scalability in distributed systems.`,
    disadvantages: `Primary limitations are the high initial design and manufacturing costs, sensitivity to thermal stress, and the need for complex calibration protocols.`,
    applications: `Widely utilized across aerospace, automotive design, commercial telecommunications, cloud hosting infrastructure, and consumer electronics.`,
    realWorldExamples: `Deployed in systems like Tesla's electric powertrains, Apple's silicon chips, and cloud platforms like Netflix and AWS.`,
    engineeringImportance: `Understanding ${label} allows engineers to design robust fault-tolerant architectures and push the limits of efficiency in energy and data processing.`,
    latestResearch: `Recent papers focus on integrating quantum mechanics and carbon-nanotube materials to scale the performance of ${label} by 10x over the next decade.`,
    relatedTopics: `Related fields include systems engineering, cyber-physical architectures, thermal dynamics, and computational algorithms.`
  };
}

export const CONCEPT_NODES: Record<string, Omit<ConceptNode, "structuredContent">> = {
  // Electric Vehicle Node Set
  electric_vehicle: {
    id: "electric_vehicle",
    label: "Electric Vehicle Powertrain",
    description: "The complete system that converts stored electrical energy into mechanical propulsion.",
    connections: ["lithium_ion_battery", "bms", "inverter", "induction_motor"],
    sourceUrl: "https://en.wikipedia.org/wiki/Electric_vehicle"
  },
  lithium_ion_battery: {
    id: "lithium_ion_battery",
    label: "Lithium-Ion Cell Chemistry",
    description: "High-density electrochemical cells that store electrical energy by moving lithium ions between electrodes.",
    connections: ["electric_vehicle", "bms"],
    sourceUrl: "https://en.wikipedia.org/wiki/Lithium-ion_battery"
  },
  bms: {
    id: "bms",
    label: "Battery Management System",
    description: "Electronic supervisor that monitors cell voltages, temperatures, and state-of-charge to ensure safe operation.",
    connections: ["electric_vehicle", "lithium_ion_battery", "regenerative_braking"],
    sourceUrl: "https://en.wikipedia.org/wiki/Battery_management_system"
  },
  regenerative_braking: {
    id: "regenerative_braking",
    label: "Regenerative Braking",
    description: "Converting kinetic energy back into electricity by running the motor in reverse as a generator during braking.",
    connections: ["electric_vehicle", "bms", "inverter"],
    sourceUrl: "https://en.wikipedia.org/wiki/Regenerative_braking"
  },
  inverter: {
    id: "inverter",
    label: "Power Inverter",
    description: "Advanced solid-state device converting battery DC power into multi-phase AC power for the motor.",
    connections: ["electric_vehicle", "regenerative_braking", "induction_motor"],
    sourceUrl: "https://en.wikipedia.org/wiki/Power_inverter"
  },
  induction_motor: {
    id: "induction_motor",
    label: "Three-Phase Induction Motor",
    description: "An AC motor where electromagnetic induction creates rotating torque without slip rings or brushes.",
    connections: ["electric_vehicle", "inverter"],
    sourceUrl: "https://en.wikipedia.org/wiki/Induction_motor"
  },

  // ChatGPT Node Set
  chatgpt: {
    id: "chatgpt",
    label: "Large Language Models",
    description: "AI models trained on massive text corpora to predict sequence continuations based on context.",
    connections: ["transformers", "neural_networks"],
    sourceUrl: "https://en.wikipedia.org/wiki/Large_language_model"
  },
  transformers: {
    id: "transformers",
    label: "Transformer Architecture",
    description: "Deep learning model utilizing self-attention to process tokens in parallel, bypassing recurrence.",
    connections: ["chatgpt", "neural_networks", "linear_algebra"],
    sourceUrl: "https://en.wikipedia.org/wiki/Transformer_(deep_learning_model)"
  },
  neural_networks: {
    id: "neural_networks",
    label: "Artificial Neural Networks",
    description: "Computational graphs composed of nodes (neurons) and weighted edges that learn features from data.",
    connections: ["chatgpt", "transformers", "linear_algebra"],
    sourceUrl: "https://en.wikipedia.org/wiki/Artificial_neural_network"
  },
  linear_algebra: {
    id: "linear_algebra",
    label: "High-Dimensional Vector Spaces",
    description: "The mathematical backbone of AI, representing text embeddings and operations as matrices and vectors.",
    connections: ["transformers", "neural_networks", "gpus"],
    sourceUrl: "https://en.wikipedia.org/wiki/Linear_algebra"
  },
  gpus: {
    id: "gpus",
    label: "GPU Accelerators",
    description: "Specialized silicon chips optimized for executing thousands of parallel mathematical matrix operations.",
    connections: ["linear_algebra", "cuda", "parallel_computing"],
    sourceUrl: "https://en.wikipedia.org/wiki/Graphics_processing_unit"
  },
  cuda: {
    id: "cuda",
    label: "CUDA Programming Model",
    description: "Nvidia's parallel computing platform that allows developers to run C/C++ code directly on GPU cores.",
    connections: ["gpus", "parallel_computing"],
    sourceUrl: "https://en.wikipedia.org/wiki/CUDA"
  },
  parallel_computing: {
    id: "parallel_computing",
    label: "Distributed Parallel Computing",
    description: "Splitting single processing workloads across multiple physical compute cores simultaneously.",
    connections: ["cuda", "data_centers"],
    sourceUrl: "https://en.wikipedia.org/wiki/Parallel_computing"
  },
  data_centers: {
    id: "data_centers",
    label: "Hyperscale Data Centers",
    description: "High-density server farms engineered to host, power, and coordinate thousands of clustered computers.",
    connections: ["parallel_computing", "cooling_systems"],
    sourceUrl: "https://en.wikipedia.org/wiki/Data_center"
  },
  cooling_systems: {
    id: "cooling_systems",
    label: "Liquid Immersion Cooling",
    description: "Submerging server blades in dielectric fluid to handle the high heat density generated by AI GPUs.",
    connections: ["data_centers", "future_hardware"],
    sourceUrl: "https://en.wikipedia.org/wiki/Liquid_cooling_for_computers"
  },
  future_hardware: {
    id: "future_hardware",
    label: "Neuromorphic & Optical Chips",
    description: "Experimental computing hardware using light waves or artificial synapses to achieve ultra-low power AI inference.",
    connections: ["cooling_systems"],
    sourceUrl: "https://en.wikipedia.org/wiki/Neuromorphic_engineering"
  },

  // Thermal Management Node Set
  smartphones: {
    id: "smartphones",
    label: "Smartphone SoC Thermal Limits",
    description: "The design constraints governing heat dissipation in thin fanless computing form factors.",
    connections: ["vapor_chambers", "cpu_throttling"],
    sourceUrl: "https://en.wikipedia.org/wiki/Thermal_management_(electronics)"
  },
  vapor_chambers: {
    id: "vapor_chambers",
    label: "Two-Dimensional Vapor Chambers",
    description: "Sealed flat copper plates with internal wicks where fluid evaporates and condenses to spread heat.",
    connections: ["smartphones", "tim"],
    sourceUrl: "https://en.wikipedia.org/wiki/Heat_pipe#Vapor_chambers"
  },
  cpu_throttling: {
    id: "cpu_throttling",
    label: "Dynamic Voltage & Frequency Scaling",
    description: "Reducing CPU clock speeds programmatically to protect the silicon junction from thermal destruction.",
    connections: ["smartphones", "tim"],
    sourceUrl: "https://en.wikipedia.org/wiki/Dynamic_frequency_scaling"
  },
  tim: {
    id: "tim",
    label: "Thermal Interface Materials",
    description: "Graphene sheets or thermal pastes placed between silicon dies and vapor chambers to eliminate air gaps.",
    connections: ["vapor_chambers", "cpu_throttling"],
    sourceUrl: "https://en.wikipedia.org/wiki/Thermal_interface_material"
  },

  // Wi-Fi Node Set
  wifi: {
    id: "wifi",
    label: "Wi-Fi Communication Protocols",
    description: "Wireless local area network standards governing how devices transfer packet data using radio waves.",
    connections: ["electromagnetism", "mimo"],
    sourceUrl: "https://en.wikipedia.org/wiki/Wi-Fi"
  },
  electromagnetism: {
    id: "electromagnetism",
    label: "RF Propagation & Electromagnetism",
    description: "Maxwell's equations detailing how electric currents generate traveling electromagnetic waves.",
    connections: ["wifi", "ofdm"],
    sourceUrl: "https://en.wikipedia.org/wiki/Electromagnetism"
  },
  mimo: {
    id: "mimo",
    label: "Multiple-Input Multiple-Output",
    description: "Using multiple antennas at both transmitter and receiver to transmit separate streams concurrently.",
    connections: ["wifi", "ofdm"],
    sourceUrl: "https://en.wikipedia.org/wiki/MIMO"
  },
  ofdm: {
    id: "ofdm",
    label: "Orthogonal Frequency Division Multiplexing",
    description: "Encoding digital data on multiple carrier frequencies to prevent radio waves from interfering with each other.",
    connections: ["electromagnetism", "mimo", "frequency_modulation"],
    sourceUrl: "https://en.wikipedia.org/wiki/Orthogonal_frequency-division_multiplexing"
  },
  frequency_modulation: {
    id: "frequency_modulation",
    label: "Frequency Modulation",
    description: "Modifying the carrier frequency to encode binary streams without amplitude degradation.",
    connections: ["ofdm"],
    sourceUrl: "https://en.wikipedia.org/wiki/Frequency_modulation"
  },

  // GPS Node Set
  gps: {
    id: "gps",
    label: "GPS Satellites Constellation",
    description: "Orbiting spacecraft network sending synchronized microwave signals to locate ground targets.",
    connections: ["gps_trilateration", "general_relativity"],
    sourceUrl: "https://en.wikipedia.org/wiki/Global_Positioning_System"
  },
  gps_trilateration: {
    id: "gps_trilateration",
    label: "Satellite Trilateration",
    description: "Finding intersecting spheres of distance coordinates from multiple satellites to resolve positions.",
    connections: ["gps", "atomic_clocks"],
    sourceUrl: "https://en.wikipedia.org/wiki/Trilateration"
  },
  general_relativity: {
    id: "general_relativity",
    label: "Relativistic Time Dilation",
    description: "Einstein's theory explaining why clocks in orbits tick faster than clocks on the ground due to gravity differences.",
    connections: ["gps", "atomic_clocks"],
    sourceUrl: "https://en.wikipedia.org/wiki/Theory_of_relativity"
  },
  atomic_clocks: {
    id: "atomic_clocks",
    label: "Rubidium Atomic Clocks",
    description: "Timekeeping standards utilizing atomic resonance transitions to measure nanoseconds reliably.",
    connections: ["gps_trilateration", "general_relativity"],
    sourceUrl: "https://en.wikipedia.org/wiki/Atomic_clock"
  },

  // SSD Node Set
  ssd: {
    id: "ssd",
    label: "Solid-State Drive Architecture",
    description: "High-speed non-volatile computer storage utilizing integrated circuits instead of spinning platters.",
    connections: ["nand_flash", "ssd_controller"],
    sourceUrl: "https://en.wikipedia.org/wiki/Solid-state_drive"
  },
  nand_flash: {
    id: "nand_flash",
    label: "NAND Flash Memory",
    description: "Floating-gate transistor grids that hold charges even when disconnected from power.",
    connections: ["ssd", "floating_gate"],
    sourceUrl: "https://en.wikipedia.org/wiki/Flash_memory"
  },
  floating_gate: {
    id: "floating_gate",
    label: "Floating-Gate Transistors",
    description: "Metal-oxide semiconductor transistors containing an isolated gate that traps electrons to store bits.",
    connections: ["nand_flash", "wear_leveling"],
    sourceUrl: "https://en.wikipedia.org/wiki/Floating-gate_transistor"
  },
  ssd_controller: {
    id: "ssd_controller",
    label: "Flash Controller Algorithms",
    description: "Embedded microprocessor executing firmware to route data, perform error correction, and level wear.",
    connections: ["ssd", "wear_leveling"],
    sourceUrl: "https://en.wikipedia.org/wiki/Flash_memory_controller"
  },
  wear_leveling: {
    id: "wear_leveling",
    label: "Wear Leveling & Write Amplification",
    description: "Distributing write cycles uniformly across flash blocks to prevent early physical block wear out.",
    connections: ["floating_gate", "ssd_controller"],
    sourceUrl: "https://en.wikipedia.org/wiki/Wear_leveling"
  },

  // UPI Node Set
  upi: {
    id: "upi",
    label: "Unified Payments Interface",
    description: "India's real-time payment network enabling instant inter-bank peer-to-peer transfers.",
    connections: ["api_gateway", "npci_core"],
    sourceUrl: "https://en.wikipedia.org/wiki/Unified_Payments_Interface"
  },
  api_gateway: {
    id: "api_gateway",
    label: "Payment API Gateways",
    description: "Secure routing layers standardizing endpoints for mobile banking requests and tokenized payloads.",
    connections: ["upi", "public_private_crypto"],
    sourceUrl: "https://en.wikipedia.org/wiki/API_management"
  },
  npci_core: {
    id: "npci_core",
    label: "NPCI Transaction Engine",
    description: "The core clearing house that switches transactional packets between issuing and acquiring bank servers.",
    connections: ["upi", "acid_transactions"],
    sourceUrl: "https://en.wikipedia.org/wiki/National_Payments_Corporation_of_India"
  },
  public_private_crypto: {
    id: "public_private_crypto",
    label: "Asymmetric Cryptography",
    description: "Using key pairs where public keys encrypt payloads and private keys stored on secure hardware decrypt them.",
    connections: ["api_gateway", "acid_transactions"],
    sourceUrl: "https://en.wikipedia.org/wiki/Public-key_cryptography"
  },
  acid_transactions: {
    id: "acid_transactions",
    label: "Distributed ACID Transactions",
    description: "Database properties (Atomicity, Consistency, Isolation, Durability) ensuring financial records remain uncorrupted.",
    connections: ["npci_core", "public_private_crypto"],
    sourceUrl: "https://en.wikipedia.org/wiki/ACID"
  },

  // Netflix Cloud Node Set
  netflix_cloud: {
    id: "netflix_cloud",
    label: "Netflix Cloud Microservices",
    description: "Highly distributed microservice architecture running on AWS to coordinate user databases and catalog assets.",
    connections: ["edge_caching", "open_connect_cdn"],
    sourceUrl: "https://en.wikipedia.org/wiki/Cloud_computing"
  },
  edge_caching: {
    id: "edge_caching",
    label: "Edge Caching & Session Gateways",
    description: "Storing popular static catalog assets closer to user nodes to reduce data center backhaul latency.",
    connections: ["netflix_cloud", "open_connect_cdn"],
    sourceUrl: "https://en.wikipedia.org/wiki/Cache_(computing)"
  },
  open_connect_cdn: {
    id: "open_connect_cdn",
    label: "Open Connect CDN Hardware",
    description: "Netflix's custom-built server appliances colocated inside local ISPs to stream media locally.",
    connections: ["netflix_cloud", "edge_caching", "video_transcoding"],
    sourceUrl: "https://en.wikipedia.org/wiki/Content_delivery_network"
  },
  video_transcoding: {
    id: "video_transcoding",
    label: "Dynamic Video Transcoding",
    description: "Slicing and compressing source videos into hundreds of bitrate combinations using codecs like AV1.",
    connections: ["open_connect_cdn"],
    sourceUrl: "https://en.wikipedia.org/wiki/Transcoding"
  },

  // Rocket Engine Node Set
  rocket_engine: {
    id: "rocket_engine",
    label: "Liquid Rocket Engine Drivetrain",
    description: "Propulsion system combining fuel and oxidizer inside a combustion chamber to produce thrust.",
    connections: ["liquid_propulsors", "regenerative_cooling"],
    sourceUrl: "https://en.wikipedia.org/wiki/Liquid-propellant_rocket"
  },
  liquid_propulsors: {
    id: "liquid_propulsors",
    label: "Liquid Propellants & Injectors",
    description: "Atomizing liquid kerosene (RP-1) or methane with liquid oxygen to create stoichiometric combustible mixtures.",
    connections: ["rocket_engine", "turbopumps"],
    sourceUrl: "https://en.wikipedia.org/wiki/Rocket_propellant"
  },
  regenerative_cooling: {
    id: "regenerative_cooling",
    label: "Regenerative Cooling Channels",
    description: "Routing cryogenic fuel around the rocket nozzle walls to absorb extreme combustion heat before injection.",
    connections: ["rocket_engine", "de_laval_nozzle"],
    sourceUrl: "https://en.wikipedia.org/wiki/Regenerative_cooling_(rocket)"
  },
  de_laval_nozzle: {
    id: "de_laval_nozzle",
    label: "De Laval Expansion Nozzle",
    description: "A hourglass-shaped tube that accelerates sub-sonic combustion gas to supersonic speeds to generate thrust.",
    connections: ["regenerative_cooling", "turbopumps"],
    sourceUrl: "https://en.wikipedia.org/wiki/De_Laval_nozzle"
  },
  turbopumps: {
    id: "turbopumps",
    label: "Cryogenic Turbopumps",
    description: "High-speed gas turbines that pump massive flow rates of fuel and oxidizer into high-pressure chambers.",
    connections: ["liquid_propulsors", "de_laval_nozzle"],
    sourceUrl: "https://en.wikipedia.org/wiki/Turbopump"
  },

  // MRI Node Set
  mri_machine: {
    id: "mri_machine",
    label: "Magnetic Resonance Imaging",
    description: "Medical scanner using strong magnetic fields and radio waves to image anatomical details.",
    connections: ["superconductivity", "nuclear_magnetic_resonance"],
    sourceUrl: "https://en.wikipedia.org/wiki/Magnetic_resonance_imaging"
  },
  superconductivity: {
    id: "superconductivity",
    label: "Superconducting Electromagnets",
    description: "Niobium-titanium coils cooled by liquid helium to achieve zero electrical resistance and generate stable 3-Tesla fields.",
    connections: ["mri_machine", "gradient_coils"],
    sourceUrl: "https://en.wikipedia.org/wiki/Superconductivity"
  },
  nuclear_magnetic_resonance: {
    id: "nuclear_magnetic_resonance",
    label: "Nuclear Magnetic Resonance",
    description: "Quantum phenomenon where hydrogen protons absorb and emit RF energy when aligned by external magnetic fields.",
    connections: ["mri_machine", "rf_pulses"],
    sourceUrl: "https://en.wikipedia.org/wiki/Nuclear_magnetic_resonance"
  },
  rf_pulses: {
    id: "rf_pulses",
    label: "RF Pulse Transmitters",
    description: "Coils emitting radiofrequency pulses that tip proton spins out of alignment, generating echo signals upon decay.",
    connections: ["nuclear_magnetic_resonance", "gradient_coils"],
    sourceUrl: "https://en.wikipedia.org/wiki/Radiofrequency"
  },
  gradient_coils: {
    id: "gradient_coils",
    label: "Magnetic Gradient Coils",
    description: "Smaller electromagnets that alter the primary magnetic field locally, allowing spatial encoding of slices.",
    connections: ["superconductivity", "rf_pulses"],
    sourceUrl: "https://en.wikipedia.org/wiki/Gradient_coils"
  }
};

// -------------------------------------------------------------
// Pre-Authored Engineering Intelligence Journeys (10 Days Seeded)
// -------------------------------------------------------------
export const ENGINEERING_JOURNEYS: EngineeringJourney[] = [
  {
    theme: "Inside an Electric Vehicle",
    category: "Electrical Engineering",
    realWorldProblem: "How do we replace a 400-horsepower internal combustion engine with silent electricity while keeping a 2-ton vehicle running for 300+ miles on a single charge?",
    engineeringPrinciple: "Conservation of energy and electromagnetic induction. Instead of combustion heat pushing pistons, battery DC power is inverted to multi-phase AC, creating rotating magnetic fields that pull the rotor.",
    coreConcepts: [
      {
        title: "Electrochemical Storage",
        description: "Storing energy via Lithium-Ion chemistry rather than petroleum bonds.",
        detailNodeId: "lithium_ion_battery"
      },
      {
        title: "The Digital Supervisor",
        description: "Checking cell voltages 100 times a second to prevent runaway fires.",
        detailNodeId: "bms"
      },
      {
        title: "DC-AC Phase Inversion",
        description: "Using high-speed IGBT switches to turn batteries into variable AC frequencies.",
        detailNodeId: "inverter"
      },
      {
        title: "Rotational Induction",
        description: "Pulling the motor shaft via moving magnetic lines of force.",
        detailNodeId: "induction_motor"
      }
    ],
    workingMechanism: "1. The driver presses the pedal, sending a signal to the controller.\n2. The inverter draws DC current from the high-voltage pack.\n3. The inverter translates DC into variable-frequency 3-phase AC.\n4. This AC flows to the motor stator, creating a rotating magnetic field.\n5. The rotor is pulled by electromagnetic induction, driving the reduction gearbox.\n6. During deceleration, the process reverses: kinetic energy spins the generator to recharge cells.",
    industryApplications: [
      { company: "Tesla", application: "Utilizes silicon carbide inverters to minimize thermal losses down to 2%." },
      { company: "Lucid Motors", application: "Engineers 900V battery architectures to enable 350kW ultra-fast charging speeds." }
    ],
    latestInnovation: {
      title: "Silicon-Anode Battery Integration",
      explanation: "Replacing graphite anodes with structural silicon to pack 20% more lithium ions in the same cell volume.",
      concepts: ["Electrode Chemistry", "Volumetric Expansion"],
      impact: "Increases standard electric sedan range from 300 miles to 380 miles with no added chassis weight."
    },
    challenge: {
      question: "You are designing an EV battery pack. A sudden acceleration peak draws 400 Amps. To prevent localized cell melting, which thermal cooling structure is most efficient?",
      options: [
        "Air blowing from the cabin AC ducts",
        "Encasing cells in solid copper brackets",
        "Liquid glycol-coolant tubes snaking between cells",
        "Relying on ambient radiation cooling"
      ],
      answer: "Liquid glycol-coolant tubes snaking between cells",
      explanation: "Glycol liquid cooling provides a very high specific heat capacity and direct contact surface area with individual cells, extracting convective heat 50x faster than air."
    },
    memoryReview: {
      question: "You are designing an electric vehicle. Why is regenerative braking thermodynamically useful?",
      options: [
        "It eliminates the need for any friction brakes",
        "It converts kinetic energy of transit back to chemical potential in the cells instead of dispersing it as heat",
        "It reduces the voltage load on the inverter during high speeds",
        "It balances cell voltages across the battery pack"
      ],
      answer: "It converts kinetic energy of transit back to chemical potential in the cells instead of dispersing it as heat",
      explanation: "Regenerative braking acts as a generator, converting kinetic energy into electric current to charge the battery, reducing overall brake pad wear and boosting efficiency."
    },
    curiosityTree: ["electric_vehicle", "lithium_ion_battery", "bms", "regenerative_braking", "inverter", "induction_motor"]
  },
  {
    theme: "How ChatGPT Actually Works",
    category: "Artificial Intelligence",
    realWorldProblem: "How do we design a system that can understand context, hold conversations, and generate creative text without hard-coding grammatical rules?",
    engineeringPrinciple: "Neural network representation of syntax. By converting words into multi-dimensional vectors and processing them through self-attention layers, we calculate the statistical correlation of every word in a sentence simultaneously.",
    coreConcepts: [
      {
        title: "Self-Attention Mechanism",
        description: "Evaluating relationships between all tokens in a sequence at once.",
        detailNodeId: "transformers"
      },
      {
        title: "Dense Vector Embeddings",
        description: "Representing semantic word meaning as coordinates in 1536-dimensional space.",
        detailNodeId: "linear_algebra"
      },
      {
        title: "Parallel Silicon Execution",
        description: "Splitting billions of matrix operations across thousands of graphics pipelines.",
        detailNodeId: "gpus"
      },
      {
        title: "Unified Cluster Coordination",
        description: "Connecting thousands of GPU nodes with ultra-low latency InfiniBand links.",
        detailNodeId: "parallel_computing"
      }
    ],
    workingMechanism: "1. The user input text is parsed into integer token IDs.\n2. Tokens are mapped to high-dimensional mathematical coordinate spaces.\n3. Positional encoding adds vector offsets representing word order.\n4. Multi-head attention calculates Query, Key, and Value matrices.\n5. The network outputs probability scores for every word in the vocabulary.\n6. The highest scoring next token is appended, and the loop repeats.",
    industryApplications: [
      { company: "OpenAI", application: "Hosts thousands of custom Nvidia H100 clusters to power ChatGPT web requests." },
      { company: "Microsoft", application: "Integrates Azure cloud systems to automate real-time transformer compilation." }
    ],
    latestInnovation: {
      title: "FlashAttention-3 Compilation",
      explanation: "Optimizing matrix calculations inside GPU registers to avoid slow global memory transfers during attention steps.",
      concepts: ["GPU Kernel Optimization", "SRAM Memory Layouts"],
      impact: "Speeds up token generation rates by 1.8x, reducing operational server costs."
    },
    challenge: {
      question: "An AI system is generating responses with high latency. The bottleneck is the attention query-key matrix multiplication. How do you optimize this?",
      options: [
        "Write the code in Python loops",
        "Enable FP8 quantization to compute in 8-bit floats instead of 16-bit",
        "Switch from a GPU to a multi-core CPU cluster",
        "Store the key vectors as raw text strings"
      ],
      answer: "Enable FP8 quantization to compute in 8-bit floats instead of 16-bit",
      explanation: "Quantization to 8-bit floats reduces tensor memory bandwidth requirements and accelerates matrix multiplications using modern tensor cores by up to 2x."
    },
    memoryReview: {
      question: "You are designing an LLM architecture. Why is self-attention mathematically superior to RNN sequential processing?",
      options: [
        "It uses less memory during inference",
        "It processes all sequence tokens in parallel, enabling rapid GPU scaling",
        "It eliminates the need for matrix activation functions",
        "It guarantees 100% factual accuracy"
      ],
      answer: "It processes all sequence tokens in parallel, enabling rapid GPU scaling",
      explanation: "Self-attention processes sequence inputs simultaneously, allowing full parallelization across GPU tensor cores, whereas RNNs must wait for step N-1 to calculate step N."
    },
    curiosityTree: ["chatgpt", "transformers", "neural_networks", "linear_algebra", "gpus", "cuda", "parallel_computing", "data_centers", "cooling_systems", "future_hardware"]
  },
  {
    theme: "Why Modern Smartphones Never Overheat",
    category: "Thermal & Mechanical Engineering",
    realWorldProblem: "Smartphones pack desktop-class processors inside a 7mm sealed glass chassis with zero fans. How do they dissipate 10 Watts of CPU heat without burning your hand?",
    engineeringPrinciple: "Phase-change heat dissipation. By vaporizing and condensing deionized water inside a micro-wick copper chamber, heat is spread across the entire body of the phone 10x faster than solid metal.",
    coreConcepts: [
      {
        title: "Two-Dimensional Heat Spreading",
        description: "Using planar vacuum cavities to move heat from local hotspots.",
        detailNodeId: "vapor_chambers"
      },
      {
        title: "DVFS Algorithms",
        description: "Scaling voltage and core frequency down when temperatures cross 45°C.",
        detailNodeId: "cpu_throttling"
      },
      {
        title: "Thermal Bridging",
        description: "Using graphite sheets to eliminate air gaps between silicon and copper.",
        detailNodeId: "tim"
      }
    ],
    workingMechanism: "1. The CPU generates intense localized heat during heavy loads.\n2. Graphene thermal sheets transfer heat efficiently to a copper vapor chamber.\n3. Inside the vacuum chamber, deionized water absorbs heat and evaporates.\n4. Water vapor travels to the cooler edges of the phone.\n5. Vapor condenses back into liquid, releasing heat through the phone's frame.\n6. A capillary copper wick pulls the liquid back to the hot CPU to repeat.",
    industryApplications: [
      { company: "Apple", application: "Uses custom aluminum chassis alloy coordinates acting as large passive heat sinks." },
      { company: "Samsung", application: "Integrates ultra-thin 0.25mm vapor chambers in its Galaxy Ultra flagships." }
    ],
    latestInnovation: {
      title: "Graphene Thermal Shields",
      explanation: "Using aligned crystal carbon sheets to conduct heat laterally, avoiding hot points on the display glass.",
      concepts: ["Anisotropic Thermal Conductivity", "Carbon Synthetics"],
      impact: "Reduces display temperatures by up to 3°C, extending screen OLED lifespans."
    },
    challenge: {
      question: "If a vapor chamber loses its internal vacuum due to a hairline bend, how does its thermal conductivity change?",
      options: [
        "It increases because air conducts heat better than water vapor",
        "It remains completely identical",
        "It drops dramatically to the basic conductivity of dry copper",
        "It starts working in reverse, heating the CPU up"
      ],
      answer: "It drops dramatically to the basic conductivity of dry copper",
      explanation: "Without a vacuum, water cannot boil at low operating temperatures (35-40°C), stopping the phase-change cycle and dropping the chamber to standard passive metal heat conduction."
    },
    memoryReview: {
      question: "What physical force pulls condensed water back to the CPU in a smartphone vapor chamber?",
      options: [
        "Gravity from phone orientation",
        "Magnetic attraction of deionized water",
        "Capillary action in a sintered copper wick",
        "Centrifugal force from the vibration motor"
      ],
      answer: "Capillary action in a sintered copper wick",
      explanation: "Capillary action in the porous copper wick pulls the condensed fluid back to the high-temperature zone, allowing fanless, passive heat loops."
    },
    curiosityTree: ["smartphones", "vapor_chambers", "cpu_throttling", "tim"]
  },
  {
    theme: "Engineering Behind Wi-Fi",
    category: "Networking & Communication",
    realWorldProblem: "How do hundreds of wireless devices in a crowded apartment block transmit gigabits of data through walls simultaneously without signal collisions?",
    engineeringPrinciple: "Spatial multiplexing and orthogonal sub-carriers. Multiple antennas send distinct data streams on independent paths, while the signal is divided into orthogonal mathematical frequencies that don't interfere.",
    coreConcepts: [
      {
        title: "Multiple Antennas (MIMO)",
        description: "Using spatial diversity to transmit distinct packets simultaneously.",
        detailNodeId: "mimo"
      },
      {
        title: "Orthogonal Multiplexing",
        description: "Dividing channels into orthogonal frequencies to prevent overlap.",
        detailNodeId: "ofdm"
      },
      {
        title: "Frequency Bands",
        description: "Switching packets between 2.4 GHz, 5 GHz, and 6 GHz spectrums.",
        detailNodeId: "frequency_modulation"
      }
    ],
    workingMechanism: "1. Data streams are packetized and encrypted by the network chip.\n2. OFDM divides the radio channel into hundreds of narrow sub-carriers.\n3. Mathematical phase shifts encode binary bits onto these sub-carriers.\n4. MIMO antennas steer beams toward target devices using phase offsets.\n5. The receiver gathers signals and resolves spatial paths to extract bits.\n6. Error-correction algorithms rebuild lost packets on the fly.",
    industryApplications: [
      { company: "Qualcomm", application: "Designs FastConnect chips supporting Wi-Fi 7 with 320 MHz channel spacing." },
      { company: "TP-Link", application: "Engineers beamforming antenna arrays that dynamically focus radio energy." }
    ],
    latestInnovation: {
      title: "Multi-Link Operation (MLO)",
      explanation: "A Wi-Fi 7 feature allowing devices to send and receive data across both 5 GHz and 6 GHz bands at the same time.",
      concepts: ["Channel Aggregation", "Packet Scheduling"],
      impact: "Cuts wireless latency by 80% and prevents dropouts in congested environments."
    },
    challenge: {
      question: "You are setting up a router in a long hallway. Why is the 2.4 GHz band able to reach the end of the hall better than the 5 GHz band?",
      options: [
        "2.4 GHz has less security encryption overhead",
        "Longer wavelengths of 2.4 GHz diffract around walls with less material absorption",
        "5 GHz radio waves travel slower in air",
        "2.4 GHz uses digital signals whereas 5 GHz is analog"
      ],
      answer: "Longer wavelengths of 2.4 GHz diffract around walls with less material absorption",
      explanation: "Lower frequency signals (2.4 GHz) have longer wavelengths, allowing them to bend around solid structures and pass through drywall with much lower attenuation than 5 GHz."
    },
    memoryReview: {
      question: "In Wi-Fi engineering, what does MIMO stand for?",
      options: [
        "Maximum Input Minimum Output",
        "Multiple-Input Multiple-Output",
        "Multiplexed Integration Modulation Orbit",
        "Mobile Internet Micro Operator"
      ],
      answer: "Multiple-Input Multiple-Output",
      explanation: "MIMO utilizes multiple transmitter and receiver antennas to exploit spatial multipath propagation and increase signal capacity."
    },
    curiosityTree: ["wifi", "electromagnetism", "mimo", "ofdm", "frequency_modulation"]
  },
  {
    theme: "How GPS Finds Your Location",
    category: "Space Systems",
    realWorldProblem: "How does a chip inside your smartphone calculate your coordinates within 3 meters using signals from satellites orbiting 20,000 km away in space?",
    engineeringPrinciple: "Time of flight trilateration. Knowing that radio signals travel at the speed of light, calculating the nanosecond offset of satellite signals gives the exact distance to each satellite.",
    coreConcepts: [
      {
        title: "Mathematical Intersection",
        description: "Calculating positions where spheres of distance from satellites overlap.",
        detailNodeId: "gps_trilateration"
      },
      {
        title: "Relativistic Time Corrections",
        description: "Compensating for clocks ticking faster in low-gravity orbits.",
        detailNodeId: "general_relativity"
      },
      {
        title: "Quantum Clockwork",
        description: "Measuring time intervals down to a billionth of a second.",
        detailNodeId: "atomic_clocks"
      }
    ],
    workingMechanism: "1. Orbiting GPS satellites continuously broadcast their position and current time.\n2. Your phone receives these radio signals, noting the time of arrival.\n3. Distance is calculated: Speed of Light multiplied by Travel Time.\n4. Three satellites locate your 2D position; a fourth resolves altitude and clock errors.\n5. Einstein's relativity equations adjust satellite clocks by 38 microseconds daily.\n6. The resolved coordinates are mapped on your device's UI.",
    industryApplications: [
      { company: "Lockheed Martin", application: "Manufactures GPS III satellites with 3x higher accuracy and security." },
      { company: "Broadcom", application: "Produces dual-frequency GNSS chips for smartphones to cancel ionosphere delays." }
    ],
    latestInnovation: {
      title: "L5 Frequency Deployment",
      explanation: "Broadcasting a secondary GPS signal at 1176 MHz designed to penetrate concrete and bypass building reflections.",
      concepts: ["Multipath Mitigation", "Signal Frequency Design"],
      impact: "Enables blue-dot location accuracy under 1 meter inside dense urban downtown areas."
    },
    challenge: {
      question: "If GPS satellites did not correct for Einstein's theories of Special and General Relativity, how much error would accumulate in mapping calculations daily?",
      options: [
        "Virtually none (under 1 millimeter)",
        "About 10 meters per day",
        "Over 10 kilometers per day, making the system useless in hours",
        "Exactly 1 mile per week"
      ],
      answer: "Over 10 kilometers per day, making the system useless in hours",
      explanation: "Relativistic effects cause orbit clocks to run 38 microseconds faster per day. Multiplied by the speed of light, this would build a positioning error of over 11 km daily."
    },
    memoryReview: {
      question: "How many satellites are mathematically required to resolve your latitude, longitude, altitude, and phone clock bias?",
      options: [
        "2 satellites",
        "3 satellites",
        "4 satellites",
        "24 satellites"
      ],
      answer: "4 satellites",
      explanation: "Four satellites are required to solve for the four spatial/temporal unknowns: X, Y, Z coordinates and the receiver's local clock offset."
    },
    curiosityTree: ["gps", "gps_trilateration", "general_relativity", "atomic_clocks"]
  },
  {
    theme: "Why SSDs Are Faster Than HDDs",
    category: "Computer Engineering",
    realWorldProblem: "Traditional hard drives took minutes to boot operating systems. How do solid-state drives load gigabytes in milliseconds with no moving parts?",
    engineeringPrinciple: "Solid-state quantum tunneling. Instead of mechanical arms moving magnets on a spinning disk, electrons are trapped inside isolated silicon gates to store binary states instantly.",
    coreConcepts: [
      {
        title: "Non-Volatile Flash Grids",
        description: "Retaining bits without active power source.",
        detailNodeId: "nand_flash"
      },
      {
        title: "Floating-Gate Isolation",
        description: "Trapping electron packets inside microscopic oxide layers.",
        detailNodeId: "floating_gate"
      },
      {
        title: "Wear Management",
        description: "Firmware shifting writes to prevent physical gate destruction.",
        detailNodeId: "wear_leveling"
      }
    ],
    workingMechanism: "1. The host requests a read operation via the PCIe bus interface.\n2. The SSD controller locates the corresponding physical block addresses.\n3. Electric voltages read the charge state of floating-gate transistors.\n4. Trapped electrons block current (0); empty gates allow current (1).\n5. Data passes through error correction codes (ECC) to fix soft flips.\n6. The data stream is delivered to RAM at up to 7000 Megabytes per second.",
    industryApplications: [
      { company: "Samsung", application: "Stacks 236 layers of vertical flash cells (V-NAND) to maximize storage density." },
      { company: "Solidigm", application: "Engineers QLC (Quad-Level Cell) flash to store 4 bits per individual transistor." }
    ],
    latestInnovation: {
      title: "PCIe 5.0 Controller Integration",
      explanation: "Utilizing 16 GT/s bus lanes and multi-core controllers to handle parallel storage queues.",
      concepts: ["Bus Bandwidth", "Parallel Queueing Architecture"],
      impact: "Boosts sequential read speeds to 14,000 MB/s, loading massive files instantly."
    },
    challenge: {
      question: "Flash memory must erase a whole block before writing a single page. If you repeatedly write to the same page, what algorithm prevents that cell from dying prematurely?",
      options: [
        "Voltage Boost",
        "Wear Leveling",
        "Defragmentation",
        "Cache Bypassing"
      ],
      answer: "Wear Leveling",
      explanation: "Wear leveling distributes write cycles evenly across all physical blocks in the flash array, preventing single hot-blocks from wearing out and failing."
    },
    memoryReview: {
      question: "How do floating-gate transistors hold data when the computer is completely powered down?",
      options: [
        "By keeping a constant battery current running",
        "By trapping electrons behind an insulating silicon-dioxide barrier",
        "By physically moving a tiny magnetic pin",
        "By locking the CPU clock registry"
      ],
      answer: "By trapping electrons behind an insulating silicon-dioxide barrier",
      explanation: "Electrons are trapped in the floating gate, insulated by silicon-dioxide barriers, keeping their charge state stable for years without power."
    },
    curiosityTree: ["ssd", "nand_flash", "floating_gate", "ssd_controller", "wear_leveling"]
  },
  {
    theme: "Engineering Behind UPI",
    category: "Financial Technology",
    realWorldProblem: "How does India's UPI system move money between two different banks instantly at 10,000 transactions per second with zero processing fees?",
    engineeringPrinciple: "Distributed API orchestration and atomic cryptography. A central switch coordinates secure transaction handshakes between banks using asynchronous APIs, ensuring both accounts update in sync or fail gracefully.",
    coreConcepts: [
      {
        title: "API Orchestration",
        description: "Routing requests across banks via standardized payloads.",
        detailNodeId: "api_gateway"
      },
      {
        title: "Asymmetric Tokenization",
        description: "Signing payloads with device-bound private cryptographic keys.",
        detailNodeId: "public_private_crypto"
      },
      {
        title: "Distributed Consistency",
        description: "Ensuring database ledgers match perfectly using transaction locks.",
        detailNodeId: "acid_transactions"
      }
    ],
    workingMechanism: "1. The user scans a QR, triggering the UPI app to fetch merchant details.\n2. The user inputs their PIN, creating a signed cryptographic payload.\n3. The app routes this payload via bank APIs to the NPCI switch.\n4. NPCI acts as router, notifying the sender's bank to debit funds.\n5. Once debited, NPCI routes a credit request to the receiver's bank.\n6. Upon confirmation, both ledger states commit, and a success callback is fired.",
    industryApplications: [
      { company: "NPCI", application: "Manages the central UPI Switch, switching billions of messages monthly." },
      { company: "PhonePe", application: "Utilizes distributed load balancers to route 45% of daily UPI traffic." }
    ],
    latestInnovation: {
      title: "UPI Lite On-Device Wallet",
      explanation: "Bypassing core banking servers for transactions under ₹500 by storing a balance securely on the phone's chip.",
      concepts: ["Local Cryptographic Storage", "Offline Consistency"],
      impact: "Reduces core banking server traffic by 30%, cutting payment failures to near-zero."
    },
    challenge: {
      question: "During a high-load festival sale, a UPI transaction debits the sender's bank, but the receiver's bank server crashes. How does the system handle this database state?",
      options: [
        "Keeps the money in a temporary NPCI account forever",
        "Executes a rollback transaction (reversing the debit) to maintain ACID consistency",
        "Retries the debit continuously, locking the sender's account",
        "Records the payment as success anyway"
      ],
      answer: "Executes a rollback transaction (reversing the debit) to maintain ACID consistency",
      explanation: "If any step in an atomic transaction fails, the entire transaction is rolled back, returning the database to its pre-transaction consistent state."
    },
    memoryReview: {
      question: "Which database property ensures that a transaction is either completed in full or not executed at all?",
      options: [
        "Atomicity",
        "Consistency",
        "Isolation",
        "Durability"
      ],
      answer: "Atomicity",
      explanation: "Atomicity is the 'all or nothing' property of database transactions, guaranteeing that partial updates are never written if a step fails."
    },
    curiosityTree: ["upi", "api_gateway", "npci_core", "public_private_crypto", "acid_transactions"]
  },
  {
    theme: "How Cloud Computing Powers Netflix",
    category: "Cloud Engineering",
    realWorldProblem: "How does Netflix stream 4K video to 260 million global users simultaneously without buffering or crashing during peak Friday night releases?",
    engineeringPrinciple: "Edge content distribution and transcoding. Large media files are transcoded into hundreds of optimized bitrates, then pushed to custom storage boxes located inside local ISP buildings near the user.",
    coreConcepts: [
      {
        title: "Content Delivery Networks",
        description: "Colocating storage appliances inside ISP facilities.",
        detailNodeId: "open_connect_cdn"
      },
      {
        title: "Microservices Architecture",
        description: "Breaking the app logic into hundreds of isolated functional blocks.",
        detailNodeId: "netflix_cloud"
      },
      {
        title: "Dynamic Video Transcoding",
        description: "Encoding files into hundreds of optimal formats and bitrates.",
        detailNodeId: "video_transcoding"
      }
    ],
    workingMechanism: "1. Raw video files are transcoded into chunks for every screen and network speed.\n2. Files are distributed globally to Open Connect CDN flash servers.\n3. The user opens Netflix; microservices authorize and display the home feed.\n4. When play is pressed, the client requests video chunks from the nearest ISP CDN box.\n5. Adaptive streaming logic adjusts quality chunk-by-chunk based on network speeds.\n6. Telemetry checks streaming performance, reporting metrics back to the cloud.",
    industryApplications: [
      { company: "Amazon Web Services", application: "Hosts the core Netflix logic, user database, and AI recommendation engines." },
      { company: "Netflix Open Connect", application: "Partners with local ISPs to host custom RED storage arrays globally." }
    ],
    latestInnovation: {
      title: "AV1 Codec Deployment",
      explanation: "A open-source video compression standard delivering 30% higher compression efficiency than HEVC.",
      concepts: ["Lossy Video Compression", "Hardware-accelerated Decoding"],
      impact: "Delivers 4K streams to mobile connections with zero buffering even on restricted data caps."
    },
    challenge: {
      question: "A Netflix user clicks a show, and their video stream begins instantly from a server 10 miles away in their city. Which component makes this possible?",
      options: [
        "AWS S3 bucket in Virginia",
        "Local ISP Open Connect CDN box",
        "User's mobile SIM card buffer",
        "The Netflix Database master instance"
      ],
      answer: "Local ISP Open Connect CDN box",
      explanation: "By caching Netflix files locally within ISP networks (Open Connect CDN), video chunks travel short physical distances, reducing latency and internet congestion."
    },
    memoryReview: {
      question: "Why does Netflix transcode a single movie into hundreds of files?",
      options: [
        "To confuse copycats",
        "To accommodate different bandwidth, resolutions, and screen codecs on the fly",
        "To back up files on different physical servers",
        "To encrypt each stream with unique keys"
      ],
      answer: "To accommodate different bandwidth, resolutions, and screen codecs on the fly",
      explanation: "Transcoding creates distinct files for different screen sizes, network speeds, and video codecs, allowing the adaptive streaming engine to swap streams seamlessly."
    },
    curiosityTree: ["netflix_cloud", "edge_caching", "open_connect_cdn", "video_transcoding"]
  },
  {
    theme: "Inside a Rocket Engine",
    category: "Aerospace Engineering",
    realWorldProblem: "How do we design a combustion chamber that burns fuel at 3,300°C—hot enough to melt steel instantly—without destroying the rocket itself?",
    engineeringPrinciple: "Regenerative cooling and convergent-divergent supersonic flow. Cryogenic fuel is routed through the nozzle walls to absorb heat before burning, while a hourglass nozzle shape converts pressure gas into supersonic thrust.",
    coreConcepts: [
      {
        title: "Regenerative Heat Absorption",
        description: "Cooling chamber walls using fuel as a thermal absorber.",
        detailNodeId: "regenerative_cooling"
      },
      {
        title: "Supersonic Gas Expansion",
        description: "Converting high pressure gas to kinetic velocity.",
        detailNodeId: "de_laval_nozzle"
      },
      {
        title: "Cryogenic Turbopumps",
        description: "Pumping tons of liquid fuel at 10,000 RPM into burning chambers.",
        detailNodeId: "turbopumps"
      }
    ],
    workingMechanism: "1. Turbopumps spin at high speeds, driven by gas generator exhausts.\n2. Cryogenic fuel is pumped through thousands of channels surrounding the nozzle.\n3. The fuel cools the metal wall, vaporizes, and flows to the injector head.\n4. Liquid oxygen and hot fuel are atomized and injected under massive pressures.\n5. The mixture ignites, creating high-pressure combustion gas.\n6. The gas passes the convergent throat, accelerating to Mach 1, then expands supersonically.",
    industryApplications: [
      { company: "SpaceX", application: "Engineers the Merlin and Raptor engines utilizing gas-generator and full-flow cycles." },
      { company: "ISRO", application: "Manufactures Vikas and cryogenic CE-20 engines for national space launch rockets." }
    ],
    latestInnovation: {
      title: "Metal 3D-Printed Combustion Chambers",
      explanation: "Using copper alloy selective laser sintering to print complex cooling channels directly inside chamber walls.",
      concepts: ["Additive Manufacturing", "Cooling Optimization"],
      impact: "Halves manufacturing time and allows optimized channels that reduce wall heat loads by 20%."
    },
    challenge: {
      question: "Why does a rocket nozzle flare outward (diverge) after the narrow throat area?",
      options: [
        "To look aerodynamically balanced",
        "To allow gas to expand, converting pressure energy into forward kinetic thrust at supersonic speeds",
        "To slow down the exhaust gas before it escapes",
        "To mix the exhaust with atmospheric air"
      ],
      answer: "To allow gas to expand, converting pressure energy into forward kinetic thrust at supersonic speeds",
      explanation: "At the nozzle throat, gas reaches Mach 1. The widening divergent section allows supersonic gas to expand further, translating high pressure and temperature into kinetic exhaust velocity."
    },
    memoryReview: {
      question: "How does regenerative cooling prevent a rocket engine from melting?",
      options: [
        "By spraying water over the outside of the rocket",
        "By routing cold fuel through the nozzle walls before it is injected and burned",
        "By lining the inside of the engine with thick ice blocks",
        "By shutting down the engine every few seconds"
      ],
      answer: "By routing cold fuel through the nozzle walls before it is injected and burned",
      explanation: "Regenerative cooling pumps cold fuel through channels in the combustion chamber walls, transferring heat into the fuel before it gets burned, keeping wall temperatures safe."
    },
    curiosityTree: ["rocket_engine", "liquid_propulsors", "regenerative_cooling", "de_laval_nozzle", "turbopumps"]
  },
  {
    theme: "Engineering Behind Medical MRI Machines",
    category: "Biomedical & Physics",
    realWorldProblem: "How do we inspect the internal tissues of the human brain with sub-millimeter detail without using harmful radiation like X-rays?",
    engineeringPrinciple: "Nuclear magnetic resonance and superconductivity. A 3-Tesla superconducting magnet aligns hydrogen protons in the body, radio pulses tip them over, and as they snap back, they emit radio signals captured to build tissue images.",
    coreConcepts: [
      {
        title: "Zero-Resistance Electromagnets",
        description: "Achieving massive magnetic fields by cooling wire coils to 4 Kelvin.",
        detailNodeId: "superconductivity"
      },
      {
        title: "Proton Resonance alignment",
        description: "Manipulating hydrogen spins using RF frequency bursts.",
        detailNodeId: "nuclear_magnetic_resonance"
      },
      {
        title: "Spatial Coordinate Gradients",
        description: "Altering fields locally to encode spatial slices.",
        detailNodeId: "gradient_coils"
      }
    ],
    workingMechanism: "1. The superconducting magnet creates a strong, uniform magnetic field.\n2. Hydrogen protons in the patient's body align parallel to this field.\n3. RF coils emit a pulse at the Larmor frequency, tipping the protons.\n4. When the pulse turns off, protons relax back to alignment (precession).\n5. As they relax, they emit weak RF signals.\n6. Gradient coils alter the field strength across axes, spatial-encoding the signals.",
    industryApplications: [
      { company: "Siemens Healthineers", application: "Engineers 7-Tesla clinical scanners offering ultra-high resolution brain imaging." },
      { company: "Philips Healthcare", application: "Develops Helium-free sealing magnets to reduce maintenance demands." }
    ],
    latestInnovation: {
      title: "Helium-Free Sealed Magnets",
      explanation: "Using micro-cooling loops containing just 7 liters of helium instead of 1,500 liters, sealed permanently.",
      concepts: ["Cryo-Cooling Loops", "Superconductivity Isolation"],
      impact: "Allows MRI installation in standard clinics without specialized helium ventilation shafts."
    },
    challenge: {
      question: "Why are MRI machine coils cooled by liquid Helium to -269°C (4 Kelvin)?",
      options: [
        "To freeze the patient's cells during scans",
        "To make the copper wires superconducting, allowing massive electrical currents to flow with zero heat losses",
        "To prevent radio waves from leaking out of the room",
        "To speed up the computer image processing"
      ],
      answer: "To make the copper wires superconducting, allowing massive electrical currents to flow with zero heat losses",
      explanation: "At 4 Kelvin, niobium-titanium alloys become superconducting. Their electrical resistance drops to absolute zero, allowing enormous currents to flow without heating, creating powerful, stable magnetic fields."
    },
    memoryReview: {
      question: "What atomic nuclei are primarily targeted by MRI scanners to construct anatomical images?",
      options: [
        "Carbon nuclei",
        "Oxygen nuclei",
        "Hydrogen nuclei (protons)",
        "Calcium nuclei"
      ],
      answer: "Hydrogen nuclei (protons)",
      explanation: "MRI targets hydrogen atoms (water and fat molecules) because they are abundant in human soft tissues and possess a strong magnetic dipole moment."
    },
    curiosityTree: ["mri_machine", "superconductivity", "nuclear_magnetic_resonance", "rf_pulses", "gradient_coils"]
  }
];

export function getDailyEngineeringJourney(dateOffset = 0): EngineeringJourney {
  const index = Math.abs(new Date().getDate() + dateOffset) % ENGINEERING_JOURNEYS.length;
  return ENGINEERING_JOURNEYS[index];
}

// -------------------------------------------------------------
// Product X-Ray Dataset (For Explore Page)
// -------------------------------------------------------------
export const PRODUCT_XRAYS: ProductXRay[] = [
  {
    id: "tesla",
    name: "Tesla Model S Powertrain",
    description: "The premier electric vehicle drivetrain. Select a component to analyze its systems engineering.",
    systems: [
      { name: "Traction Battery Pack", detailNodeId: "lithium_ion_battery", description: "Electro-chemical lithium cell array storage." },
      { name: "Battery Management Board", detailNodeId: "bms", description: "Silicon supervisor for thermal, current, and voltage parameters." },
      { name: "Silicon Carbide Inverter", detailNodeId: "inverter", description: "Solid-state DC-AC voltage phase switcher." },
      { name: "AC Induction Motor", detailNodeId: "induction_motor", description: "Propulsion motor powered by rotating magnetic forces." },
      { name: "Regenerative Brake Line", detailNodeId: "regenerative_braking", description: "Energy recovery motor deceleration generator." }
    ]
  },
  {
    id: "chatgpt_product",
    name: "ChatGPT AI Infrastructure",
    description: "The computational stack powering modern generative intelligence.",
    systems: [
      { name: "Transformer Core", detailNodeId: "transformers", description: "Attention-based parsing and contextual modeling." },
      { name: "Vector Database Embeddings", detailNodeId: "linear_algebra", description: "Semantic alignment layers mapped as math arrays." },
      { name: "GPU Cluster Accelerators", detailNodeId: "gpus", description: "Parallel matrix multiply hardware engines." },
      { name: "Immersion Liquid Coolers", detailNodeId: "cooling_systems", description: "Dielectric fluid heat spreaders for high-density server racks." }
    ]
  },
  {
    id: "smartphone_product",
    name: "iPhone 15 Pro Max Silicon",
    description: "Compact computing hardware packed in a fanless glass enclosure.",
    systems: [
      { name: "SoC System-on-Chip", detailNodeId: "smartphones", description: "A17 Pro silicon managing compute, neural cores, and graphics." },
      { name: "Copper Vapor Chamber", detailNodeId: "vapor_chambers", description: "Phase-change heat spreading vacuum channels." },
      { name: "CPU DVFS Throttling", detailNodeId: "cpu_throttling", description: "Thermal control firmware regulating frequency states." },
      { name: "Graphene Interface Sheet", detailNodeId: "tim", description: "Carbon thermal bridge bridging silicon and chassis." }
    ]
  },
  {
    id: "wifi_router",
    name: "Enterprise Wi-Fi 7 Router",
    description: "Wireless network appliance handling multiple concurrent high-speed streams.",
    systems: [
      { name: "Wi-Fi 7 Baseband Chip", detailNodeId: "wifi", description: "Standard protocol processing for high-frequency channels." },
      { name: "MIMO Antenna Array", detailNodeId: "mimo", description: "Beamforming multi-stream antenna transceivers." },
      { name: "OFDM Modulator", detailNodeId: "ofdm", description: "Dividing bands into orthogonal frequency channels." }
    ]
  },
  {
    id: "rocket",
    name: "SpaceX Falcon 9 Merlin Engine",
    description: "High-thrust liquid propulsion launcher drivetrain.",
    systems: [
      { name: "Liquid Rocket Combustor", detailNodeId: "rocket_engine", description: "Fuel and oxidizer mixing and burning zone." },
      { name: "Turbopump Assemblies", detailNodeId: "turbopumps", description: "Cryogenic high-flow turbine pumping lines." },
      { name: "Nozzle Expansion Tube", detailNodeId: "de_laval_nozzle", description: "Supersonic pressure expansion nozzle." },
      { name: "Regenerative Tube Walls", detailNodeId: "regenerative_cooling", description: "Cryo fuel channel nozzle heat protection walls." }
    ]
  }
];

// -------------------------------------------------------------
// Backward Compatibility Helpers (Ensures we don't break existing files)
// -------------------------------------------------------------
export interface DailyNews {
  id: string;
  title: string;
  summary: string;
  source: string;
  readTime: string;
  tag: string;
}

export function getDailyNews(): DailyNews[] {
  const journey = getDailyEngineeringJourney();
  return [
    {
      id: "news-1",
      title: journey.latestInnovation.title,
      summary: journey.latestInnovation.explanation,
      source: journey.theme,
      readTime: "2 min read",
      tag: "Engineering"
    },
    {
      id: "news-2",
      title: "MIT Engineers Unveil Sub-Nanometer Transistor Gate",
      summary: "Using molybdenum disulfide monolayer sheets, researchers demonstrate a functional transistor gate at just 0.5nm thick, pushing past conventional silicon limits.",
      source: "IEEE Spectrum",
      readTime: "3 min read",
      tag: "Semiconductors"
    }
  ];
}

export function getDailyConcepts() {
  const journey = getDailyEngineeringJourney();
  return journey.coreConcepts.map((c, idx) => ({
    id: `concept-${idx}`,
    title: c.title,
    summary: c.description,
    category: "Engineering Focus",
    meta: journey.theme,
    extended: journey.workingMechanism
  }));
}

export function getDailyChallenge() {
  const journey = getDailyEngineeringJourney();
  return {
    question: journey.challenge.question,
    options: journey.challenge.options,
    answer: journey.challenge.answer,
    explanation: journey.challenge.explanation
  };
}
