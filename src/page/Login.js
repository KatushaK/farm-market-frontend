import React, { useState } from "react";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(`https://farm-market-backend.onrender.com/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const dataRes = await fetchData.json()
      toast(dataRes.message);

      if(dataRes.alert) {
        dispatch(loginRedux(dataRes))
        navigate("/")
      }
    } else {
      toast("Please fill out required fields");
    }
  };

  

  return (
    <div className="signup">
      <div className="signup-modal">
        <h1 className="signup-text">Login</h1>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="signup-labels">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="signup-fields"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password" className="signup-labels">
            Password
          </label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="password-output"
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="showIcon"
              onClick={handleShowPassword}
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? <BiHide /> : <BiShow />}
            </span>
          </div>

          <button className="btn-signup">Login</button>
        </form>

        <p className="link-to-login">
          Don't have an account?{" "}
          <Link to="/signup" className="login-text">
            Sign up
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;


