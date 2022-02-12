import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import { login, logout } from './features/user/userSlice';
import jwtDecode from 'jwt-decode';

function App() {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('user');
  useEffect(() => {
    if (token) {
      const decodedTokenJwt = jwtDecode(token, { complete: true });
      const dateNow = +new Date();
      console.log(dateNow, decodedTokenJwt.exp);
      console.log(decodedTokenJwt.exp * 1000 < dateNow);
      if (decodedTokenJwt.exp *1000 < dateNow) {
        console.log('logout');
        dispatch(logout());
      } else {
        console.log('login');
        dispatch(login(token));
      }
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
