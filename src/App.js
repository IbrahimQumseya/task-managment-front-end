import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "./screens/SignIn";

import Home from "./screens/Home";

import SignUp from "./screens/SignUp";
import NavBar from "./components/NavBar";
import useToken from "./components/useToken";
import { useEffect, useState } from "react";

function App() {
  // const token = getToken();
  // const [token, setToken] = useState();
  // const navigate = useNavigate();
  const { token, setToken } = useToken();
  const [isAuthenticated, setIsAuthenticated] = useState();

  //useEffite and use state check local storage and set auth
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  return (
    <BrowserRouter>
      <NavBar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              token={token}
              setToken={setToken}
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/home"
          element={
            <Home
              token={token}
              setToken={setToken}
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/login"
          element={
            <SignIn
              setToken={setToken}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
    // <div className="wrapper">
    //   <h1>Application</h1>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/home">
    //         <Home />
    //       </Route>
    //     </Routes>
    //   </BrowserRouter>
    // </div>
  );
}

export default App;
