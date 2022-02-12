import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Home from './screens/Home';
import jwt_decode from 'jwt-decode';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import { login, logout } from './features/user/userSlice';

function App() {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('user');

  useEffect(() => {
    if (token) {
      const decodedTokenJwt = jwt_decode(token, { complete: true });
      const dateNow = new Date();
      if (decodedTokenJwt.exp > dateNow.getTime()) {
        sessionStorage.removeItem('user');
        dispatch(logout());
      }
      dispatch(login(token));
    } else {
      dispatch(logout());
    }
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
