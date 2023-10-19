import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { removeLocalStorageUser } from '../../utils/localStorageUtils';
import SearchBar from './Search';
import MobileMenu from './MobileMenu';
import Menu from './Menu';
import { MenuIcon, AccountCircle } from './Icons';
import CartModal from './CartModal';
import { clearUser } from '../../app/store';

const NavBar = ({ searchBar = false }: { searchBar?: boolean | null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    axios.post('http://localhost:3001/logout').then((res) => {
      removeLocalStorageUser();
      dispatch(clearUser());
      navigate('/sign-in');
    });
  };

  return (
    <Box sx={{ flexGrow: 1, zIndex: 5 }}>
      <AppBar
        position='fixed'
        sx={{
          backgroundColor: '#333333',
          maxWidth: '80%',
          margin: 'auto',
          borderRadius: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '10px',
        }}
      >
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            NeighborMarket
          </Typography>
          {searchBar && <SearchBar />}
          <Box sx={{ flex: 0.5 }} />
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexGrow: 0.5,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <IconButton size='large' color='inherit' component={Link} to='/'>
              Home
            </IconButton>
            <IconButton
              size='large'
              color='inherit'
              component={Link}
              to='/browse'
            >
              Browse{' '}
            </IconButton>
            <IconButton
              size='large'
              color='inherit'
              component={Link}
              to='/sell'
            >
              Sell
            </IconButton>
            <CartModal />
            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              aria-controls='primary-search-account-menu'
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <CartModal />
            <IconButton
              size='large'
              aria-label='show more'
              aria-controls='primary-search-account-menu-mobile'
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
      />
      <Menu
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        anchorEl={anchorEl}
        handleLogout={handleLogout}
      />
    </Box>
  );
};

export default NavBar;
