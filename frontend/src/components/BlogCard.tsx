import { Link } from "react-router-dom";

interface blogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}
const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: blogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-200 p-4">
        <div className="flex items-center text-sm">
          <Avatar authorName={`${authorName.split(" ")[0][0].toUpperCase()}`} />
          <span className="font-extralight pl-2">{authorName}</span>{" "}
          <span className="pl-2">&#9679;</span>
          <span className="pl-2 font-thin text-slate-500">{publishedDate}</span>
        </div>
        <div className="text-2xl font-semibold pt-2">{title}</div>
        <div className="font-normal">
          {content.slice(0, 100)}
          {content.length > 100 ? "..." : ""}
        </div>
        <div className="text-slate-400 text-sm font-light pt-2">
          {Math.ceil(content.length / 100) + " minute(s) read"}
        </div>
      </div>
    </Link>
  );
};

export interface avatar {
  authorName: string;
}

function Avatar({ authorName }: avatar) {
  return (
    <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 p-2">
      <span className="text-xs text-gray-600 dark:text-gray-300">
        {authorName}
      </span>
    </div>
  );
}

export default BlogCard;
