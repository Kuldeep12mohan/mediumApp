import { Link, useNavigate } from "react-router-dom";
// import { useUser } from "../hooks";
import { useState } from "react";
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
  const navigate = useNavigate();
  // const { user } = useUser();
  const [logout,showLogout] = useState(false);
  return (
    <div className="flex justify-between items-center border-b px-10 py-4">
      <div className="text-xl">
        <Link to="/">Medium</Link>
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
        <div onClick={()=>
          showLogout(!logout)
        } className="hover:cursor-pointer relative">
          <Avatar authorName={localStorage.getItem("username")?.charAt(0) || ""} />
          {logout&&<div className="z-20 absolute top-10 right-2 border bg-black border-slate-600 py-3 rounded-lg hover:cursor-pointer">
            <div className="text-white hover:cursor-pointer hover:bg-white hover:text-black w-full px-5 py-2 " onClick={()=>
              {
                navigate("/profile")
              }
            }>profile</div>
            <div className="text-white hover:cursor-pointer hover:bg-white hover:text-black w-full px-5 py-2" onClick={()=>
            {
              localStorage.removeItem("token");
              localStorage.removeItem("username");
              localStorage.removeItem("userId")
              localStorage.removeItem("description")
              navigate("/signin")
            }
          }>logout</div>
            </div>}
        </div>
      </div>
    </div>
  );
};

export default Appbar;
