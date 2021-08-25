import React, { useState } from "react";
// components
import QuestionCard from "./components/QuestionCard";

import { Question, getQuestions } from "./API";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isReviewingAnswers, setIsReviewingAnswers] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const startTrivia = async () => {
    setIsLoading(true);
    setIsReviewingAnswers(false);
    setQuestions(await getQuestions());
    setCurrentQuestionIndex(0);
    setIsLoading(false);
  };

  const submitAnswers = () => {
    setIsReviewingAnswers(true);
    setCurrentQuestionIndex(0);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < 9) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="App">
      <h1>REACT QUIZ</h1>

      <button className="start" onClick={startTrivia}>
        {questions.length !== 0 ? "Restart" : "Start"}
      </button>

      <p>{isLoading ? "Loading questions..." : null}</p>

      {questions.length !== 0 ? (
        <div className="questions">
          {isReviewingAnswers ? null : <p className="score">Score:</p>}
          <p>Question number: {currentQuestionIndex}</p>
          <QuestionCard
            question={questions[currentQuestionIndex].question}
            answers={questions[currentQuestionIndex].answers}
            usersChoice={questions[currentQuestionIndex].usersChoice}
          />
          <div className="buttons">
            <button className="previous" onClick={prevQuestion}>
              Previous
            </button>
            <button className="next" onClick={nextQuestion}>
              Next
            </button>
            {isReviewingAnswers ? null : (
              <button className="submit" onClick={submitAnswers}>
                Submit
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
