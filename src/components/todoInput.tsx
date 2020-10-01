import React, { useContext, useState } from "react";
import styled from "styled-components";

import { TodoContext } from "../providers/todo";

const Form = styled.form`
  margin: 4px 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid grey;
  border-radius: 3px;
  box-sizing: border-box;
`;

export default function TodoInput() {
  const { addTodo } = useContext(TodoContext);
  const [content, setContent] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (content) {
      addTodo({
        id: Date.now(),
        content,
      });

      setContent("");
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        placeholder="Add a todo..."
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
    </Form>
  );
}
