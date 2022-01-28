import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "./screens/SignIn";
import ColorTabs from "./components/ColorTabs";

import Home from "./screens/Home";

import SignUp from "./screens/SignUp";

function App() {
  // const token = getToken();
  // const [token, setToken] = useState();


  return (
    <BrowserRouter>
      <ColorTabs />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
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
