// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { useQuery } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";

import readTodosRequest from "../../api/readTodosRequest";
import TodoItem from "../../components/TodoItem";
import CreateTodoForm from "../../components/CreateTodoForm";
import { TokenContext } from "../../App";
const TodoPage = () => {
  const [token] = useContext(TokenContext);
  /**hooks: hooks are some functions you can use in components to hook in the underline lifecycle in react. */
  const { isLoading, data: todos } = useQuery("todos", () =>
    readTodosRequest(token)
  );

  return (
    <div className="todos-list">
      <h1>MERN TODO WEB APP</h1>
      <CreateTodoForm />
      {isLoading ? (
        <ClipLoader size={150} />
      ) : (
        todos.map((todo) => <TodoItem todo={todo} key={todo._id} />)
      )}
    </div>
  );
};

export default TodoPage;
