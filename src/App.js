import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import SignIn from "./screens/SignIn";

import Home from "./screens/Home";

import SignUp from "./screens/SignUp";
import NavBar from "./components/NavBar";
import useToken from "./components/useToken";

function App() {
  // const token = getToken();
  // const [token, setToken] = useState();
  // const navigate = useNavigate();
  const { token, setToken } = useToken();

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
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
