import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../Store/UserContext";
import "../Styles/LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const realUsername = import.meta.env.VITE_USERNAME;
  const realPassword = import.meta.env.VITE_PASSWORD;

  const { login } = useContext(UserContext)!;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setLoginError("Please enter username and password");
      return;
    }
    if (username === realUsername && password === realPassword) {
      login(username);
      navigate("/");
    } else {
      setLoginError("Invalid Username/Password");
    }
  };

  return (
    <>
      <div className="login-container">
        {loginError && <p>{loginError}</p>}
        <form onSubmit={handleSubmit} className="login-content">
          <input
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
            type="text"
            className="input"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            type="password"
            className="input"
          />
          <button className="btn">Login</button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
