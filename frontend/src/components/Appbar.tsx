import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../context";
function Avatar() {
  return (
    <div>
    <img
      className="w-10 h-10 rounded-full"
      src={(localStorage.getItem("profile")!='null')?localStorage.getItem("profile") as string:"https://c8.alamy.com/comp/PH4JDM/avatar-icon-avatar-flat-symbol-isolated-on-white-background-avatar-simple-icon-avatar-abstract-icon-in-black-vector-illustration-for-graphic-desig-PH4JDM.jpg"}
    />
  </div>
  );
}

const Appbar = () => {
  const navigate = useNavigate();
  const context = useContext(MyContext);
  
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider');
  }

  const { logout, showLogout } = context;

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
          <Avatar/>
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
