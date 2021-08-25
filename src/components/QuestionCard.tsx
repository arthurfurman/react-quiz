import React, { FC } from 'react';
import { Question } from '../API';
import AnswerButton from './AnswerButton';

const QuestionCard: FC<Question> = ({
  question,
  answers,
  usersChoice
}: Question): JSX.Element => {
  const onClick = (): void => {
    console.log("Clicked");
    ;
  }
  
  return (
  <div>
    <p>{question}</p>
    {answers.map((answer, index) => (
      <div key={index}>
        <AnswerButton onClick={onClick} correct={answer.correct}>{answer.answer}</AnswerButton>
      </div>
    ))}
  </div>
  );
}

export default QuestionCard;
