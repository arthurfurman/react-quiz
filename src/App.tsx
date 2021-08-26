import React, { useState } from "react";
// components
import QuestionCard from "./components/QuestionCard";

import { Question, getQuestions, Answer } from "./API";

const App = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isReviewingAnswers, setIsReviewingAnswers] = useState(false);
	const [questions, setQuestions] = useState<Question[]>([]);
	const [userAnswers, setUserAnswers] = useState<{ [index: number]: string }>({});
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [score, setScore] = useState(0);

	const startTrivia = async () => {
		setIsLoading(true);
		setIsReviewingAnswers(false);
		setQuestions(await getQuestions());
		setCurrentQuestionIndex(0);
		setScore(0);
		setIsLoading(false);
	};

	const submitAnswers = () => {
		setIsReviewingAnswers(true);
		setCurrentQuestionIndex(0);
		let scoreSum: number = 0;
		for (const index in userAnswers) {
			const answers: Answer[] = questions[index].answers.filter((answer) => answer.correct);
			if (userAnswers[index] === answers[0].answer) {
				scoreSum++;
			}
		}
		setScore(scoreSum);
	};

	const nextQuestion = () => {
		if (currentQuestionIndex < 9) {
			setCurrentQuestionIndex((prevState) => prevState + 1);
		}
	};

	const prevQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prevState) => prevState - 1);
		}
	};

	const setUserChioce = (e: any) => {
		const answer: string = e.currentTarget.value;
		const index: number = currentQuestionIndex;
		setUserAnswers((prevState) => ({
			...prevState,
			[index]: answer,
		}));
	};

	return (
		<div className='App'>
			<h1>REACT QUIZ</h1>

			{isReviewingAnswers ? <h2>Score: {score}</h2> : null}

			<button className='start' onClick={startTrivia}>
				{questions.length !== 0 ? "Restart" : "Start"}
			</button>

			{isLoading ? <p>Loading questions...</p> : null}

			{questions.length !== 0 ? (
				<div className='questions'>
					<p>Question number: {currentQuestionIndex}</p>
					<QuestionCard
						question={questions[currentQuestionIndex]}
						userAnswer={currentQuestionIndex in userAnswers ? userAnswers[currentQuestionIndex] : ""}
						userChoiceHandler={setUserChioce}
            isReviewing={isReviewingAnswers}
					/>
					<div className='buttons'>
						<button className='previous' onClick={prevQuestion}>
							Previous
						</button>
						<button className='next' onClick={nextQuestion}>
							Next
						</button>
						{isReviewingAnswers ? null : (
							<button className='submit' onClick={submitAnswers}>
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
