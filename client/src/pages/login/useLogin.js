import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useLoginMutation } from "../../redux/api/apiSlice";

const useLogin = () => {
  const [Login] = useLoginMutation();
  const [err, setErr] = useState(null);

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // todo
    Login(input).then((resp) => {
      let error;
      if (resp?.error?.data) error = resp?.error?.data;
      if (!error) {
        setCurrentUser(resp.data);
        navigate("/");
      } else {
        setErr(error);
      }
    });
  };

  return {handleLogin,handleChange, err}
};

export default useLogin;
