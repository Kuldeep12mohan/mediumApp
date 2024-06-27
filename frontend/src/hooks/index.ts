import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
export interface Blog {
  id: string;
  content: string;
  title: string;
  author: {
    name: string;
    id:string
  };
}
export interface User{
  id:string,
  name:string,
  email:string
}

export const useBlog = ({ id }:{ id:string }) => {
  const [loading, setLoading] = useState(true);

  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    try {
      const fetchBlog = async () => {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/get/${id}`);
        const data = response.data.blog;
        console.log(data)
        setBlog(data);
        setLoading(false);
      };
      fetchBlog();
    } catch (error) {
      alert("error in fetching blogs");
    }
  }, []);

  return {
    loading,
    blog
  };
};
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);

  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    try {
      const fetchBlogs = async () => {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`);
        const data = response.data.blogs;
        setBlogs(data);
        // console.log(data[0].author.name)
        setLoading(false);
      };
      fetchBlogs();
    } catch (error) {
      alert("error in fetching blogs");
    }
  }, []);

  return {
    loading,
    blogs,
  };
};

