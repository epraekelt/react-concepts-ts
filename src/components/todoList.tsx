import React, { forwardRef, useContext } from "react";

import { TodoContext } from "../providers/todo";
import { Todo } from "./todo";
import TodoInput from "./todoInput";

const TodoList = forwardRef<HTMLDivElement>((props, ref) => {
  const { todos, onCompleteTodo, onDeleteTodo } = useContext(TodoContext);

  return (
    <div ref={ref}>
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
});

export default TodoList;
