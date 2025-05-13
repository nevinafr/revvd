export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  category: 'History' | 'Drivers' | 'Teams' | 'Circuits' | 'Rules' | 'Scoring' | 'Flags';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  explanation: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Who won the first Formula 1 World Championship in 1950?",
    options: ["Juan Manuel Fangio", "Giuseppe Farina", "Alberto Ascari", "Stirling Moss"],
    correctAnswer: "Giuseppe Farina",
    category: "History",
    difficulty: "Easy",
    explanation: "Giuseppe Farina won the first F1 World Championship in 1950 driving for Alfa Romeo."
  },
  {
    id: 2,
    question: "Which driver has won the most Formula 1 World Championships?",
    options: ["Michael Schumacher", "Lewis Hamilton", "Juan Manuel Fangio", "Ayrton Senna"],
    correctAnswer: "Lewis Hamilton",
    category: "Drivers",
    difficulty: "Easy",
    explanation: "Lewis Hamilton has won 7 World Championships, tied with Michael Schumacher."
  },
  {
    id: 3,
    question: "Which team has won the most Constructors' Championships?",
    options: ["Ferrari", "McLaren", "Williams", "Mercedes"],
    correctAnswer: "Ferrari",
    category: "Teams",
    difficulty: "Easy",
    explanation: "Ferrari has won 16 Constructors' Championships, more than any other team."
  },
  {
    id: 4,
    question: "What is the longest circuit on the current F1 calendar?",
    options: ["Spa-Francorchamps", "Silverstone", "Monza", "Suzuka"],
    correctAnswer: "Spa-Francorchamps",
    category: "Circuits",
    difficulty: "Medium",
    explanation: "Spa-Francorchamps is 7.004 km long, making it the longest circuit on the current calendar."
  },
  {
    id: 5,
    question: "How many points are awarded for winning a race in the current F1 scoring system?",
    options: ["20", "25", "15", "10"],
    correctAnswer: "25",
    category: "Rules",
    difficulty: "Easy",
    explanation: "The winner of a race receives 25 points, with additional points available for fastest lap and sprint races."
  },
  {
    id: 6,
    question: "How many points does a driver earn for winning a Formula 1 race?",
    options: ["10", "15", "20", "25"],
    correctAnswer: "25",
    category: "Scoring",
    difficulty: "Easy",
    explanation: "A driver earns 25 points for winning a Formula 1 race in the current scoring system."
  },
  {
    id: 7,
    question: "What flag indicates the end of a race?",
    options: ["Checkered flag", "Red flag", "Yellow flag", "Blue flag"],
    correctAnswer: "Checkered flag",
    category: "Flags",
    difficulty: "Easy",
    explanation: "The checkered flag is waved to signal the end of a race or practice session."
  }
]; 