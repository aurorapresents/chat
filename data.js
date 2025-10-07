/* data.js - Aurora's offline knowledge base
   Keys are simple phrases; responses are arrays (random pick)
*/

const AURORA_KB = {
  "what is ai waste separator": [
    "AI Waste Separator is a smart system that uses cameras, sensors and machine learning to identify and sort waste items into categories like organic, plastic, paper and metal.",
    "It’s essentially a smart dustbin: a camera captures the object, an AI model classifies it, and mechanical gates drop it into the right compartment.",
    "Think of it as an intelligent sorting assistant that reduces human handling of waste and improves recycling efficiency."
  ],

  "how it works": [
    "When you place an item, a sensor triggers the camera. The image is processed by an AI model which predicts the item type — a servo motor then opens the correct gate and the item falls into the chosen bin.",
    "The working pipeline is: Detect → Capture → Classify → Actuate. Detection triggers, capture by camera, classification by ML model, actuation by motors.",
    "In short: the system sees the item, decides what it is using a trained model, and moves it to the correct compartment automatically."
  ],

  "materials required": [
    "Basic parts: Arduino or Raspberry Pi, camera module (PiCam / USB webcam), ultrasonic/proximity sensor, 3 servo motors, power supply, and 3 bin compartments.",
    "You’d need microcontroller (Arduino/RPi), camera, sensors, servos, structural material (cardboard/acrylic), jumper wires and a power bank or adapter.",
    "Materials list: controller, image sensor, actuators (servos), small conveyor or tray, LEDs for status, enclosure and small drawers or compartments."
  ],

  "objectives": [
    "Main goal: automate segregation of wet, dry and recyclable waste, reduce manual labor and improve hygiene.",
    "Objectives include: applying AI at the edge, making low-cost solutions for schools, and demonstrating environmental impact through data.",
    "To show how AI + simple mechanics can solve everyday problems and promote recycling in communities."
  ],

  "advantages": [
    "Automates sorting, reduces human contact with waste, saves time and increases recycling rates.",
    "Helps collect clean separated streams, reduces landfill contamination and enables better recycling economics.",
    "Safer for sanitation workers, educational for students, scalable to public spaces with IoT integration."
  ],

  "future scope": [
    "Future improvements: IoT monitoring (fill-level), solar power, reward points for citizens, and integration with recycling centers.",
    "Next steps: deploy in schools, add barcode scanning for packaging, and connect to municipal dashboards for optimized collection.",
    "With more data, the model can learn new categories (e.g., e-waste) and become more robust under varied lighting and occlusion."
  ],

  "hypothesis": [
    "Hypothesis: A trained AI model can reliably classify common household waste items and guide actuators to segregate them with high accuracy.",
    "Assumption: Visual features and simple sensors provide enough information for accurate classification on a small prototype.",
    "We assume that edge-deployable models (TFLite) will be fast enough for near real-time sorting."
  ],

  "introduction": [
    "With increasing waste, manual sorting is slow and risky. An AI-based system can help separate waste properly and reduce environmental impact.",
    "Problem: mixed waste creates recycling issues. Solution: an accessible automated bin that sorts at source using AI.",
    "This project demonstrates how AI and low-cost hardware can make waste management smarter and more reliable."
  ]
};

/* Fallback responses */
const AURORA_FALLBACKS = [
  "I'm still learning about that. Can you rephrase?",
  "Sorry — I don't have that specific data yet. Try asking about how it works or materials.",
  "I don’t know that exact topic, but I can tell you about the AI Waste Separator basics."
];
