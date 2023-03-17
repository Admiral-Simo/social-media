import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../redux/api/apiSlice";
import "./register.scss";

const Register = () => {
  const [register] = useRegisterMutation();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    if (input.username && input.email && input.password && input.name) {
      register(input).then((resp) => setErr(resp.error.data));
    } else {
      setErr(true);
    }
  };

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Social Media.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            at rem vitae, officiis esse enim reprehenderit ut. Laborum id ipsam
            commodi quidem, maxime vero odio illum ea asperiores aliquam
            corporis.
          </p>
          <span>have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleClick}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <p className="text-red-500">{err && err}</p>
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
