import { BrowserRouter, Route, Routes } from "react-router-dom";

// import SignIn from "./screens/SignIn";

// import Home from "./screens/Home";

// import SignUp from "./screens/SignUp";
import NavBar from "./components/NavBar";
import useToken from "./components/useToken";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import { login, logout } from "./features/user/userSlice";
function App() {
  // const token = getToken();
  // const [token, setToken] = useState();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, setToken } = useToken();
  const user = useSelector((state) => state.user);
  // const [isAuthenticated, setIsAuthenticated] = useState();

  //useEffect and use state check local storage and set auth
  useEffect(() => {
    if (token) {
      dispatch(login());
      // setIsAuthenticated(true);
    } else {
      // dispatch(logout(auth));
      dispatch(logout());
    }
  }, [user]);

  return (
    <BrowserRouter>
      <NavBar
        // isAuthenticated={isAuthenticated}
        // setIsAuthenticated={setIsAuthenticated}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              token={token}
              setToken={setToken}
              // setIsAuthenticated={setIsAuthenticated}
              // isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/home"
          element={
            <Home
              token={token}
              setToken={setToken}
              // setIsAuthenticated={setIsAuthenticated}
              // isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/login"
          element={
            <SignIn
              setToken={setToken}
              // setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
