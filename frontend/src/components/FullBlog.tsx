import Appbar from "./Appbar";
import { avatar } from "./BlogCard";
import { Blog, formatDate } from "../hooks";
function Avatar({ authorName }: avatar) {
  return (
    <div className="relative inline-flex items-center justify-center w-9 h-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 p-2">
      <span className="text-base text-gray-600 dark:text-gray-300">
        {authorName}
      </span>
    </div>
  );
}

const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-10">
          <div className="col-span-12 md:col-span-8 ">
            <div className="text-4xl font-extrabold w-full">{blog.title}</div>
            <div className="text-slate-500 pt-2 w-full">{`Posted on ${formatDate(blog.publishedDate)}`}</div>
            <div className="pt-4 w-4/5">{blog.content}</div>
          </div>
          <div className="md:col-span-4 md:block hidden">
           <div className="text-lg text-slate-600">Author</div>
            <div className="flex justify-center items-center pt-1">
              <div className="pr-2">
                <Avatar authorName={blog.author.name[0]} />
              </div>
              <div>
                <div className="text-2xl font-bold">{blog.author.name}</div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about the author to grab the user's
                  attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FullBlog
