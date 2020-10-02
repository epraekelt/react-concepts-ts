import React, { createContext, useCallback, useEffect, useState } from "react";
import { iTodo } from "./types";

async function searchStuffOnApi(name: string) {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

interface Props {
  name: string;
}

/* useCallback */

function HelloWorldCallback({ name }: Props) {
  const [searchTerm, setSearchValue] = useState("");

  // const onSubmit = async () => {
  //   await searchStuffOnApi(searchTerm);
  // };

  const onSubmit = useCallback(async () => {
    await searchStuffOnApi(searchTerm)
  }, [searchTerm])

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, [setSearchValue]);

  return (
    <form onSubmit={onSubmit}>
      <input value={searchTerm} onChange={onChange} />
    </form>
  );
}

/* useEffect */

function HelloWorld({ name }: Props) {
  useEffect(() => {
    // On component mount.
    alert(`I'm ${name}, and I only cry when I'm born.`);
  }, []);

  useEffect(() => {
    // On dependency change only
    alert(`Your new name is ${name}`);
  }, [name]);

  useEffect(() => {
    // On every render. Might as well remove the useEffect wrapper.
    alert(`Shut up, ${name}! So noisy!`);
  });

  return <div>Hello, {name}!</div>;
}

/* useContext */

const defaultTodoContext = {
  todos: [] as iTodo[],
  addTodo: (todo: iTodo) => {},
};

export const TodoContext = createContext(defaultTodoContext);

function Provider({ children }: any) {
  const [todos, setTodos] = useState(defaultTodoContext.todos);

  const addTodo = (todo: any) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  const context = {
    todos,
    addTodo,
  };

  return (
    <TodoContext.Provider value={context}>{children}</TodoContext.Provider>
  );
}

/* Render loop hell */

function LoopHell() {
  const [searchTerm, setSearchValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (searchTerm) {
      setSearchValue(searchTerm.toLowerCase());
    }
  }, [searchTerm]);

  return (
    <div>
      <input value={searchTerm} onChange={onChange} />
      <div>Searching for {searchTerm}</div>
    </div>
  );
}

/* Falsy rendering */

function FalsyRendering() {
  const [persons, setPersons] = useState(["John", "Jane", "Joe"]);

  return (
    <>
      {!!persons.length && (
        <ul>
          {persons.map((person) => (
            <li></li>
          ))}
        </ul>
      )}

      <button onClick={() => setPersons([])}>Serial Killer 😱</button>
    </>
  );
}

/* Falsy rendering */

function Uncontrolled() {
  const onSubmit = () => {
    // do stuff
  };

  return (
    <form onSubmit={onSubmit}>
      <input />
    </form>
  );
}
