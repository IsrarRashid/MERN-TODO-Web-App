import React, { useContext, useEffect, useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import updateTodoRequest from "../api/updateTodoRequest";
import deleteTodoRequest from "../api/deleteTodoRequest";
import { TokenContext } from "../App";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const TodoItem = ({ todo }) => {
  const [text, setText] = useState(todo.text);
  const [completed, setCompleted] = useState(todo.completed);
  const [token] = useContext(TokenContext);
  const queryClient = new useQueryClient();
  const notifyUpdate = () => toast.success("Updated!");
  const notifyDelete = () => toast.error("Deleted!");
  const { mutate: updatedTodo } = useMutation((updatedTodo) =>
    updateTodoRequest(updatedTodo, token)
  );

  const { mutate: deleteTodo } = useMutation((deleteTodo) => {
    notifyDelete();
    deleteTodoRequest(deleteTodo, token);
  });

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleUpdate = () => {
    notifyUpdate();
    updateTodoText();
  };

  const handleTextKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      notifyUpdate();
      updateTodoText();
    }
  };

  const handleCheckboxChange = (e) => {
    setCompleted(e.target.checked);
    notifyUpdate();
    updateTodoCompleted(e.target.checked);
  };

  const updateTodoText = () => {
    updatedTodo({
      ...todo,
      text: text,
    });
  };

  const updateTodoCompleted = (completed) => {
    updatedTodo({
      ...todo,
      completed: completed,
    });
  };

  useEffect(() => {
    updateTodoText();
  }, []); // Send initial update request when component mounts

  return (
    <div className="d-flex">
      <div className="input-group my-2">
        <div className="input-group-text">
          <input
            className="form-check-input"
            type="checkbox"
            checked={completed}
            onChange={handleCheckboxChange}
          />
        </div>
        <input
          className="form-control"
          type="text"
          value={text}
          onChange={handleTextChange}
          onKeyPress={handleTextKeyPress}
        />
        <button className="btn btn-success" onClick={handleUpdate}>
          Update
        </button>
        <button className="btn btn-danger" onClick={() => deleteTodo(todo)}>
          Delete
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TodoItem;
