import BlogCard from "../components/BlogCard";
import Appbar from "../components/Appbar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
const Blogs = () => {
  useEffect(()=>
  {
    const fetchUser = async()=>
      {
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/me`,{
          headers:{
            Authorization:localStorage.getItem("token")
          }
        });
        const logo = response.data.user.name;
        localStorage.setItem("username",logo);
        localStorage.setItem("userId",response.data.user.id);
      }
      fetchUser()
  },[])
  const navigate = useNavigate();
  useEffect(()=>
  {
   if(!localStorage.getItem("token"))
    {
      navigate("/signin");
    }
  },[])
  const { loading, blogs } = useBlogs();
  return (
    <>
      <div className="sticky top-0 bg-white z-10">
        <Appbar />
      </div>
      {loading?<div className="flex justify-center h-screen items-center">
        <div className="max-w-xl w-full">
        <BlogSkeleton/>
        <BlogSkeleton/>
        <BlogSkeleton/>
        <BlogSkeleton/>
        </div>
        </div>:
       <div className="flex justify-center">
       <div className="max-w-xl mt-2">
         {blogs.map((blog, index) => (
           <div key={index} className="cursor-pointer border-2 shadow-md rounded-lg px-2 py-2">
             <BlogCard
               id={blog.id}
               authorName={blog.author.name}
               title={blog.title}
               content={blog.content}
               publishedDate="Jan 9 2023"
             />
           </div>
         ))}
       </div>
     </div>
      }
    </>
  );
};

export default Blogs;
