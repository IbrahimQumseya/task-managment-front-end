// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { languages, pages, settings } from '../asserts/data';
import LanguageIcon from '@mui/icons-material/Language';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
function NavBar() {
  //setIsAuthenticated and isAuthenticated
  let navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [languageMenu, setLanguageMenu] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const token = sessionStorage.getItem('user');
  const { t, i18n } = useTranslation();

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };
  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };
  const handleOpenLanguageMenu = (e) => {
    setLanguageMenu(e.currentTarget);
  };
  const handleCloseLanguageMenu = (language, e) => {
    if (language === 'en' || language === 'ro') {
      i18n.changeLanguage(language);
      setLanguageMenu(null);
    }
    setLanguageMenu(null);
  };

  const handleCloseNavMenu = (page, e) => {
    if (page.path === '/login' || page.path === '/register' || page.path === '/home' || page.path === '/') {
      navigate(page.path);
      setAnchorElNav(null);
    }
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = (name) => {
    if (name === 'Logout' && token) {
      dispatch(logout());
      sessionStorage.clear();
      navigate('/login');
      setAnchorElUser(null);
    }
    setAnchorElUser(null);
  };
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography variant='h6' noWrap component='div' sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            {t('Logo')}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              id='buttonMenu'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => {
                if (page.id > 2 && isAuthenticated) {
                  return (
                    <MenuItem key={page.id} onClick={() => handleCloseNavMenu(page)}>
                      <Typography textAlign='center'>{t(page.name)}</Typography>
                    </MenuItem>
                  );
                }
                if (!isAuthenticated && page.id < 3) {
                  return (
                    <MenuItem key={page.id} onClick={() => handleCloseNavMenu(page)}>
                      <Typography textAlign='center'>{t(page.name)}</Typography>
                    </MenuItem>
                  );
                }
              })}
            </Menu>
          </Box>
          <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {
              // error here!
              pages.map((page) => {
                if (isAuthenticated && page.id > 2) {
                  return (
                    <Button
                      key={page.id}
                      onClick={() => handleCloseNavMenu(page)}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {t(page.name)}
                    </Button>
                  );
                }
                if (!isAuthenticated && page.id < 3) {
                  return (
                    <Button
                      key={page.id}
                      onClick={() => handleCloseNavMenu(page)}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {t(page.name)}
                    </Button>
                  );
                }
              })
            }
          </Box>
          <Box sx={{ flexGrow: 0, width: 50 }}>
            <Tooltip title='Open Language'>
              <IconButton onClick={handleOpenLanguageMenu} sx={{ p: 0 }}>
                <LanguageIcon style={{ color: 'white', fontSize: 40 }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '50px' }}
              id='menu-appbar'
              anchorEl={languageMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(languageMenu)}
              onClose={handleCloseLanguageMenu}
            >
              {languages.map((language) => (
                <MenuItem key={language.id} onClick={() => handleCloseLanguageMenu(language.lang)}>
                  <Typography textAlign='center'>{t(language.name)}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {isAuthenticated && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.id} onClick={() => handleCloseUserMenu(setting.name)}>
                    <Typography textAlign='center'>{t(setting.name)}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
