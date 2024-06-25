import { Link } from "react-router-dom";
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
        <div>
          <Avatar authorName="K" />
        </div>
      </div>
    </div>
  );
};

export default Appbar;
