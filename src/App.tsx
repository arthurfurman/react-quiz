import { useState } from "react";
// components
import QuestionCard from "./components/QuestionCard";
import Start from "./components/Start";

import { Question, getQuestions, Answer } from "./API";

const App = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isReviewingAnswers, setIsReviewingAnswers] = useState(false);
	const [questions, setQuestions] = useState<Question[]>([]);
	const [userAnswers, setUserAnswers] = useState<{ [index: number]: string }>({});
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [score, setScore] = useState(0);

	const startTrivia = async (difficulty: string) => {
		setIsLoading(true);
		setIsReviewingAnswers(false);
		setQuestions(await getQuestions(difficulty));
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

			{questions.length === 0 ? (
				<Start onStart={startTrivia} />
			) : (
				<button onClick={() => setQuestions([])}>Restart</button>
			)}

			{isLoading ? <p>Loading questions...</p> : null}

			{questions.length !== 0 ? (
				<div className='questions'>
					<p>Question number: {currentQuestionIndex}/9</p>
					<QuestionCard
						question={questions[currentQuestionIndex]}
						userAnswer={currentQuestionIndex in userAnswers ? userAnswers[currentQuestionIndex] : ""}
						userChoiceHandler={setUserChioce}
						isReviewing={isReviewingAnswers}
					/>
					<div className='buttons'>
						{currentQuestionIndex > 0 ? (
							<button className='previous' onClick={prevQuestion}>
								Previous
							</button>
						) : null}
						{currentQuestionIndex < 9 ? (
							<button className='next' onClick={nextQuestion}>
								Next
							</button>
						) : null}
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
