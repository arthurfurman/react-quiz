import { FC, useState, MouseEvent } from 'react';
import { AnswerButton } from './QuestionCard.styles';

type StartProps = {
	onStart(difficulty: string): void;
};

const Start: FC<StartProps> = ({ onStart }): JSX.Element => {
	const [difficulty, setDifficulty] = useState("");

  const choseDifficulty = (e: MouseEvent<HTMLButtonElement>) => {
    setDifficulty(e.currentTarget.value);
  }

	return (
		<div>
      <p>Choose difficulty</p>
			<AnswerButton isUserChoice={difficulty==='easy'} onClick={choseDifficulty} value='easy'>
				Easy
			</AnswerButton>
			<AnswerButton isUserChoice={difficulty==='medium'} onClick={choseDifficulty} value='medium'>
				Medium
			</AnswerButton>
			<AnswerButton isUserChoice={difficulty==='hard'} onClick={choseDifficulty} value='hard'>
				Hard
			</AnswerButton>
			<button disabled={difficulty === ""} onClick={() => onStart(difficulty)}>
				Start
			</button>
		</div>
	);
};

export default Start;
