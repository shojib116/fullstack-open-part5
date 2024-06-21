import { useState } from "react";
import blogServices from "../services/blogs";

const NewBlogForm = ({
  blogs,
  setBlogs,
  setNotification,
  discardNotification,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateNew = async (event) => {
    event.preventDefault();

    try {
      const createdBlog = await blogServices.create({ title, author, url });
      setBlogs(blogs.concat(createdBlog));
      setNotification({
        message: `a new blog ${title} by ${author} added`,
        status: "success",
      });
      discardNotification();
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        status: "error",
      });
      discardNotification();
    }
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateNew}>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        <label htmlFor="author">author:</label>
        <input
          type="text"
          name="author"
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        <label htmlFor="url">url:</label>
        <input
          type="text"
          name="url"
          id="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <input type="submit" value="create" />
        <br />
      </form>
    </>
  );
};

export default NewBlogForm;
