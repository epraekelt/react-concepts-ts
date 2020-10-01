import React, { createContext, useState } from "react";
import { iTodo } from "../shared/types";

export interface iTodoContext {
  todos: Array<iTodo>;
  addTodo: (todo: iTodo) => void;
  onCompleteTodo: (todo: iTodo) => void;
  onDeleteTodo: (todo: iTodo) => void;
}

const defaultTodoContext: iTodoContext = {
  todos: [
    {
      id: 1,
      content: "Some Content 1",
      isComplete: false,
    },
    {
      id: 2,
      content: "Some Content 2",
      isComplete: false,
    },
    {
      id: 3,
      content: "Some Content 3",
      isComplete: false,
    },
  ],
  addTodo: (todo) => {},
  onCompleteTodo: (todo) => {},
  onDeleteTodo: (todo) => {},
};

export const TodoContext = createContext(defaultTodoContext);

type iTodoProviderProps = React.PropsWithChildren<{}>;

export default function TodoProvider({ children }: iTodoProviderProps) {
  const [todos, setTodos] = useState<iTodoContext["todos"]>(defaultTodoContext.todos);

  const addTodo: iTodoContext["addTodo"] = (todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  const onCompleteTodo: iTodoContext["onCompleteTodo"] = (todo) => {
    setTodos((prevTodos) => {
      return prevTodos.map((_todo) =>
        _todo.id !== todo.id
          ? _todo
          : {
              ..._todo,
              isComplete: !_todo.isComplete,
            }
      );
    });
  };

  const onDeleteTodo: iTodoContext["onDeleteTodo"] = (todo) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((_todo) => _todo.id !== todo.id);
    });
  };

  const context = {
    todos,
    addTodo,
    onCompleteTodo,
    onDeleteTodo,
  };

  return (
    <TodoContext.Provider value={context}>{children}</TodoContext.Provider>
  );
}
