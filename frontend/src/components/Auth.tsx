import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@havoncom/medium-model";
import axios from "axios";
import { BACKEND_URL } from "../config";
import toast ,{Toaster } from "react-hot-toast";
interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value?: string;
}
function LabelledInput({
  label,
  placeholder,
  onChange,
  type = "text",
  value,
}: LabelledInputType) {
  return (
    <div className="mt-5">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
        {label}
      </label>
      <input
        value={value}
        type={type}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  );
}

const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const [loader,setLoader] = useState(false);
  const navigate = useNavigate();
  
  const sendRequest = async () => {
    try {
      setLoader(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`,
        postInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      setPostInputs({
        name: "",
        email: "",
        password: "",
      });
      toast.success(`${type==="signin"?"Sign in successful":"Sign up successful"}`)
      setLoader(false);
      setTimeout(()=>
      {
        navigate("/blogs")
      },1500)
    } catch (error) {
      console.log(error);
      alert("auth failed");
    }
    
  };
  const [postInputs, setPostInputs] = useState<SignupInput>({
    email: "",
    name: "",
    password: "",
  });
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="w-5/6 lg:w-3/5">
          <div>
            <div className="text-3xl text-center font-extrabold">
              {type === "signup"
                ? "Create an Account"
                : "Log in to your Account"}
            </div>
            <div className="text-slate-400 text-center">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account"}
              <Link
                to={type === "signin" ? "/signup" : "/signin"}
                className="pl-2 underline text-blue-600"
              >
                {type === "signin" ? "Sign Up" : "Log in"}
              </Link>
            </div>
          </div>
          <div className="mt-5">
            {type === "signup" ? (
              <LabelledInput
                value={postInputs.name}
                label="Name"
                placeholder="Enter your name"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            ) : (
              ""
            )}
            <LabelledInput
              value={postInputs.email}
              label="Email"
              placeholder="Enter your email"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              value={postInputs.password}
              label="Password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full mt-5"
            onClick={sendRequest}
          >
            {!loader?(type === "signup" ? "Sign Up" : "Sign In"):"Loading..."}
          </button>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};
export default Auth;
