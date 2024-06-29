import Appbar from "../components/Appbar";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
const Publish = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div>
      <Appbar />
      <div className="flex justify-center pt-8">
        <div className="w-full md:max-w-screen-lg">
          <input
            onChange={(e)=>setTitle(e.target.value)}
            type="text"
            id="helper-text"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Title"
          />
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <div className="w-full max-w-screen-lg">
          <TextEditor onChange={(e)=>setContent(e.target.value)} />
          <button
            onClick={async() => {
              const response = await axios.post(`${BACKEND_URL}/api/v1/blog/post`,{
                title,
                content
              },
            {
              headers:{
                Authorization:localStorage.getItem('token')
              }
            })
            if(response){
              navigate("/")
            }
            }}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-green-800 mt-4"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

const TextEditor = ({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}) => {
  return (
    <div>
      <textarea
        onChange={onChange}
        id="message"
        rows={15}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write your Blog here"
      ></textarea>
    </div>
  );
};

export default Publish;
