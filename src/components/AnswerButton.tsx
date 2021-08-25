import { FC } from "react";

type AnswerButtonProps = {
  correct: boolean;
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
};

const AnswerButton: FC<AnswerButtonProps> = ({
  onClick,
  correct,
  children,
}) : JSX.Element => (
  <div>
    <button onClick={onClick} color={correct ? "green" : "red"}>
      {children}
    </button>
  </div>
);

export default AnswerButton;
