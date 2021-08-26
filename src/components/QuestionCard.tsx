import { FC, MouseEvent } from 'react';
import { Question } from '../API';
import { AnswerButton } from './QuestionCard.styles';
import he from 'he';

type QuestionCardProps = {
	question: Question;
	userAnswer: string;
	userChoiceHandler(e: MouseEvent<HTMLButtonElement>): void;
	isReviewing: boolean;
};

const QuestionCard: FC<QuestionCardProps> = ({ question, userAnswer, userChoiceHandler, isReviewing }): JSX.Element => {
	return (
		<div>
			<p>{question.question}</p>
			{question.answers.map((answer, index) => (
				<div key={index}>
					<AnswerButton
						value={answer.answer}
						onClick={userChoiceHandler}
						disabled={isReviewing}
						isUserChoice={answer.answer === userAnswer}
					>
						{answer.answer}
					</AnswerButton>
					{isReviewing && answer.correct ? <span>{he.decode('&#x2713')}</span> : null}
          {isReviewing && userAnswer === answer.answer && !answer.correct ? <span>{he.decode('&#x2717')}</span> : null}
				</div>
			))}
		</div>
	);
};

export default QuestionCard;
