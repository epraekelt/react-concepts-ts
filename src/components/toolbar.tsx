import React, { useContext, useEffect, useRef, useState } from "react";

import { TodoContext } from "../providers/todo";

interface iToolbarProps {
  title: React.ReactChild;
}

export default function Toolbar({ title }: iToolbarProps) {
  const [enableDebounce, setEnabledDebounce] = useState(false);
  const debounceRef = useRef<number>();
  const { todos } = useContext(TodoContext);

  useEffect(() => {
    if (enableDebounce) {
      console.log("todos changed", todos.length);
      debounceRef.current && clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        alert(`Things change, yo! You have too many things to do! (${todos.length})`)
      }, 1000);
    }
  }, [todos]);

  return (
    <div>
      {title}
      <hr />

      <button onClick={() => setEnabledDebounce(!enableDebounce)}>
        Debounce {enableDebounce ? "on" : "off"}
      </button>

      <div style={{ textAlign: "right" }}>You have {todos.length} todo(s).</div>
    </div>
  );
}
