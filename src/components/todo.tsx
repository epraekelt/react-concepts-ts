import React from "react";
import styled from "styled-components";

import {
  BORDER,
  COMPLETE_BORDER,
  COMPLETE_BACKGROUND,
} from "../shared/styles/colors";
import { iTodo } from "../shared/types";

const TodoContainer = styled.div`
  padding: 4px 8px;
  margin: 8px 0;
  border-radius: 3px;
  border: 1px solid ${BORDER};
  display: flex;

  ${({ isComplete }: { isComplete?: boolean }) =>
    isComplete
      ? `
    border-color: ${COMPLETE_BORDER};
    background: ${COMPLETE_BACKGROUND};
    `
      : ""}
`;

const Label = styled.div`
  flex-grow: 1;
  align-self: center;
`;

const Button = styled.button`
  flex-grow: 0;
  padding: 4px 8px;

  &:not(:last-child) {
    margin-right: 8px;
  }
`;

interface iTodoProps {
  todo: iTodo;
  onComplete: (todo: iTodo) => void;
  onDelete: (todo: iTodo) => void;
}

export function Todo({ todo, onComplete, onDelete }: iTodoProps) {
  return (
    <TodoContainer isComplete={todo.isComplete}>
      <Label>{todo.content}</Label>
      <Button onClick={() => onComplete(todo)}>&#x2714;</Button>
      <Button onClick={() => onDelete(todo)}>X</Button>
    </TodoContainer>
  );
}
