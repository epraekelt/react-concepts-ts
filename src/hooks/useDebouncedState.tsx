import React, { useEffect, useRef, useState } from "react";

type iSetter<T> = (state?: T) => void;

export default function useDebouncedState<State>(
  initialState?: State,
  delay: number = 2000
): [State | undefined, iSetter<State>] {
  console.log("useDebouncedState: render");
  const debounceRef = useRef<number>();
  const [state, setState] = useState(initialState);

  const setValue: iSetter<State> = (state) => {
    debounceRef.current && clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setState(state);
      alert(`Auto Debounced! ${state}`);
    }, delay);
  };

  useEffect(() => {
    console.log("useDebouncedState: useEffect: []:");

    return () => {
      console.log("useDebouncedState: useEffect: unmount:");
      debounceRef.current && clearTimeout(debounceRef.current);
    };
  }, []);

  return [state, setValue];
}
