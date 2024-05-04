import React, { useReducer } from "react";
const intialValue = {
  data: [],
};
const reducer = (state, action) => {
  if (action.type === "inval") {
    return {
      data: [...state.data, action.payload],
    };
  } else if (action.type === "delval") {
    return {
      ...state,
      data: state.data.filter((item) => {
        return item.id !== action.payload;
      }),
    };
  }
};
function Todo() {
  const [state, dispatch] = useReducer(reducer, intialValue);
  const addData = (itemData) => {
    dispatch({ type: "inval", payload: itemData });
  };
  const delData = (itemID) => {
    dispatch({ type: "delval", payload: itemID });
  };
  return (
    <div className="container">
      <h1>ToDo list</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addData({
            title: e.target.title.value,
            id: Date.now(),
          });
          e.target.title.value = "";
        }}
      >
        <input type="text" name="title" placeholder="Add Task" />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {state.data.map((item) => {
          return (
            <li key={item.id}>
              {item.title}
              <button onClick={() => delData(item.id)}>Done</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Todo;
