import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    status: null,
  });

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const discardNotification = () => {
    setTimeout(() => {
      setNotification({ message: null, status: null });
    }, 5000);
  };

  const createNew = async (blog) => {
    blogFormRef.current.toggleVisibility();

    try {
      const createdBlog = await blogService.create(blog);
      setBlogs(blogs.concat(createdBlog));
      setNotification({
        message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
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

  const increaseLikes = async (updatedBlog, blogId) => {
    try {
      const response = await blogService.updateLikes(updatedBlog, blogId);
      setBlogs(
        blogs.map((blog) => {
          if (blog.id === response.id)
            return { ...blog, likes: response.likes };
          return blog;
        })
      );
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        status: "error",
      });
      discardNotification();
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    setUser(null);
    window.localStorage.removeItem("user");
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        {notification.message && (
          <Notification
            message={notification.message}
            status={notification.status}
          />
        )}
        <LoginForm
          setUser={setUser}
          setNotification={setNotification}
          discardNotification={discardNotification}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification.message && (
        <Notification
          message={notification.message}
          status={notification.status}
        />
      )}
      <p>
        {user.name} logged in{" "}
        <input type="button" value="logout" onClick={handleLogout} />
      </p>
      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <NewBlogForm createNew={createNew} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} increaseLikes={increaseLikes} />
      ))}
    </div>
  );
};

export default App;
