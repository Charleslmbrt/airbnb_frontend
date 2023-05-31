import { useState } from "react";

// import Packages
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Import img
import logoAirbnb from "../img/logo-airbnb.svg";

const Login = ({ handleConnect }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      "https://airbnb-cl.herokuapp.com/user/login",
      {
        email: email,
        password: password,
      }
    );
    handleConnect(response.data.token, response.data._id);
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex justify-center  mt-5">
          <Link to="/">
            <img src={logoAirbnb} alt="Logo Airbnb" className="h-20" />
          </Link>
        </div>
        <div className="w-full px-10 text-center mx-auto mt-36 sm:max-w-[450px]">
          <h1 className="tex400 text-xl">Log in</h1>
          <form
            action=""
            className="flex flex-col text-slate-700"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              className="placeholder-slate-400 mt-5 rounded-xl h-14 bg-neutral-50 border border-solid border-slate-300 text-sm p-5 focus:outline-none focus:border-red-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className="placeholder-slate-400 mt-5 rounded-xl h-14 bg-neutral-50 border border-solid border-slate-300 text-sm p-5 focus:outline-none focus:border-red-500"
            />

            <button
              type="submit"
              className="text-center text-neutral-50 mt-5 rounded-xl h-14 focus:outline-none focus:border-red-500 bg-red-500 transition-transform hover:scale-[1.03] duration-500 ease-out"
            >
              Login
            </button>
          </form>
          <p className="mt-5">
            <span className="text-slate-400">Don't you have an account? </span>
            <Link to="/user/signup">Sign up.</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
