// 🧠 Smart mock AI feature generator for Smart Notes Pro

// Generate a short summary, tags, and mood from the note text
export const generateSmartFeatures = (text) => {
  const words = text.split(/\s+/).filter((w) => w.length > 3);
  
  // Create summary from the first few words
  const summary = words.slice(0, 8).join(" ") + (words.length > 8 ? "..." : "");

  // Generate 2–4 mock tags
  const tags = words.slice(0, 4).map((w) => w.toLowerCase().replace(/[^a-z]/g, ""));

  // Random mood
  const moods = ["Happy 😊", "Calm 🌿", "Focused 💡", "Creative 🎨", "Motivated 🚀"];
  const mood = moods[Math.floor(Math.random() * moods.length)];

  return { summary, tags, mood };
};

// Example usage:
// const { summary, tags, mood } = generateSmartFeatures("Today I started a new React project and it feels amazing!");
// console.log(summary, tags, mood);
