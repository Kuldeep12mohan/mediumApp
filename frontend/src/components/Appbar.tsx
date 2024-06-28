import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
function Avatar({ authorName }: { authorName: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 p-2">
      <span className="text-base text-gray-600 dark:text-gray-300">
        {authorName}
      </span>
    </div>
  );
}

const Appbar = () => {
  const [username,setUsername] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("url",response.data.user.profileURL)
      localStorage.setItem("username",response.data.user.name);
      localStorage.setItem("userId",response.data.user.id);
      localStorage.setItem("profile",response.data.user.profileURL);
      setUsername(response.data.user.name);
    };
    fetchUser();
  }, []);
  const navigate = useNavigate();
  const [logout, showLogout] = useState(false);
 

  return (
    <div className="flex justify-between items-center border-b px-10 py-4">
      <div className="text-xl">
        <Link to="/">Bloggify</Link>
      </div>
      <div className="flex justify-between items-center">
        <Link to="/publish">
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            New Post
          </button>
        </Link>
        <div
          onClick={() => showLogout(!logout)}
          className="hover:cursor-pointer relative"
        >
          <Avatar authorName={localStorage.getItem("username")?.charAt(0)||username} />
          {logout && (
            <div className="z-20 absolute top-10 right-2 border bg-black border-slate-600 py-3 rounded-lg hover:cursor-pointer">
              <div
                className="text-white hover:cursor-pointer hover:bg-white hover:text-black w-full px-5 py-2"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </div>
              <div
                className="text-white hover:cursor-pointer hover:bg-white hover:text-black w-full px-5 py-2"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("username");
                  localStorage.removeItem("userId");
                  localStorage.removeItem("description");
                  localStorage.removeItem("profile")
                  navigate("/signin");
                }}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appbar;
