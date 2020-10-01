import React, { useContext } from "react";

import { TodoContext } from "../providers/todo";
import { Todo } from "./todo";
import TodoInput from "./todoInput";

export default function TodoList() {
  const { todos, onCompleteTodo, onDeleteTodo } = useContext(TodoContext);

  return (
    <div>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onComplete={onCompleteTodo}
          onDelete={onDeleteTodo}
        />
      ))}

      <TodoInput />
    </div>
  );
}
