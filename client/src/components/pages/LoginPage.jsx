import React, { useContext, useState } from "react";
import loginRequest from "../../api/loginRequest";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../App";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useContext(TokenContext);
  const navigate = useNavigate();
  const notifyUpdate = () => toast("Logged In Successfully");

  const handleLogin = (e) => {
    e.preventDefault();
    notifyUpdate();
    loginRequest(password)
      .then(({ token }) => {
        setToken(token);
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <>
      <h1>LOGIN</h1>
      <div style={{ color: "white" }}>{error}</div>
      <form className="mb-3" onSubmit={handleLogin}>
        <input
          className="form-control m-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-info m-2">Login</button>
        <p className="lead">
          <em>Hint-abc</em>
        </p>
      </form>
    </>
  );
};

export default LoginPage;
