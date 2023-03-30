import { useState } from "react";

// import package
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";

// Import img
import logoAirbnb from "../img/logo-airbnb.svg";

const Signup = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const navigate = useNavigate();

  const fileTypes = ["JPG", "PNG", "GIF", "WEBP", "JPEG"];

  const handleChange = async (files) => {
    const file = files;
    const url = URL.createObjectURL(file);
    setPicture(file);
    setAvatarPreview(url);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    FormData.append("email", email);
    FormData.append("lastname", lastname);
    FormData.append("firstname", firstname);
    FormData.append("password", password);
    FormData.append("picture", picture);

    try {
      if (password === confirmPassword) {
        const response = await axios.post(
          "http://localhost:3000/user/signup",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        handleToken(response.data.result.token);
        navigate("/");
      } else {
        console.log(
          "Your password confirmation is different from your password."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex justify-center  mt-5">
          <Link to="/">
            <img src={logoAirbnb} alt="Logo Airbnb" className="h-16" />
          </Link>
        </div>
        <div className="w-full px-10 text-center mx-auto mt-10 sm:max-w-[450px]">
          <h1 className="tex400 text-xl">Sign up</h1>
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
              type="text"
              placeholder="Lastname"
              value={lastname}
              onChange={(event) => {
                setLastname(event.target.value);
              }}
              className="placeholder-slate-400 mt-5 rounded-xl h-14 bg-neutral-50 border border-solid border-slate-300 text-sm p-5 focus:outline-none focus:border-red-500"
            />
            <input
              type="text"
              placeholder="Firstname"
              value={firstname}
              onChange={(event) => {
                setFirstname(event.target.value);
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
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
              className="placeholder-slate-400 mt-5 rounded-xl h-14 bg-neutral-50 border border-solid border-slate-300 text-sm p-5 focus:outline-none focus:border-red-500"
            />
            <div>
              {avatarPreview ? (
                <>
                  <div className="sm:flex sm:flex-col sm:items-center">
                    <div className="flex flex-row flex-nowrap mt-5 overflow-hidden overflow-x-scroll sm:max-w-[700px]">
                      <img
                        src={avatarPreview}
                        alt=""
                        className="max-h-64 w-64 object-cover mr-1 last:mr-0"
                      />
                    </div>
                    <button
                      className="mt-5 w-30 h-10 text-sm rounded-lg px-4 bg-red-400 text-white"
                      onClick={() => {
                        setAvatarPreview("");
                      }}
                    >
                      Remove pictures
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="sm:flex sm:flex-col">
                    <div className="mt-5">
                      <FileUploader
                        handleChange={handleChange}
                        types={fileTypes}
                        value={picture}
                        multiple={false}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <button
              type="submit"
              className="text-center text-neutral-50 mt-5 rounded-xl h-14 focus:outline-none focus:border-red-500 bg-red-500 transition-transform hover:scale-[1.03] duration-500 ease-out"
            >
              Register
            </button>
          </form>
          <p className="mt-5">
            <span className="text-slate-400">
              You already have an account ?{" "}
            </span>
            <Link to="/user/login">Login.</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
