import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    navigate("/");
  };

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
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
