import * as readline from "readline";

enum EnergyLevel {
  Low = "low",
  Medium = "medium",
  High = "high",
}

enum DarknessLevel {
  Light = "light",
  Medium = "medium",
  Dark = "dark",
}

type MusicProfileId =
  | "chill_indie"
  | "dark_alt"
  | "hype_rap"
  | "pop_optimist";

interface Choice {
  label: string;
  value: number;
}

interface Question {
  id: string;
  prompt: string;
  choices: Choice[];
}

interface SongRecommendation {
  title: string;
  artist: string;
  note?: string;
}

interface MusicProfile {
  id: MusicProfileId;
  name: string;
  description: string;
  energy: EnergyLevel;
  darkness: DarknessLevel;
  recommendations: SongRecommendation[];
}

interface QuizResult {
  profile: MusicProfile;
  totalScore: number;
}

const questions: Question[] = [
  {
    id: "mood",
    prompt: "What's your mood right now?",
    choices: [
      { label: "Calm / reflective 🌙", value: 1 },
      { label: "Neutral / open to anything 😐", value: 2 },
      { label: "On edge / frustrated 😤", value: 3 },
      { label: "Hyped / energetic ⚡", value: 4 },
    ],
  },
  {
    id: "tempo",
    prompt: "Pick your tempo:",
    choices: [
      { label: "Slow & atmospheric", value: 1 },
      { label: "Mid-tempo groove", value: 2 },
      { label: "Fast / driving", value: 3 },
      { label: "Chaotic / intense", value: 4 },
    ],
  },
  {
    id: "darkness",
    prompt: "How dark do you want the vibe?",
    choices: [
      { label: "Soft and warm", value: 1 },
      { label: "Bittersweet / melancholic", value: 2 },
      { label: "Moody / heavy", value: 3 },
      { label: "Full on bleak / aggressive", value: 4 },
    ],
  },
  {
    id: "familiarity",
    prompt: "Do you want something familiar or new?",
    choices: [
      { label: "Classic / timeless", value: 1 },
      { label: "Mix of classic & modern", value: 2 },
      { label: "Mostly new stuff", value: 3 },
      { label: "I want deep cuts only", value: 4 },
    ],
  },
];

const profiles: Record<MusicProfileId, MusicProfile> = {
  chill_indie: {
    id: "chill_indie",
    name: "Chill Indie / Dreamy",
    description:
      "Soft guitars, nostalgic melodies, and space to think. Perfect for late-night walks or homework.",
    energy: EnergyLevel.Low,
    darkness: DarknessLevel.Light,
    recommendations: [
      { title: "We Hug Now", artist: "Sydney Rose" },
      { title: "Let Down", artist: "Radiohead", note: "Gentle but emotionally loaded" },
      { title: "Motion Sickness", artist: "Phoebe Bridgers" },
    ],
  },
  dark_alt: {
    id: "dark_alt",
    name: "Dark Alt / Moody",
    description:
      "Gloomy textures, emotional lyrics, and that bittersweet punch in the chest.",
    energy: EnergyLevel.Medium,
    darkness: DarknessLevel.Dark,
    recommendations: [
      { title: "Sudden Death", artist: "Gebesiii" },
      { title: "Creep", artist: "Radiohead" },
      { title: "Teeth", artist: "5 Seconds of Summer" },
    ],
  },
  hype_rap: {
    id: "hype_rap",
    name: "High Energy / Rap & Trap",
    description:
      "Bass heavy, punchy drums, and tracks that make you want to sprint through a wall.",
    energy: EnergyLevel.High,
    darkness: DarknessLevel.Medium,
    recommendations: [
      { title: "SICKO MODE", artist: "Travis Scott" },
      { title: "N95", artist: "Kendrick Lamar" },
      { title: "Industry Baby", artist: "Lil Nas X & Jack Harlow" },
    ],
  },
  pop_optimist: {
    id: "pop_optimist",
    name: "Bright Pop / Optimistic",
    description:
      "Catchy hooks and bright production. Feels like driving with the windows down.",
    energy: EnergyLevel.Medium,
    darkness: DarknessLevel.Light,
    recommendations: [
      { title: "Good Life", artist: "OneRepublic" },
      { title: "Blinding Lights", artist: "The Weeknd" },
      { title: "Adore You", artist: "Harry Styles" },
    ],
  },
};

function chooseProfileFromScore(score: number): MusicProfile {
  const average = score / questions.length;

  if (average <= 1.8) {
    return profiles.chill_indie;
  } else if (average <= 2.5) {
    return profiles.pop_optimist;
  } else if (average <= 3.2) {
    return profiles.hype_rap;
  } else {
    return profiles.dark_alt;
  }
}

async function runQuiz(): Promise<QuizResult> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (query: string) =>
    new Promise<string>((resolve) => rl.question(query, resolve));

  let totalScore = 0;

  for (const q of questions) {
    console.log("\n" + q.prompt);

    q.choices.forEach((choice, index) => {
      console.log(`  ${index + 1}) ${choice.label}`);
    });

    let selectedIndex: number | null = null;

    while (selectedIndex === null) {
      const answer = await ask("Enter choice number: ");
      const num = Number(answer.trim());

      if (!Number.isNaN(num) && num >= 1 && num <= q.choices.length) {
        selectedIndex = num - 1;
      } else {
        console.log("Invalid choice, please enter a valid number.");
      }
    }

    const selectedChoice = q.choices[selectedIndex];
    totalScore += selectedChoice.value;
  }

  rl.close();

  const profile = chooseProfileFromScore(totalScore);

  return {
    profile,
    totalScore,
  };
}

async function main() {
  console.log("🎵 Welcome to the Music Vibe Quiz 🎵");
  console.log("Answer a few questions and I'll recommend some tracks.\n");

  const result = await runQuiz();

  console.log("\n===============================");
  console.log(`Your profile: ${result.profile.name}`);
  console.log("===============================\n");

  console.log(result.profile.description + "\n");

  console.log("Here are some song suggestions:");
  result.profile.recommendations.forEach((song, i) => {
    const note = song.note ? ` — ${song.note}` : "";
    console.log(`${i + 1}. "${song.title}" – ${song.artist}${note}`);
  });

  console.log("\nTotal score:", result.totalScore);
  console.log("\nThanks for playing! 🎧");
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});

