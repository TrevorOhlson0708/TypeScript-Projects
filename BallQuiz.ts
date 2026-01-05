import readline from "readline";

type Sport = "Baseball" | "Football" | "Basketball";

interface Question {
  sport: Sport;
  question: string;
  choices: string[];
  answer: number;
}

const questions: Question[] = [
  {
    sport: "Baseball",
    question: "How many strikes result in an out?",
    choices: ["2", "3", "4", "5"],
    answer: 1,
  },
  {
    sport: "Baseball",
    question: "How many innings are in a regulation MLB game?",
    choices: ["7", "8", "9", "10"],
    answer: 2,
  },
  {
    sport: "Baseball",
    question: "Which team has won the most World Series?",
    choices: ["Red Sox", "Dodgers", "Yankees", "Giants"],
    answer: 2,
  },

  {
    sport: "Football",
    question: "How many points is a touchdown worth?",
    choices: ["3", "6", "7", "8"],
    answer: 1,
  },
  {
    sport: "Football",
    question: "How many players are on the field per team?",
    choices: ["9", "10", "11", "12"],
    answer: 2,
  },
  {
    sport: "Football",
    question: "Which league plays the Super Bowl?",
    choices: ["MLB", "NBA", "NFL", "NHL"],
    answer: 2,
  },

  {
    sport: "Basketball",
    question: "How many points is a three-pointer worth?",
    choices: ["2", "3", "4", "5"],
    answer: 1,
  },
  {
    sport: "Basketball",
    question: "How many players are on the court per team?",
    choices: ["4", "5", "6", "7"],
    answer: 1,
  },
  {
    sport: "Basketball",
    question: "What does NBA stand for?",
    choices: [
      "National Baseball Association",
      "National Basketball Association",
      "North Basketball Alliance",
      "National Ball Association",
    ],
    answer: 1,
  },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let currentQuestion = 0;
let score = 0;

function askQuestion(): void {
  const q = questions[currentQuestion];

  console.log(`\n🏟️ ${q.sport}`);
  console.log(q.question);

  q.choices.forEach((choice, index) => {
    console.log(`${index + 1}. ${choice}`);
  });

  rl.question("Your answer (1-4): ", (input) => {
    const userAnswer = Number(input) - 1;

    if (userAnswer === q.answer) {
      console.log("✅ Correct!");
      score++;
    } else {
      console.log(`❌ Wrong! Correct answer: ${q.choices[q.answer]}`);
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
      askQuestion();
    } else {
      endQuiz();
    }
  });
}

function endQuiz(): void {
  console.log("\n🏁 Quiz Complete!");
  console.log(`Final Score: ${score} / ${questions.length}`);

  if (score === questions.length) {
    console.log("🔥 Perfect score!");
  } else if (score >= 6) {
    console.log("👏 Great job!");
  } else {
    console.log("📘 Keep practicing!");
  }

  rl.close();
}

console.log("🏆 Welcome to the Sports Quiz!");
askQuestion();