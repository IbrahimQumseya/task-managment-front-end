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
  const user = useSelector((state) => state.user);
  // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // const [isAuthenticated, setIsAuthenticated] = useState();

  //useEffect and use state check local storage and set auth
  const token = sessionStorage.getItem("user");
  useEffect(() => {
    if (token) {
      dispatch(login(token));
      // setIsAuthenticated(true);
    } else {
      // dispatch(logout(auth));
      dispatch(logout());
    }
  }, [token, dispatch]);

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
            // setIsAuthenticated={setIsAuthenticated}
            // isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/home"
          element={
            <Home
            // setIsAuthenticated={setIsAuthenticated}
            // isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/login"
          element={
            <SignIn
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
