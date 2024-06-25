import BlogCard from "../components/BlogCard";
import Appbar from "../components/Appbar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";
const Blogs = () => {
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
       <div className="max-w-xl">
         {blogs.map((blog, index) => (
           <div key={index} className="cursor-pointer">
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
