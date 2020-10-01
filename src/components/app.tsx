import React from "react";

import TodoProvider from "../providers/todo";
import Card from "../shared/components/card";
import Container from "./container";
import TodoList from "./todoList";
import Toolbar from "./toolbar";

export default function App() {
  return (
    <Container>
      <TodoProvider>
        <Card>
          <Toolbar
            title={<h1 style={{ margin: 0 }}>Not Another To Do...</h1>}
          />

          <TodoList />
        </Card>
      </TodoProvider>
    </Container>
  );
}
