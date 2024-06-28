import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export const Edit = () => {
  const [imageUrl,setImageUrl] = useState("");
  const handleImageUpload = async (event:any) => {
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append("file", file);
    formData.append("upload_preset", "gacqpnmt"); 

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dbkmmin3x/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data.secure_url);
      setImageUrl(data.secure_url);
      localStorage.setItem("profile",data.secure_url);
    } catch (error) {
      console.log(error);
    }
  };
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("username") || "");
    setDescription(localStorage.getItem("description") || "");
  }, []);

  const updateProfile = async () => {
    setLoader(true);
    const response = await axios.patch(
      `${BACKEND_URL}/api/v1/user/me/update`,
      { name, description,imageUrl },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    console.log(response.data);
    localStorage.setItem("username", response.data.response.name);
    localStorage.setItem("description", response.data.response.description);
    setLoader(false);
    navigate("/profile");
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          className="w-full border border-gray-300 rounded-lg py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Image
        </label>
        <input
          id="image"
          className="w-full border border-gray-300 rounded-lg py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="file"
          placeholder="Enter your file"
          onChange={handleImageUpload}
        />
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          className="w-full border border-gray-300 rounded-lg py-2 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter your description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />
        <button
          onClick={updateProfile}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          {loader ? (
            <div role="status" className="flex justify-center items-center">
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Update"
          )}
        </button>
      </div>
    </div>
  );
};
