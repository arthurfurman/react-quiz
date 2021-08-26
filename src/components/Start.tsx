import { FC, useState } from "react";

type StartProps = {
	onStart(difficulty: string): void;
};

const Start: FC<StartProps> = ({ onStart }): JSX.Element => {
	const [difficulty, setDifficulty] = useState("");

  const choseDifficulty = (e: any) => {
    setDifficulty(e.currentTarget.value);
  }

	return (
		<div>
      <p>Choose difficulty</p>
			<button onClick={choseDifficulty} value='easy'>
				Easy
			</button>
			<button onClick={choseDifficulty} value='medium'>
				Medium
			</button>
			<button onClick={choseDifficulty} value='hard'>
				Hard
			</button>
			<button disabled={difficulty === ""} onClick={() => onStart(difficulty)}>
				Start
			</button>
		</div>
	);
};

export default Start;
