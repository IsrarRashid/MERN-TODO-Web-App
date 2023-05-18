import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import createTodoRequest from "../api/createTodoRequest";
import { TokenContext } from "../App";
import "react-toastify/dist/ReactToastify.css";

const CreateTodoForm = () => {
  const [text, setText] = useState("");
  const [token] = useContext(TokenContext);
  const queryClient = new useQueryClient();

  const { mutate: createTodo } = useMutation(
    (newTodo) => createTodoRequest(newTodo, token),
    {
      onSettled: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  return (
    <form
      className="mb-3 d-flex"
      onSubmit={(e) => {
        e.preventDefault(); //prevents page from refreshing
        if (!text) return;
        createTodo({
          text,
        });
        setText("");
      }}
    >
      <input
        className="form-control m-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Type Any Task!"
      ></input>
      <button className="btn btn-success m-2">Create</button>
    </form>
  );
};

export default CreateTodoForm;
