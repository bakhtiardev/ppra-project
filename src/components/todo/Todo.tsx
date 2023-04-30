import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { addTodo, selectTodos } from "../../store/todo/todoSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();
  const [textInput, setTextInput] = useState("");

  const handleChange = (e: any) => {
    setTextInput(e.target.value);
  };
  const handleTodo = (e: any) => {
    e.preventDefault();
    const sno = todos.length + 1;
    dispatch(addTodo({ sno: sno, message: textInput }));
    // setTextInput("");
    e.target.reset();
  };

  return (
    <>
      {/* <form onSubmit={handleTodo}>
          <label>Enter Your todo</label>
          <input type="text" onChange={handleChange} />
          <button type="submit">Add todo</button> */}
      <div>
        {/* {todos?.map((item) => {
          return (
            <>
              <p key={item.sno}>
                {item.sno}----------{item.message}
              </p>
            </>
          );
        })} */}
        <h1>I am home</h1>
      </div>
      {/* </form> */}
    </>
  );
};

export default Todo;
