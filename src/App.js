import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import { login, logout, setUser } from './features/user/userSlice';
import jwtDecode from 'jwt-decode';
import ProfileUser from './screens/user/ProfileUser';

function App() {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('user');
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    ///modific

    if (!token) return;
    const { exp, user } = jwtDecode(token, { complete: true });
    dispatch(setUser(user));
    const dateNow = +new Date();
    exp * 1000 < dateNow ? dispatch(logout()) : dispatch(login(token));
  }, [dispatch, token, isAuthenticated]);

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
