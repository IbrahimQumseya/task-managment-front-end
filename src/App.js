import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "./screens/SignIn";

import Home from "./screens/Home";

import SignUp from "./screens/SignUp";
import NavBar from "./components/NavBar";
import useToken from "./components/useToken";
import { useState } from "react";

function App() {
  // const token = getToken();
  // const [token, setToken] = useState();
  // const navigate = useNavigate();
  const { token, setToken } = useToken();
  const [isAuthentificated,setIsAuthentificated] = useState(false);

  //useEffite and use state

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home token={token} setToken={setToken} />}
        />
        <Route
          path="/home"
          element={<Home token={token} setToken={setToken} />}
        />
        <Route path="/login" element={<SignIn setToken={setToken} />} />
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
