import { useState } from "react";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import { login } from "./api";

type User = {
  email: string
  password: string
};

function App() {
  const [user, setUser] = useState();

  const handleLogin = async (user: User) => {
    const response = await login(user);
    console.log("res: ", response);
    if(response.error) {
      alert(response.error);
    } else {
      setUser(response);
    }
  };


  const handleLogout = () => {
    setUser(undefined);
  };

  return user ? <Profile handleLogout={handleLogout} /> : <Login handleLogin={handleLogin} error={Response.error} />;
}

export default App;
