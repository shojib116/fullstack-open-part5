import { useState } from "react";
import loginServices from "../services/login";

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await loginServices.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>log in to application</h2>
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
