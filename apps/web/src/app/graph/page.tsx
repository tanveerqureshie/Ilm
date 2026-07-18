"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Box, 
  Cpu, 
  Compass, 
  CheckCircle,
  ZoomIn,
  Lightbulb,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Inspection Tour Step
interface TourStep {
  name: string;
  zoom: number;       // scale factor
  panX: number;       // percentage translate horizontally
  panY: number;       // percentage translate vertically
  hotspot?: { x: number; y: number }; // visual hotspot in image percentage coordinates
  shortInfo: string;
}

// Model Template Interface
interface Model3D {
  name: string;
  category: string;
  imagePath: string;
  takeaway: string;
  specs: Record<string, string>;
  tourSteps: TourStep[];
}

export default function ThreeDVisualizerPage() {
  // Controls state
  const [selectedModelName, setSelectedModelName] = useState<string>("");
  const [activeTourIndex, setActiveTourIndex] = useState<number>(0);

  // Models array mapping our daily visualizer illustration graphics
  const models: Model3D[] = useMemo(() => {
    return [
      {
        name: "Twin-Scroll Turbocharged Engine",
        category: "Automotive & Powertrains",
        imagePath: "/illustrations/engine.png",
        takeaway: "Twin-scroll housings prevent exhaust gas pulse overlap from interfering with scavenging, maximizing exhaust kinetic energy delivery to spooled turbine blades.",
        specs: {
          "Displacement": "2.0 Liters I4",
          "Compression Ratio": "10.5:1",
          "Turbine Rotation": "180,000 RPM",
          "Cooling Capacity": "12.8 Kilowatts",
          "Peak Combustion": "12.0 MPa"
        },
        tourSteps: [
          {
            name: "Engine Overview",
            zoom: 1.0,
            panX: 0,
            panY: 0,
            shortInfo: "Twin-Scroll Turbocharged Engine block designed with active variable compression timing and dual high-boost exhaust scrolls."
          },
          {
            name: "Cylinder Bore Chamber",
            zoom: 1.8,
            panX: 22,
            panY: 0,
            hotspot: { x: 28, y: 50 },
            shortInfo: "Four parallel pistons. They convert volumetric compression and thermal expansion into mechanical torque through crankshaft sync."
          },
          {
            name: "Compression Head & Valves",
            zoom: 2.0,
            panX: 25,
            panY: 18,
            hotspot: { x: 25, y: 32 },
            shortInfo: "High pressure intake/exhaust valves seal fuel-air mixtures at 12.0 MPa for ignition optimization."
          },
          {
            name: "Twin-Scroll Turbocharger",
            zoom: 2.0,
            panX: -22,
            panY: -5,
            hotspot: { x: 72, y: 48 },
            shortInfo: "Twin-scroll scroll housing spins at 180,000 RPM using exhaust stream kinetic energy to push clean intake charge into combustion."
          }
        ]
      },
      {
        name: "Aerospace Thruster Nozzle",
        category: "Aerospace & Rocket Propulsion",
        imagePath: "/illustrations/thruster.png",
        takeaway: "Restricting exhaust gas velocity at the throat to Mach 1 forces gas expansion in the divergent bell to reach supersonic speed (de Laval nozzle effect).",
        specs: {
          "Throat Area": "120.4 cm²",
          "Expansion Ratio": "36.2",
          "Chamber Temperature": "3,400 °C",
          "Thrust-to-Weight": "135.2",
          "Propellant Mixture": "LOX / RP-1"
        },
        tourSteps: [
          {
            name: "System Overview",
            zoom: 1.0,
            panX: 0,
            panY: 0,
            shortInfo: "Aerospace liquid rocket propulsion assembly designed for vacuum gas velocity expansion."
          },
          {
            name: "Combustion Chamber",
            zoom: 2.0,
            panX: 18,
            panY: 0,
            hotspot: { x: 42, y: 48 },
            shortInfo: "Combustion Head: Sub-millisecond atomization and combustion of LOX and fuel generates extreme thermal flow."
          },
          {
            name: "Throat Area",
            zoom: 2.4,
            panX: -5,
            panY: 0,
            hotspot: { x: 53, y: 48 },
            shortInfo: "Sonic Throat: Narrows gas volume to choke flow and push exit streams to sonic Mach 1.0 speed."
          },
          {
            name: "Exhaust Bell",
            zoom: 1.8,
            panX: -22,
            panY: 0,
            hotspot: { x: 72, y: 48 },
            shortInfo: "Divergent Nozzle: Expands choked gases past Mach 3.0 into high altitude atmospheres."
          }
        ]
      },
      {
        name: "Silicon Transistor Microchip",
        category: "Semiconductors & GPU Arrays",
        imagePath: "/illustrations/transistor.png",
        takeaway: "Surrounding the nano-silicon gate on all 4 sides (GAAFET) mitigates gate-source subthreshold current leakage, maintaining logic states at sub-1V scales.",
        specs: {
          "Lithography Node": "3nm GAAFET",
          "Gate Dielectric": "HfO2 High-K",
          "Thermal Design Power": "45 Watts",
          "Transistor Count": "18.4 Billion",
          "Silicon Interconnect": "TSV Active Grid"
        },
        tourSteps: [
          {
            name: "Microprocessor Overview",
            zoom: 1.0,
            panX: 0,
            panY: 0,
            shortInfo: "High-density integrated 3nm computing substrate supporting dual-sided vector registers."
          },
          {
            name: "Active Silicon Die",
            zoom: 1.8,
            panX: 0,
            panY: -12,
            hotspot: { x: 50, y: 35 },
            shortInfo: "GAAFET core layout managing billions of instruction calculations per millisecond."
          },
          {
            name: "Transistor Logic Grid",
            zoom: 2.2,
            panX: 0,
            panY: 5,
            hotspot: { x: 50, y: 52 },
            shortInfo: "Sub-nanometer channel gates regulating binary switching states under active DVFS cycles."
          }
        ]
      },
      {
        name: "GPS Satcom Orbital Array",
        category: "Space Satellites & Relativity",
        imagePath: "/illustrations/gps.png",
        takeaway: "Applying a general relativity offset correction (+38 microseconds/day) prevents orbital satellite distance mapping errors from drifting by kilometers daily.",
        specs: {
          "Orbital Altitude": "20,200 km",
          "Cesium Standard": "10^-14 Accuracy",
          "Solar Output": "1,400 W",
          "Downlink Frequency": "1575.42 MHz",
          "Operational Horizon": "30 Degrees"
        },
        tourSteps: [
          {
            name: "Orbital Bus Overview",
            zoom: 1.0,
            panX: 0,
            panY: 0,
            shortInfo: "Satellite positioning module operating in geosynchronous orbits for coordinates triangulation."
          },
          {
            name: "Solar Energy Wing",
            zoom: 1.8,
            panX: 25,
            panY: -10,
            hotspot: { x: 22, y: 62 },
            shortInfo: "Dual solar grids tracking incident light to deliver 1,400W active operational energy."
          },
          {
            name: "Atomic Clock Chronometer",
            zoom: 2.2,
            panX: 0,
            panY: 8,
            hotspot: { x: 50, y: 42 },
            shortInfo: "High-precision cesium chronometer keeping satellite timestamps drift free down to nanoseconds."
          },
          {
            name: "High Gain Antenna",
            zoom: 2.2,
            panX: 0,
            panY: 28,
            hotspot: { x: 50, y: 22 },
            shortInfo: "L-band transmitter sending orbital data and clock sync telemetry to earth positioning nodes."
          }
        ]
      },
      {
        name: "Motorcycle Electrical Ignition",
        category: "Automotive & Electrical Systems",
        imagePath: "/illustrations/motorcycle.png",
        takeaway: "Using copper winding stators to build potential charge in a CDI capacitor ensures instantaneous, high-voltage spark discharging perfectly synced to the engine's BTDC cycle.",
        specs: {
          "Ignition Type": "AC CDI System",
          "Battery Capacity": "12V 5Ah Lead-Acid",
          "Regulator Rectifier": "Short-circuit regulated",
          "Stator Coils": "8-pole copper winding",
          "Secondary Spark": "22,000 Volts"
        },
        tourSteps: [
          {
            name: "Ignition Overview",
            zoom: 1.0,
            panX: 0,
            panY: 0,
            shortInfo: "Motorcycle Ignition & Electrical flow loop detailing Stator output, AC-DC regulation, capacitor discharge, and spark timing."
          },
          {
            name: "Stator & Pickup Coil",
            zoom: 2.0,
            panX: 28,
            panY: 28,
            hotspot: { x: 22, y: 22 },
            shortInfo: "Stator (Alternator): Rotates with the crankshaft, spinning magnets around copper coils to generate AC voltage (15-50V AC) and timing pulses."
          },
          {
            name: "Regulator & Battery",
            zoom: 1.9,
            panX: -15,
            panY: 28,
            hotspot: { x: 65, y: 22 },
            shortInfo: "Regulator/Rectifier converts unstable AC voltage to stable ~14.4V DC to charge the battery and power the auxiliary fuse box."
          },
          {
            name: "CDI (Capacitor Discharge)",
            zoom: 2.2,
            panX: -10,
            panY: -20,
            hotspot: { x: 60, y: 72 },
            shortInfo: "CDI Unit: Stores electrical charge in an internal capacitor, then releases it instantly when triggered by the stator's pickup coil signal."
          },
          {
            name: "Coil & Spark Plug",
            zoom: 2.0,
            panX: -30,
            panY: -15,
            hotspot: { x: 80, y: 62 },
            shortInfo: "Ignition Coil steps up the CDI's ~300V pulse to over 20,000V. This forces current across the spark plug gap, igniting fuel-air in the cylinder."
          },
          {
            name: "Control & Lights",
            zoom: 1.6,
            panX: 0,
            panY: 10,
            shortInfo: "Control circuits route power through main fuses to the headlights, tail lights, and safety engine kill switch on the handlebars."
          }
        ]
      },
      {
        name: "Car Engine Fluids Layout",
        category: "Automotive Diagnostics & Care",
        imagePath: "/illustrations/car.png",
        takeaway: "Glycol coolants raise boiling points to over 105°C under pressure, while master cylinder hydraulics utilize incompressible fluids to amplify brake pedal force.",
        specs: {
          "Engine Oil Type": "5W-30 Synthetic",
          "Coolant Mixture": "50/50 Ethylene Glycol",
          "Brake Fluid Specification": "DOT 4 Synthetic",
          "Power Steering Fluid": "ATF Dexron III",
          "Transmission Oil": "75W-90 Gear Oil"
        },
        tourSteps: [
          {
            name: "Diagnostics Overview",
            zoom: 1.0,
            panX: 0,
            panY: 0,
            shortInfo: "Automotive fluid maintenance layout detailing essential fluid types, diagnostics, and system functions."
          },
          {
            name: "Engine Oil (Lubrication)",
            zoom: 2.0,
            panX: -25,
            panY: 5,
            hotspot: { x: 75, y: 45 },
            shortInfo: "Engine Oil: Lubricates internal components to reduce friction and heat. Check level using the dipstick weekly; change every 5,000 - 10,000 km."
          },
          {
            name: "Coolant & Thermostat",
            zoom: 2.0,
            panX: 25,
            panY: 25,
            hotspot: { x: 25, y: 25 },
            shortInfo: "Coolant (Antifreeze): Absorbs engine combustion heat and releases it through the radiator. Maintain between Min/Max; flush every 2-5 years."
          },
          {
            name: "Brake Fluid (Hydraulics)",
            zoom: 2.2,
            panX: 28,
            panY: -2,
            hotspot: { x: 22, y: 48 },
            shortInfo: "Brake Fluid: Transmits hydraulic force from pedal to calipers. It absorbs moisture (hygroscopic) - change every 2 years or if dark brown."
          },
          {
            name: "Power Steering Fluid",
            zoom: 2.0,
            panX: -25,
            panY: -25,
            hotspot: { x: 75, y: 75 },
            shortInfo: "Power Steering Fluid: Hydraulic fluid providing steering assistance. Check for blackening or whining noises; change every 60,000 - 100,000 km."
          },
          {
            name: "Transmission & Washers",
            zoom: 1.7,
            panX: 0,
            panY: -10,
            shortInfo: "Transmission Fluid cools gears (change every 60k-80k km). Windshield Washer fluid clears road grime; fill with winterized mixes."
          }
        ]
      }
    ] as Model3D[];
  }, []);

  // Select model deterministically based on date (changes every 24 hours)
  useEffect(() => {
    try {
      const day = new Date().getDate();
      const dailyModelIndex = day % models.length;
      const dailyModel = models[dailyModelIndex];
      setSelectedModelName(dailyModel.name);
      setActiveTourIndex(0); // Reset tour step to overview on day/model change
    } catch (e) {
      if (models.length > 0) {
        setSelectedModelName(models[0].name);
      }
    }
  }, [models]);

  const activeModel = useMemo(() => {
    return models.find(m => m.name === selectedModelName) || models[0];
  }, [models, selectedModelName]);

  // Reset tour index when user manually clicks another model pill
  const handleModelChange = (modelName: string) => {
    setSelectedModelName(modelName);
    setActiveTourIndex(0);
  };

  // Active tour step variables
  const currentTourStep = useMemo(() => {
    if (!activeModel || !activeModel.tourSteps) return null;
    return activeModel.tourSteps[activeTourIndex] || activeModel.tourSteps[0];
  }, [activeModel, activeTourIndex]);

  return (
    <div className="min-h-screen pb-32 pt-10 max-w-4xl mx-auto px-6 space-y-6">
      
      {/* Page Header */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border/15 pb-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Box className="h-4.5 w-4.5 text-primary" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">Daily Systems Tour</span>
          </div>
          <h2 className="text-3xl font-bold font-serif mt-1">3D Systems Visualizer</h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">Explore high-fidelity engineering systems models, rotating and zooming from first-principles.</p>
        </div>

        {/* Model Selector Pills */}
        <div className="flex flex-wrap gap-1.5 self-start sm:self-center">
          {models.map(m => (
            <button
              key={m.name}
              onClick={() => handleModelChange(m.name)}
              className={`px-3 py-1.5 rounded-xl border text-[9px] font-mono tracking-tight uppercase font-bold transition-all ${
                selectedModelName === m.name 
                  ? "bg-primary text-white border-primary" 
                  : "bg-card/45 border-border/20 text-muted-foreground hover:bg-secondary/40"
              }`}
            >
              {m.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </section>

      {/* Main 3D Canvas Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        {/* Visualizer Image Container (Left-Center 2 Columns) */}
        <div className="md:col-span-2 space-y-4">
          <div className="relative glass-panel rounded-3xl overflow-hidden min-h-[460px] h-[460px] flex items-center justify-center bg-[#070708] border-border/20">
            
            {/* Blueprint Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.06]" 
                 style={{ 
                   backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)", 
                   backgroundSize: "24px 24px" 
                 }} 
            />

            {/* Smooth Zoom and Pan Inner Box (1:1 Frame) */}
            <motion.div 
              className="relative aspect-square h-full max-h-full flex items-center justify-center"
              animate={{
                scale: currentTourStep?.zoom || 1.0,
                x: `${currentTourStep?.panX || 0}%`,
                y: `${currentTourStep?.panY || 0}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 75,
                damping: 18
              }}
            >
              <img
                src={activeModel.imagePath}
                alt={activeModel.name}
                className="w-full h-full object-contain pointer-events-none"
              />

              {/* Hotspots Overlay */}
              {activeModel.tourSteps.map((step, idx) => {
                if (!step.hotspot) return null;
                const isCurrent = activeTourIndex === idx;
                
                return (
                  <button
                    key={step.name}
                    onClick={() => setActiveTourIndex(idx)}
                    style={{
                      left: `${step.hotspot.x}%`,
                      top: `${step.hotspot.y}%`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 flex items-center justify-center focus:outline-none"
                  >
                    {/* Pulsing rings */}
                    <span className={`absolute inline-flex rounded-full bg-primary/30 transition-all duration-350 ${
                      isCurrent 
                        ? "h-10 w-10 animate-ping opacity-75" 
                        : "h-6 w-6 opacity-0 group-hover:opacity-40 group-hover:scale-125"
                    }`} />
                    
                    {/* Inner core dot */}
                    <span className={`relative rounded-full transition-all duration-300 border flex items-center justify-center ${
                      isCurrent 
                        ? "h-4 w-4 bg-primary border-white shadow-[0_0_10px_rgba(255,107,53,0.8)] scale-110" 
                        : "h-3 w-3 bg-[#1e293b] border-primary/50 group-hover:border-primary group-hover:scale-110"
                    }`}>
                      <span className={`h-1 w-1 rounded-full bg-white transition-opacity ${isCurrent ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`} />
                    </span>

                    {/* Tooltip on hover */}
                    <span className="absolute bottom-full mb-2 bg-[#09090b]/95 text-white text-[8px] font-mono uppercase tracking-wider py-1 px-2 rounded border border-border/25 shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none whitespace-nowrap transition-all duration-200">
                      {step.name}
                    </span>
                  </button>
                );
              })}
            </motion.div>
            
            {/* Compass overlay */}
            <div className="absolute top-5 left-5 pointer-events-none flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/5">
              <Compass className="h-4.5 w-4.5 text-primary animate-spin-slow" />
              <span className="text-[9px] font-mono uppercase text-foreground font-bold tracking-widest">
                Lens Zoom: {currentTourStep ? currentTourStep.zoom.toFixed(1) + "x" : "1.0x"}
              </span>
            </div>

            {/* Model Label */}
            <div className="absolute bottom-5 left-5 pointer-events-none">
              <span className="text-[9px] font-mono uppercase text-primary font-bold tracking-wider">{activeModel.category}</span>
              <h3 className="text-lg font-bold font-serif text-foreground mt-0.5">{activeModel.name}</h3>
            </div>

            <div className="absolute bottom-5 right-5 pointer-events-none flex items-center gap-1.5 bg-black/45 backdrop-blur-sm border border-white/5 px-2.5 py-1 rounded-full text-[8.5px] font-mono text-emerald-400 font-bold">
              <Activity className="h-3 w-3 animate-pulse" /> SYSTEM LINK: LIVE
            </div>
          </div>

          {/* Zoom Inspector Slider Stepper (Cinematic Control) */}
          <div className="soft-glass-outset rounded-3xl p-5 border-border/15 space-y-4">
            <div className="flex items-center justify-between border-b border-border/10 pb-3">
              <div className="flex items-center gap-2">
                <ZoomIn className="h-4.5 w-4.5 text-primary" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold">Cinematic Tour & Zoom Sequence</span>
              </div>
              <span className="text-[9px] font-mono text-primary font-bold bg-secondary/50 px-2 py-0.5 rounded border border-border/10">
                Step {activeTourIndex + 1} / {activeModel.tourSteps.length}
              </span>
            </div>

            {/* Tour Steps Pill list */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {activeModel.tourSteps.map((step, idx) => {
                const isActive = activeTourIndex === idx;
                return (
                  <button
                    key={step.name}
                    onClick={() => setActiveTourIndex(idx)}
                    className={`p-2.5 rounded-xl border text-[9.5px] font-semibold text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      isActive 
                        ? "soft-glass-inset border-primary text-primary" 
                        : "bg-secondary/15 border-border/10 text-muted-foreground hover:bg-secondary/40"
                    }`}
                  >
                    <span className="line-clamp-1">{step.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Current Step Description Card */}
            <AnimatePresence mode="wait">
              {currentTourStep && (
                <motion.div
                  key={currentTourStep.name}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="bg-secondary/25 border border-border/10 p-4 rounded-2xl space-y-1.5"
                >
                  <div className="flex items-center gap-1.5 text-foreground font-bold text-xs">
                    <CheckCircle className="h-4 w-4 text-emerald-400" /> Focus Target: {currentTourStep.name}
                  </div>
                  <p className="text-[11px] text-muted-foreground font-semibold leading-relaxed">
                    {currentTourStep.shortInfo}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Technical specs & Core Takeaways (Right 1 Column) */}
        <div className="space-y-4">
          
          {/* Spec details card */}
          <div className="soft-glass-outset rounded-3xl p-5 border-border/20 space-y-4">
            <div className="flex items-center gap-2 text-primary border-b border-border/10 pb-2">
              <Cpu className="h-4 w-4" />
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold">First-Principles Specs</span>
            </div>

            <div className="space-y-3">
              {Object.entries(activeModel.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center text-[10.5px]">
                  <span className="text-muted-foreground font-semibold">{key}</span>
                  <span className="text-foreground font-mono font-bold bg-secondary/35 px-2 py-0.5 rounded border border-border/5">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* First-Principles Takeaway Card */}
          <div className="soft-glass-outset rounded-3xl p-5 border-border/20 space-y-3.5">
            <div className="flex items-center gap-2 text-primary border-b border-border/10 pb-2">
              <Lightbulb className="h-4 w-4" />
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold">First-Principles Takeaway</span>
            </div>

            <div className="bg-secondary/20 rounded-2xl p-4 border border-border/10 min-h-[120px] flex items-center justify-center">
              <p className="text-[11px] font-sans text-muted-foreground font-semibold leading-relaxed text-center">
                {activeModel.takeaway}
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
