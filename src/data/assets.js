// Asset data for the preview page
// 150 items across 8 categories + All tab

export const PRICE_PER_ITEM = 0.26
export const TOTAL_PRICE = 39
export const MINIMUM_CART = 6.99

export const categories = [
  { id: "all", label: "All", count: 150, emoji: "📦" },
  { id: "scissors", label: "Scissors & Cutting", count: 18, emoji: "✂️" },
  { id: "paper", label: "Paper & Cardstock", count: 24, emoji: "📄" },
  { id: "writing", label: "Writing Tools", count: 32, emoji: "✏️" },
  { id: "adhesives", label: "Adhesives & Tape", count: 16, emoji: "🎀" },
  { id: "measuring", label: "Measuring Tools", count: 14, emoji: "📏" },
  { id: "decor", label: "Decorative Elements", count: 28, emoji: "🎨" },
  { id: "storage", label: "Storage & Containers", count: 12, emoji: "📦" },
  { id: "scenes", label: "Bonus: Scenes", count: 6, emoji: "🖼️" },
]

// Generate 150 assets across categories
export const assets = [
  // Scissors & Cutting (18 items)
  { id: "scissors-001", name: "Classic Scissors", category: "scissors", emoji: "✂️" },
  { id: "scissors-002", name: "Craft Scissors", category: "scissors", emoji: "✂️" },
  { id: "scissors-003", name: "Pinking Shears", category: "scissors", emoji: "✂️" },
  { id: "scissors-004", name: "Fabric Scissors", category: "scissors", emoji: "✂️" },
  { id: "scissors-005", name: "Detail Scissors", category: "scissors", emoji: "✂️" },
  { id: "scissors-006", name: "Left-Hand Scissors", category: "scissors", emoji: "✂️" },
  { id: "scissors-007", name: "Safety Scissors", category: "scissors", emoji: "✂️" },
  { id: "scissors-008", name: "Decorative Edge", category: "scissors", emoji: "✂️" },
  { id: "scissors-009", name: "Paper Trimmer", category: "scissors", emoji: "✂️" },
  { id: "scissors-010", name: "Rotary Cutter", category: "scissors", emoji: "🔪" },
  { id: "scissors-011", name: "Cutting Mat", category: "scissors", emoji: "🟩" },
  { id: "scissors-012", name: "X-Acto Knife", category: "scissors", emoji: "🔪" },
  { id: "scissors-013", name: "Circle Cutter", category: "scissors", emoji: "⭕" },
  { id: "scissors-014", name: "Corner Rounder", category: "scissors", emoji: "📐" },
  { id: "scissors-015", name: "Scoring Tool", category: "scissors", emoji: "📏" },
  { id: "scissors-016", name: "Bone Folder", category: "scissors", emoji: "🦴" },
  { id: "scissors-017", name: "Thread Snips", category: "scissors", emoji: "✂️" },
  { id: "scissors-018", name: "Embossing Tool", category: "scissors", emoji: "✨" },

  // Paper & Cardstock (24 items)
  { id: "paper-001", name: "White Cardstock", category: "paper", emoji: "📄" },
  { id: "paper-002", name: "Kraft Paper", category: "paper", emoji: "📜" },
  { id: "paper-003", name: "Vellum Sheet", category: "paper", emoji: "📃" },
  { id: "paper-004", name: "Glitter Paper", category: "paper", emoji: "✨" },
  { id: "paper-005", name: "Patterned Paper", category: "paper", emoji: "🎨" },
  { id: "paper-006", name: "Tissue Paper", category: "paper", emoji: "🧻" },
  { id: "paper-007", name: "Crepe Paper", category: "paper", emoji: "🌊" },
  { id: "paper-008", name: "Origami Paper", category: "paper", emoji: "🦢" },
  { id: "paper-009", name: "Construction Paper", category: "paper", emoji: "🏗️" },
  { id: "paper-010", name: "Watercolor Paper", category: "paper", emoji: "💧" },
  { id: "paper-011", name: "Bristol Board", category: "paper", emoji: "📋" },
  { id: "paper-012", name: "Chipboard", category: "paper", emoji: "📦" },
  { id: "paper-013", name: "Foam Board", category: "paper", emoji: "🧱" },
  { id: "paper-014", name: "Corrugated Card", category: "paper", emoji: "〰️" },
  { id: "paper-015", name: "Metallic Paper", category: "paper", emoji: "🪙" },
  { id: "paper-016", name: "Mulberry Paper", category: "paper", emoji: "🍃" },
  { id: "paper-017", name: "Lokta Paper", category: "paper", emoji: "🌿" },
  { id: "paper-018", name: "Handmade Paper", category: "paper", emoji: "🤲" },
  { id: "paper-019", name: "Recycled Paper", category: "paper", emoji: "♻️" },
  { id: "paper-020", name: "Tracing Paper", category: "paper", emoji: "👁️" },
  { id: "paper-021", name: "Carbon Paper", category: "paper", emoji: "⬛" },
  { id: "paper-022", name: "Washi Paper", category: "paper", emoji: "🇯🇵" },
  { id: "paper-023", name: "Envelope", category: "paper", emoji: "✉️" },
  { id: "paper-024", name: "Paper Bag", category: "paper", emoji: "🛍️" },

  // Writing Tools (32 items)
  { id: "writing-001", name: "Pencil", category: "writing", emoji: "✏️" },
  { id: "writing-002", name: "Mechanical Pencil", category: "writing", emoji: "✏️" },
  { id: "writing-003", name: "Colored Pencils", category: "writing", emoji: "🖍️" },
  { id: "writing-004", name: "Ballpoint Pen", category: "writing", emoji: "🖊️" },
  { id: "writing-005", name: "Gel Pen", category: "writing", emoji: "🖊️" },
  { id: "writing-006", name: "Fountain Pen", category: "writing", emoji: "🖋️" },
  { id: "writing-007", name: "Felt Tip Pen", category: "writing", emoji: "🖊️" },
  { id: "writing-008", name: "Brush Pen", category: "writing", emoji: "🖌️" },
  { id: "writing-009", name: "Marker Set", category: "writing", emoji: "🖍️" },
  { id: "writing-010", name: "Highlighter", category: "writing", emoji: "🟡" },
  { id: "writing-011", name: "Fine Liner", category: "writing", emoji: "🖊️" },
  { id: "writing-012", name: "Calligraphy Pen", category: "writing", emoji: "🖋️" },
  { id: "writing-013", name: "White Gel Pen", category: "writing", emoji: "⚪" },
  { id: "writing-014", name: "Metallic Marker", category: "writing", emoji: "✨" },
  { id: "writing-015", name: "Chalk Marker", category: "writing", emoji: "🖍️" },
  { id: "writing-016", name: "Fabric Marker", category: "writing", emoji: "👕" },
  { id: "writing-017", name: "Paint Pen", category: "writing", emoji: "🎨" },
  { id: "writing-018", name: "Eraser", category: "writing", emoji: "🧽" },
  { id: "writing-019", name: "Kneaded Eraser", category: "writing", emoji: "🫳" },
  { id: "writing-020", name: "Pencil Sharpener", category: "writing", emoji: "🔧" },
  { id: "writing-021", name: "Ink Bottle", category: "writing", emoji: "🫙" },
  { id: "writing-022", name: "Ink Pad", category: "writing", emoji: "📦" },
  { id: "writing-023", name: "Stamp Set", category: "writing", emoji: "📮" },
  { id: "writing-024", name: "Embossing Powder", category: "writing", emoji: "✨" },
  { id: "writing-025", name: "Heat Tool", category: "writing", emoji: "🔥" },
  { id: "writing-026", name: "Blending Stump", category: "writing", emoji: "🖌️" },
  { id: "writing-027", name: "Charcoal Stick", category: "writing", emoji: "⬛" },
  { id: "writing-028", name: "Pastel Set", category: "writing", emoji: "🌈" },
  { id: "writing-029", name: "Watercolor Set", category: "writing", emoji: "🎨" },
  { id: "writing-030", name: "Acrylic Paint", category: "writing", emoji: "🪣" },
  { id: "writing-031", name: "Paint Brush", category: "writing", emoji: "🖌️" },
  { id: "writing-032", name: "Palette", category: "writing", emoji: "🎨" },

  // Adhesives & Tape (16 items)
  { id: "adhesives-001", name: "Glue Stick", category: "adhesives", emoji: "🫙" },
  { id: "adhesives-002", name: "White Glue", category: "adhesives", emoji: "🥛" },
  { id: "adhesives-003", name: "Craft Glue", category: "adhesives", emoji: "💧" },
  { id: "adhesives-004", name: "Hot Glue Gun", category: "adhesives", emoji: "🔫" },
  { id: "adhesives-005", name: "Glue Dots", category: "adhesives", emoji: "⚪" },
  { id: "adhesives-006", name: "Double-Sided Tape", category: "adhesives", emoji: "📏" },
  { id: "adhesives-007", name: "Washi Tape", category: "adhesives", emoji: "🎀" },
  { id: "adhesives-008", name: "Masking Tape", category: "adhesives", emoji: "📦" },
  { id: "adhesives-009", name: "Duct Tape", category: "adhesives", emoji: "🩹" },
  { id: "adhesives-010", name: "Foam Tape", category: "adhesives", emoji: "🧱" },
  { id: "adhesives-011", name: "Photo Corners", category: "adhesives", emoji: "📷" },
  { id: "adhesives-012", name: "Adhesive Runner", category: "adhesives", emoji: "🏃" },
  { id: "adhesives-013", name: "Spray Adhesive", category: "adhesives", emoji: "💨" },
  { id: "adhesives-014", name: "Mod Podge", category: "adhesives", emoji: "🫙" },
  { id: "adhesives-015", name: "E6000 Glue", category: "adhesives", emoji: "💪" },
  { id: "adhesives-016", name: "Tape Dispenser", category: "adhesives", emoji: "🎰" },

  // Measuring Tools (14 items)
  { id: "measuring-001", name: "Ruler", category: "measuring", emoji: "📏" },
  { id: "measuring-002", name: "Metal Ruler", category: "measuring", emoji: "📏" },
  { id: "measuring-003", name: "T-Square", category: "measuring", emoji: "📐" },
  { id: "measuring-004", name: "Triangle", category: "measuring", emoji: "📐" },
  { id: "measuring-005", name: "Protractor", category: "measuring", emoji: "📐" },
  { id: "measuring-006", name: "Compass", category: "measuring", emoji: "🧭" },
  { id: "measuring-007", name: "French Curve", category: "measuring", emoji: "〰️" },
  { id: "measuring-008", name: "Flexi Curve", category: "measuring", emoji: "🐍" },
  { id: "measuring-009", name: "Circle Template", category: "measuring", emoji: "⭕" },
  { id: "measuring-010", name: "Letter Stencil", category: "measuring", emoji: "🔤" },
  { id: "measuring-011", name: "Shape Template", category: "measuring", emoji: "🔷" },
  { id: "measuring-012", name: "Grid Paper", category: "measuring", emoji: "📊" },
  { id: "measuring-013", name: "Cutting Guide", category: "measuring", emoji: "📐" },
  { id: "measuring-014", name: "Spacing Tool", category: "measuring", emoji: "📏" },

  // Decorative Elements (28 items)
  { id: "decor-001", name: "Ribbon", category: "decor", emoji: "🎀" },
  { id: "decor-002", name: "Lace Trim", category: "decor", emoji: "🧶" },
  { id: "decor-003", name: "Buttons", category: "decor", emoji: "🔘" },
  { id: "decor-004", name: "Sequins", category: "decor", emoji: "✨" },
  { id: "decor-005", name: "Glitter", category: "decor", emoji: "✨" },
  { id: "decor-006", name: "Rhinestones", category: "decor", emoji: "💎" },
  { id: "decor-007", name: "Pearls", category: "decor", emoji: "🫧" },
  { id: "decor-008", name: "Beads", category: "decor", emoji: "📿" },
  { id: "decor-009", name: "Pom Poms", category: "decor", emoji: "🔵" },
  { id: "decor-010", name: "Feathers", category: "decor", emoji: "🪶" },
  { id: "decor-011", name: "Flowers", category: "decor", emoji: "🌸" },
  { id: "decor-012", name: "Leaves", category: "decor", emoji: "🍃" },
  { id: "decor-013", name: "Stickers", category: "decor", emoji: "⭐" },
  { id: "decor-014", name: "Die Cuts", category: "decor", emoji: "🔲" },
  { id: "decor-015", name: "Chipboard Shapes", category: "decor", emoji: "💛" },
  { id: "decor-016", name: "Brads", category: "decor", emoji: "📍" },
  { id: "decor-017", name: "Eyelets", category: "decor", emoji: "⚪" },
  { id: "decor-018", name: "Paper Clips", category: "decor", emoji: "📎" },
  { id: "decor-019", name: "Binder Clips", category: "decor", emoji: "📎" },
  { id: "decor-020", name: "Clothespins", category: "decor", emoji: "🧷" },
  { id: "decor-021", name: "Twine", category: "decor", emoji: "🧵" },
  { id: "decor-022", name: "Baker's Twine", category: "decor", emoji: "🧵" },
  { id: "decor-023", name: "String Lights", category: "decor", emoji: "💡" },
  { id: "decor-024", name: "Confetti", category: "decor", emoji: "🎊" },
  { id: "decor-025", name: "Googly Eyes", category: "decor", emoji: "👀" },
  { id: "decor-026", name: "Pipe Cleaners", category: "decor", emoji: "🐛" },
  { id: "decor-027", name: "Craft Wire", category: "decor", emoji: "〰️" },
  { id: "decor-028", name: "Metal Charms", category: "decor", emoji: "🔑" },

  // Storage & Containers (12 items)
  { id: "storage-001", name: "Craft Box", category: "storage", emoji: "📦" },
  { id: "storage-002", name: "Tool Caddy", category: "storage", emoji: "🧰" },
  { id: "storage-003", name: "Drawer Organizer", category: "storage", emoji: "🗄️" },
  { id: "storage-004", name: "Paper Organizer", category: "storage", emoji: "📚" },
  { id: "storage-005", name: "Ribbon Holder", category: "storage", emoji: "🎀" },
  { id: "storage-006", name: "Stamp Storage", category: "storage", emoji: "📮" },
  { id: "storage-007", name: "Marker Case", category: "storage", emoji: "🖍️" },
  { id: "storage-008", name: "Bead Container", category: "storage", emoji: "📿" },
  { id: "storage-009", name: "Photo Box", category: "storage", emoji: "📷" },
  { id: "storage-010", name: "Portfolio", category: "storage", emoji: "💼" },
  { id: "storage-011", name: "Project Bag", category: "storage", emoji: "👜" },
  { id: "storage-012", name: "Clear Pouches", category: "storage", emoji: "👛" },

  // Bonus: Scenes (6 items)
  { id: "scenes-001", name: "Craft Table Setup", category: "scenes", emoji: "🖼️" },
  { id: "scenes-002", name: "Scrapbook Spread", category: "scenes", emoji: "📖" },
  { id: "scenes-003", name: "Card Making Scene", category: "scenes", emoji: "💌" },
  { id: "scenes-004", name: "Art Studio Corner", category: "scenes", emoji: "🎨" },
  { id: "scenes-005", name: "Gift Wrapping Station", category: "scenes", emoji: "🎁" },
  { id: "scenes-006", name: "Sewing Nook", category: "scenes", emoji: "🧵" },
]

// Helper to get assets by category
export function getAssetsByCategory(categoryId) {
  if (categoryId === "all") return assets
  return assets.filter((asset) => asset.category === categoryId)
}

// Helper to get category by ID
export function getCategoryById(categoryId) {
  return categories.find((cat) => cat.id === categoryId)
}

// Format price helper
export function formatPrice(amount) {
  return `$${amount.toFixed(2)}`
}
