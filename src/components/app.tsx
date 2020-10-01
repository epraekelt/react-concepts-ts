import React, { useState } from "react";

import TodoProvider from "../providers/todo";
import Card from "../shared/components/card";
import Container from "./container";
import TodoList from "./todoList";
import Toolbar from "./toolbar";

export default function App() {
  const [show, setShow] = useState(true);

  console.log("App: render");

  return (
    <Container>
      <TodoProvider>
        <Card>
          <button onClick={() => setShow(!show)}>Hide Toolbar 😱</button>

          <hr />

          {show && (
            <Toolbar
              title={<h1 style={{ margin: 0 }}>Not Another To Do...</h1>}
            />
          )}

          <TodoList />
        </Card>
      </TodoProvider>
    </Container>
  );
}
