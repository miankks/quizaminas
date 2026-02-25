export interface QuestionType {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const questionBank: Record<string, QuestionType[]> = {
  general: [
    {
      id: "1",
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      id: "2",
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      correctAnswer: "Mars",
    },
  ],

  science: [
    {
      id: "1",
      question: "What gas do plants absorb?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
      correctAnswer: "Carbon Dioxide",
    },
  ],

  history: [
    {
      id: "1",
      question: "Who wrote Hamlet?",
      options: ["Shakespeare", "Tolstoy", "Hemingway", "Twain"],
      correctAnswer: "Shakespeare",
    },
  ],
};
