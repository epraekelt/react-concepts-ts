import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import useDebouncedState from "../hooks/useDebouncedState";

import { TodoContext } from "../providers/todo";

interface iToolbarProps {
  title: React.ReactChild;
}

export default function Toolbar({ title }: iToolbarProps) {
  console.log("Toolbar: render");
  const debounceRef = useRef<number>();
  const { todos } = useContext(TodoContext);
  const [enableDebounce, setEnabledDebounce] = useState(false);
  const completedCount = useMemo(() => {
    console.log("Toolbar: calculate completed count");
    return todos.filter(({ isComplete }) => isComplete).length;
  }, [todos]);

  // const [debouncedValue, setDebouncedValue] = useDebouncedState(
  //   "Some initial value"
  // );

  useEffect(() => {
    if (enableDebounce) {
      console.log("Toolbar: useEffect: [todos]:", todos.length);

      debounceRef.current && clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setEnabledDebounce(false);
        alert(`Debounced each time... Too much to do! (${todos.length})`);
      }, 2000);
    }

    return () => {
      console.log("Toolbar: useEffect: unmount:");
      debounceRef.current && clearTimeout(debounceRef.current);
    };
  }, [todos]);

  // useEffect(() => {
  //   if (enableDebounce) {
  //     console.log("Toolbar: useEffect: [todos]:", todos.length);
  //     setDebouncedValue(`${new Date().toLocaleTimeString()} - All the todos! ${completedCount}`);
  //   }
  // }, [todos]);

  return (
    <div>
      {title}
      <hr />

      <button onClick={() => setEnabledDebounce(!enableDebounce)}>
        {enableDebounce ? "Disable" : "Enable"} Debounce
      </button>

      <div style={{ textAlign: "right" }}>You have {todos.length} todo(s).</div>
      <div style={{ textAlign: "right" }}>{completedCount}'s completed.</div>
    </div>
  );
}
