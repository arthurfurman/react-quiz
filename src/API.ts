import he from "he";

const shuffleArray = (array: any[]): any[] =>
  array.sort(() => Math.random() - 0.5);

const buildQuestionFromData = ({
  incorrect_answers,
  correct_answer,
  question,
}: QuestionData): Question => {
  const answers: Answer[] = incorrect_answers.map((answer: string) => ({
    answer: he.decode(answer),
    correct: false,
  }));

  answers.push({
    answer: he.decode(correct_answer),
    correct: true,
  });

  return {
    question: he.decode(question),
    answers: shuffleArray(answers),
    usersChoice: null,
  };
};

type QuestionData = {
  category: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type Question = {
  answers: Answer[];
  question: string;
  usersChoice: Answer | null;
};

export type Answer = {
  answer: string;
  correct: boolean;
};

export const getQuestions = async (): Promise<Question[]> => {
  const data = await fetch("https://opentdb.com/api.php?amount=10").then(
    (response) => response.json()
  );
  return data.results.map((questionData: QuestionData) =>
    buildQuestionFromData(questionData)
  );
};
