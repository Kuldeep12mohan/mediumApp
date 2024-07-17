import BlogCard from "../components/BlogCard";
import Appbar from "../components/Appbar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { formatDate } from "../hooks";
import { useContext } from "react";
import { MyContext } from "../context";
const Blogs = () => {

  const context = useContext(MyContext);
  
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider');
  }

  const { logout, showLogout } = context;
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);
  const { loading, blogs } = useBlogs();
  return (
    <div onClick={()=>{
      if(logout===true){
        showLogout(false);
      }
    }}>
      <div className="sticky top-0 bg-white z-10">
        <Appbar />
      </div>
      {loading ? (
        <div className="flex justify-center h-screen items-center">
          <div className="max-w-xl w-full">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="max-w-xl mt-2">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="cursor-pointer border-2 shadow-md rounded-lg px-2 py-2"
              >
                <BlogCard
                  id={blog.id}
                  authorName={blog.author.name}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={formatDate(blog.publishedDate)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
