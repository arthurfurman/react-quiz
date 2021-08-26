import styled from "styled-components";

type AnswerButtonProps = {
  isUserChoice: boolean;
}

export const AnswerButton = styled.button<AnswerButtonProps>`
  margin: 5px;
  background: ${({isUserChoice}) => isUserChoice? '#56FFA4': null};
`;