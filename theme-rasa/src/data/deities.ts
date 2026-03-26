export interface DeityInfo {
  name: string;
  mantra: string;
  tagline: string;
  chakra: string;
  chakraKey: string;
  element: string;
  vastuPlacement: string;
}

export const deities: DeityInfo[] = [
  {
    name: "Ganesh",
    mantra: "Om Gam Ganapataye Namaha",
    tagline: "Remover of Obstacles",
    chakra: "Root (Muladhara)",
    chakraKey: "muladhara",
    element: "Earth",
    vastuPlacement: "Northeast corner (Ishaan) of home or entrance hall. Face the deity eastward. Ground floor preferred. Use elevated platform.",
  },
  {
    name: "Vishnu",
    mantra: "Om Namo Bhagavate Vasudevaya",
    tagline: "Preserver of Stability",
    chakra: "Sacral (Svadhisthana)",
    chakraKey: "svadhisthana",
    element: "Water",
    vastuPlacement: "Northeast or north wall of main living area, facing east. Best in meditation room or prayer space. Place on white or light-colored cloth.",
  },
  {
    name: "Shiva",
    mantra: "Om Namah Shivaya",
    tagline: "Force of Transformation",
    chakra: "Third Eye (Ajna)",
    chakraKey: "ajna",
    element: "Ether",
    vastuPlacement: "Northeast corner of house, facing south. Ideal for dedicated meditation space. Place at eye level when seated.",
  },
  {
    name: "Buddha",
    mantra: "Om Mani Padme Hum",
    tagline: "Embodiment of Stillness",
    chakra: "Crown (Sahasrara)",
    chakraKey: "sahasrara",
    element: "Air",
    vastuPlacement: "Northeast section of meditation room or study, facing east. Elevated position—on shelf or altar at chest height or above.",
  },
  {
    name: "Shivling",
    mantra: "Om Tryambakam Yajamahe",
    tagline: "Source of Creation",
    chakra: "Third Eye (Ajna)",
    chakraKey: "ajna",
    element: "Fire",
    vastuPlacement: "Northeast corner, dedicated worship room only. Must be on marble or stone platform. Requires daily ritual care.",
  },
  {
    name: "Nandi",
    mantra: "Om Vrishabhaya Namaha",
    tagline: "Symbol of Patience & Strength",
    chakra: "Root (Muladhara)",
    chakraKey: "muladhara",
    element: "Earth",
    vastuPlacement: "Always facing Shivling directly, or independently facing east. Can be placed at entrance. Southwest sector for grounding.",
  },
  {
    name: "Shankh",
    mantra: "Om Panchajanyaya Namaha",
    tagline: "Sound of Purity",
    chakra: "Throat (Vishuddha)",
    chakraKey: "vishuddha",
    element: "Air",
    vastuPlacement: "Northeast corner of worship area, facing east. Place on red or saffron cloth. Keep at medium height on altar.",
  },
  {
    name: "Ram",
    mantra: "Om Shri Ramaya Namaha",
    tagline: "Ideal Order & Harmony",
    chakra: "Solar Plexus (Manipura)",
    chakraKey: "manipura",
    element: "Fire",
    vastuPlacement: "East wall or northeast of main hall, facing west so family faces east while praying. Central location in home.",
  },
  {
    name: "Hanuman",
    mantra: "Om Hanumate Namaha",
    tagline: "Protector & Strength",
    chakra: "Heart (Anahata)",
    chakraKey: "anahata",
    element: "Air",
    vastuPlacement: "South wall facing north, or at main entrance facing inward. Height: above waist level.",
  },
  {
    name: "Shiv-Parvati",
    mantra: "Om Uma Maheshwaraya Namaha",
    tagline: "Union of Balance",
    chakra: "Crown (Sahasrara)",
    chakraKey: "sahasrara",
    element: "Ether",
    vastuPlacement: "Northeast or north section of master bedroom. Can be in main worship area facing east. Elevated shelf, soft lighting.",
  },
  {
    name: "Durga",
    mantra: "Om Dum Durgayei Namaha",
    tagline: "Invincible Protection",
    chakra: "Crown (Sahasrara)",
    chakraKey: "sahasrara",
    element: "Fire",
    vastuPlacement: "East or northeast wall of main hall. Face towards main door for protection. Well-lit, prominent position.",
  },
  {
    name: "Krishna",
    mantra: "Om Kleem Krishnaya Namaha",
    tagline: "Divine Joy & Love",
    chakra: "Heart (Anahata)",
    chakraKey: "anahata",
    element: "Water",
    vastuPlacement: "Northeast corner or living room facing east or north. Social area of home where family gathers.",
  },
  {
    name: "Saraswati",
    mantra: "Om Aim Saraswatyai Namaha",
    tagline: "Flow of Knowledge",
    chakra: "Throat (Vishuddha)",
    chakraKey: "vishuddha",
    element: "Water",
    vastuPlacement: "Northeast corner of study room or library. Face east always. White cloth underneath. Keep learning materials nearby.",
  },
];

export function getDeityByName(name: string): DeityInfo | undefined {
  return deities.find(d => d.name.toLowerCase() === name.toLowerCase());
}

export function matchProductToDeity(productTitle: string): DeityInfo | undefined {
  const title = productTitle.toLowerCase();
  return deities.find(d => title.includes(d.name.toLowerCase()));
}

// Quiz data
export interface QuizOption {
  id: string;
  text: string;
  chakra?: string;
  element?: string;
}

export const quizQ1: QuizOption[] = [
  { id: "Q1_A", text: "Removing obstacles", chakra: "muladhara" },
  { id: "Q1_B", text: "Growing in wealth & career", chakra: "manipura" },
  { id: "Q1_C", text: "Finding inner peace", chakra: "sahasrara" },
  { id: "Q1_D", text: "Feeling protected & strong", chakra: "manipura" },
  { id: "Q1_E", text: "Creating harmony in relationships", chakra: "anahata" },
  { id: "Q1_F", text: "Gaining clarity & knowledge", chakra: "vishuddha" },
  { id: "Q1_G", text: "Deepening spiritual practice", chakra: "ajna" },
];

export const quizQ2: QuizOption[] = [
  { id: "Q2_A", text: "I feel blocked or stuck", element: "Earth" },
  { id: "Q2_B", text: "I need stability and direction", element: "Earth" },
  { id: "Q2_C", text: "My mind feels noisy", element: "Air" },
  { id: "Q2_D", text: "I feel vulnerable or drained", element: "Water" },
  { id: "Q2_E", text: "I want emotional balance", element: "Water" },
  { id: "Q2_F", text: "I need focus and clarity", element: "Ether" },
  { id: "Q2_G", text: "I feel called toward something higher", element: "Air" },
];

export function getQuizResults(chakraKey: string, element: string): DeityInfo[] {
  const chakraMatches = deities.filter(d => d.chakraKey === chakraKey);
  const elementMatches = deities.filter(d => d.element === element);
  
  // Perfect match: same deity appears in both
  const perfectMatches = chakraMatches.filter(d => elementMatches.includes(d));
  if (perfectMatches.length > 0) return perfectMatches;
  
  // Split match: combine unique deities from both
  const combined = [...chakraMatches];
  for (const d of elementMatches) {
    if (!combined.find(c => c.name === d.name)) combined.push(d);
  }
  return combined.slice(0, 3);
}

export const allChakras = [
  { key: "muladhara", name: "Root (Muladhara)" },
  { key: "svadhisthana", name: "Sacral (Svadhisthana)" },
  { key: "manipura", name: "Solar Plexus (Manipura)" },
  { key: "anahata", name: "Heart (Anahata)" },
  { key: "vishuddha", name: "Throat (Vishuddha)" },
  { key: "ajna", name: "Third Eye (Ajna)" },
  { key: "sahasrara", name: "Crown (Sahasrara)" },
];

export const allElements = ["Earth", "Water", "Fire", "Air", "Ether"];
