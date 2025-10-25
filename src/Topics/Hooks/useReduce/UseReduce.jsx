import React, { useReducer, useState } from "react";

// Initial state
const initialState = {
  todos: [],
};

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo, index) => index !== action.payload),
      };
    default:
      return state;
  }
}

function UseReduce() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState("");

  // Separate declared function for adding a todo
  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;
    dispatch({ type: "ADD_TODO", payload: inputValue });
    setInputValue("");
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {/* Using declared function */}
      <button onClick={handleAddTodo}>Add Todo</button>

      <ul>
        {state.todos.map((todo, index) => (
          <li key={index}>
            {todo}

            {/* Using anonymous function inline */}
            <button
              onClick={() => dispatch({ type: "REMOVE_TODO", payload: index })}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UseReduce;

