import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useLoginMutation } from "../../redux/api/apiSlice";
import "./login.scss";
import useLogin from "./useLogin";

const Login = () => {
  const { handleLogin, handleChange, err } = useLogin();

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Social Media.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            at rem vitae, officiis esse enim reprehenderit ut. Laborum id ipsam
            commodi quidem, maxime vero odio illum ea asperiores aliquam
            corporis.
          </p>
          <span>Don't have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="Username"
            />
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Password"
            />
            {err && err}
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
