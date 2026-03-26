/**
 * ── Product enrichment data ────────────────────────────────────
 *
 * This is metadata that lives locally, NOT in Shopify. When
 * USE_SHOPIFY = true, Shopify provides the product title, price,
 * images, variants, availability. This file provides everything
 * else: mantras, vastu placement, chakra/element associations,
 * taglines, and long descriptions.
 *
 * Keyed by product handle — must match the Shopify handle exactly.
 */

export interface ProductEnrichment {
  tagline: string;
  deityName?: string;
  mantra?: string;
  longDescription?: string;
  vastuPlacement?: string;
  chakra?: string;
  element?: string;
}

export const enrichment: Record<string, ProductEnrichment> = {
  "ganesh-brass-murti": {
    tagline: "Remover of Obstacles",
    deityName: "Ganesh",
    mantra: "Om Gam Ganapataye Namaha",
    longDescription: "Each Ganesh murti from Divine Arts is individually hand-cast by master brass artisans in the sacred city of Haridwar. The Dhokra lost-wax technique — unchanged for over 4,000 years — gives each piece its characteristic warmth and subtle surface texture. Ganesha, the elephant-headed son of Shiva and Parvati, is the lord of new beginnings, the remover of obstacles, and the deity of wisdom and intellect. His presence at your home's threshold or worship space opens pathways, clears obstructions, and invites auspicious energy into every aspect of life. This murti stands 8 inches tall and is finished in a rich antique brass patina.",
    vastuPlacement: "Northeast corner (Ishaan) of home or entrance hall. Face the deity eastward. Ground floor preferred. Use elevated platform.",
    chakra: "Root (Muladhara)",
    element: "Earth",
  },
  "shiva-brass-murti": {
    tagline: "Force of Transformation",
    deityName: "Shiva",
    mantra: "Om Namah Shivaya",
    longDescription: "Shiva in his Nataraja aspect — the Lord of the Cosmic Dance — captures the eternal rhythm of creation, preservation, and dissolution. This murti depicts him mid-dance within a ring of flame, one foot raised, one crushing the demon of ignorance. Cast entirely in solid brass by Haridwar artisans whose families have been crafting sacred forms for generations. The antique patina deepens over years of devotional care. Standing 10 inches, this is a commanding piece suited for a dedicated altar or meditation space.",
    vastuPlacement: "Northeast corner of house, facing south. Ideal for dedicated meditation space. Place at eye level when seated.",
    chakra: "Third Eye (Ajna)",
    element: "Ether",
  },
  "vishnu-brass-murti": {
    tagline: "Preserver of Stability",
    deityName: "Vishnu",
    mantra: "Om Namo Bhagavate Vasudevaya",
    longDescription: "Lord Vishnu — the Sustainer of the cosmos — stands in this murti holding his four divine attributes: the Sudarshana Chakra, the Panchajanya conch, the Kaumodaki mace, and the lotus. His presence brings stability where there is chaos, and continuity where there is uncertainty. This piece is crafted in the Haridwar tradition of Pancha-Dhatu (five-metal) brass, giving the finished form a deep, lustrous warmth. Particularly suited to living rooms, family spaces, or the northeast section of your home.",
    vastuPlacement: "Northeast or north wall of main living area, facing east. Best in meditation room or prayer space.",
    chakra: "Sacral (Svadhisthana)",
    element: "Water",
  },
  "buddha-brass-murti": {
    tagline: "Embodiment of Stillness",
    deityName: "Buddha",
    mantra: "Om Mani Padme Hum",
    longDescription: "This meditating Buddha murti captures the essence of Dhyana — the state of pure, undisturbed awareness. Seated in the Padmasana (lotus position), hands folded in the Dhyana mudra, this form radiates the particular quality of stillness that has made the Buddha image universally recognizable across cultures. Cast in solid brass with a hand-applied patina that deepens over time, this murti is equally at home in a dedicated meditation room, a study, or any space where clarity and peace are sought.",
    vastuPlacement: "Northeast section of meditation room or study, facing east. Elevated position — on shelf or altar at chest height or above.",
    chakra: "Crown (Sahasrara)",
    element: "Air",
  },
  "krishna-brass-murti": {
    tagline: "Divine Joy & Love",
    deityName: "Krishna",
    mantra: "Om Kleem Krishnaya Namaha",
    longDescription: "Lord Krishna in his Venugopal aspect — the divine flute-player whose music dissolves all sorrow and fills every space with Ananda (divine bliss). This murti depicts him in the Tribhanga posture — the three-curve stance that conveys effortless grace — with his flute raised to his lips. The detail work on this piece is exceptional: note the peacock feather in his crown, the Pitambara (yellow dhoti), and the careful expression of serene absorption. Krishna's presence is particularly suited to family spaces and areas of gathering, where his energy of love and joy can permeate.",
    vastuPlacement: "Northeast corner or living room facing east or north. Social area of home where family gathers.",
    chakra: "Heart (Anahata)",
    element: "Water",
  },
  "hanuman-brass-murti": {
    tagline: "Protector & Strength",
    deityName: "Hanuman",
    mantra: "Om Hanumate Namaha",
    longDescription: "Lord Hanuman — the incomparable devotee, the protector, the one whose strength is matched only by his selfless love — is depicted here in the Veerasana (hero's stance), mace in hand, chest open to show Ram and Sita within his heart. Placing Hanuman at your home's entrance or southern wall is one of the most powerful protective measures in Vastu Shastra. His energy is fierce and unwavering, yet fundamentally compassionate — the protector who acts from love, not fear. Cast in heavy-gauge solid brass, this 10-inch murti has considerable presence.",
    vastuPlacement: "South wall facing north, or at main entrance facing inward. Height: above waist level.",
    chakra: "Heart (Anahata)",
    element: "Air",
  },
  "durga-brass-murti": {
    tagline: "Invincible Protection",
    deityName: "Durga",
    mantra: "Om Dum Durgayei Namaha",
    longDescription: "Maa Durga — the invincible, the one beyond reach — is depicted here in her eight-armed form, seated upon her lion, each hand carrying a divine weapon gifted by the gods. This murti was commissioned specifically for households seeking protection, strength, and the dissolution of deep-rooted obstacles that gentler forms cannot resolve. Durga's energy is not mild — she is the concentrated force of all divine power assembled when the world requires it. Her presence in a home brings fearlessness and the knowledge that what needs to be faced can be faced. A commanding 10-inch piece in heavy brass.",
    vastuPlacement: "East or northeast wall of main hall. Face towards main door for protection. Well-lit, prominent position.",
    chakra: "Crown (Sahasrara)",
    element: "Fire",
  },
  "saraswati-brass-murti": {
    tagline: "Flow of Knowledge",
    deityName: "Saraswati",
    mantra: "Om Aim Saraswatyai Namaha",
    longDescription: "Goddess Saraswati — the embodiment of learning, music, art, and wisdom — is depicted here in her classical four-armed form: seated upon a white lotus, holding the veena (the instrument of creative intelligence), a manuscript (the Vedas), a rosary, and a water pot. Her presence in a study, library, or any space dedicated to learning and creative work is considered among the most auspicious in the Sanatana tradition. This 9-inch murti is finished in a lighter, more luminous brass patina that suits her association with purity and the Saraswati River.",
    vastuPlacement: "Northeast corner of study room or library. Face east always. White cloth underneath. Keep learning materials nearby.",
    chakra: "Throat (Vishuddha)",
    element: "Water",
  },
  "ram-darbar-brass-murti": {
    tagline: "Ideal Order & Harmony",
    deityName: "Ram Darbar",
    mantra: "Om Shri Ramaya Namaha",
    longDescription: "The Ram Darbar depicts the ideal court of Lord Rama: Ram and Sita enthroned at the center, Lakshmana standing faithful to one side, and Hanuman kneeling in devotion at the base. This grouping is considered among the most auspicious household murtis in the Vaishnava tradition — it encompasses protection (Hanuman), divine love (Sita), loyalty (Lakshmana), and righteous leadership (Rama) in a single composition. At 12 inches, this is a substantial piece intended for a dedicated altar or prominent wall niche. The casting quality on this murti is particularly fine, with individuated expressions visible on each figure.",
    vastuPlacement: "East wall or northeast of main hall, facing west so family faces east while praying. Central location in home.",
    chakra: "Solar Plexus (Manipura)",
    element: "Fire",
  },
  "nandi-brass-murti": {
    tagline: "Patience & Strength",
    deityName: "Nandi",
    mantra: "Om Vrishabhaya Namaha",
    longDescription: "Nandi — the divine bull and Shiva's most devoted attendant — is the symbol of strength, patience, and the capacity to wait with complete faith. In temple architecture, Nandi always faces the Shiva linga, positioned as the eternal guardian and witness. In the home, Nandi brings the qualities of groundedness, unwavering dedication, and the kind of quiet strength that does not need to announce itself. This compact 6-inch murti in solid brass is an excellent complement to a Shivling or can stand independently at the entrance to a room or home.",
    vastuPlacement: "Always facing Shivling directly, or independently facing east. Can be placed at entrance. Southwest sector for grounding.",
    chakra: "Root (Muladhara)",
    element: "Earth",
  },
  "shivling-brass": {
    tagline: "Source of Creation",
    deityName: "Shivling",
    mantra: "Om Tryambakam Yajamahe",
    longDescription: "The Shivling is the original, formless representation of Shiva — not an anthropomorphic deity but the column of infinite light that Shiva revealed to Brahma and Vishnu as proof of his boundlessness. Of all sacred forms, the Shivling is considered the most powerful and the most demanding: it requires daily ritual care (Abhisheka — ritual bathing with milk, water, and bilva leaves) and should be housed in a dedicated worship space, ideally a separate room. This brass Shivling is cast with the traditional Argha (offering basin) base and stands 5 inches. It is provided pre-consecrated.",
    vastuPlacement: "Northeast corner, dedicated worship room only. Must be on marble or stone platform. Requires daily ritual care.",
    chakra: "Third Eye (Ajna)",
    element: "Fire",
  },
  "shiv-parvati-brass-murti": {
    tagline: "Union of Balance",
    deityName: "Shiv-Parvati",
    mantra: "Om Uma Maheshwaraya Namaha",
    longDescription: "The Shiv-Parvati murti depicts the divine couple — Shiva (pure consciousness) and Parvati (the creative power of nature) — united in a single form. This union, called Ardhanarishvara in its merged form, represents the fundamental truth that all creation arises from the marriage of awareness and energy. In the home, the Shiv-Parvati murti is considered among the most auspicious forms for harmonizing relationships, bringing balance between the masculine and feminine principles, and blessing the household with love and stability. This 9-inch murti is a particularly detailed casting, with Parvati's jewelry, Shiva's matted locks, and the trident rendered with great care.",
    vastuPlacement: "Northeast or north section of master bedroom. Can be in main worship area facing east. Elevated shelf, soft lighting.",
    chakra: "Crown (Sahasrara)",
    element: "Ether",
  },
  "traditional-brass-diya": {
    tagline: "Light the Sacred Space",
    longDescription: "The brass diya is the heart of any puja — the living flame that represents divine presence made tangible. This five-wick diya is hand-cast in solid brass with a weighted base that keeps it stable during worship. The antique finish deepens over time with regular use. Compatible with pure ghee or sesame oil. The five wicks correspond to the Pancha Tatva (five elements), making this an especially complete ritual object. Dimensions: 4 inches diameter, 2 inches height.",
  },
  "shuddhi-poojan": {
    tagline: "Ritual Consecration Before Delivery",
    longDescription: "Shuddhi Poojan (ritual purification) and Prana Pratishtha (consecration of life-force) are the Vedic ceremonies that transform a beautifully crafted object into a living sacred presence. Our resident pandit — a practitioner with over 20 years of continuous daily ritual practice in the Shaiva and Vaishnava traditions — performs a full ceremony specific to each deity before your murti is sealed and shipped.",
  },
};
