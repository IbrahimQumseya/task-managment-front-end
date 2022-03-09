import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import { login, logout } from './features/user/userSlice';
import jwtDecode from 'jwt-decode';
import ProfileUser from './screens/user/ProfileUser';

function App() {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('user');

  useEffect(() => {
    ///modific
    if (!token) return;
    const { exp } = jwtDecode(token, { complete: true });
    const dateNow = +new Date();
    exp * 1000 < dateNow ? dispatch(logout()) : dispatch(login(token));
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/user/profile' element={<ProfileUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
