import { useState } from "react";

const Blog = ({ blog, increaseLikes, deleteBlog, username }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleLikes = async () => {
    const updatedBlog = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    await increaseLikes(updatedBlog, blog.id);
  };

  const handleDeletion = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await deleteBlog(blog.id);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}{" "}
        <input
          type="button"
          value={showDetails ? "hide" : "view"}
          onClick={() => setShowDetails(!showDetails)}
        />
      </div>
      {showDetails && (
        <div>
          {blog.url}
          <br />
          likes {blog.likes}{" "}
          <input type="button" value="like" onClick={handleLikes} />
          <br />
          {blog.user.name}
          <br />
          {username === blog.user.username && (
            <input type="button" value="remove" onClick={handleDeletion} />
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
