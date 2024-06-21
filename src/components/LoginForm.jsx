import { useState } from "react";
import loginServices from "../services/login";
import blogServices from "../services/blogs";

const LoginForm = ({ setUser, setNotification, discardNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await loginServices.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      blogServices.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotification({
        message: `logged in as ${user.name}`,
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        <label htmlFor="password">password</label>
        <input
          type="text"
          name="password"
          id="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <input type="submit" value="login" />
      </form>
    </>
  );
};

export default LoginForm;
