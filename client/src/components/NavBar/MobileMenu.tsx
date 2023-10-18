import React from "react";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { SellIcon, AccountCircle, SearchIcon, HomeIcon } from "./Icons";

const MobileMenu = ({
  isMobileMenuOpen,
  handleMobileMenuClose,
  handleProfileMenuOpen,
  mobileMoreAnchorEl,
}: {
  isMobileMenuOpen: boolean;
  handleMobileMenuClose: () => void;
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  mobileMoreAnchorEl: null | HTMLElement;
}) => {
  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" color="inherit" component={Link} to="/">
          <HomeIcon />
        </IconButton>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Home
        </Link>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit" component={Link} to="/browse">
          <SearchIcon />
        </IconButton>
        <Link to="/browse" style={{ textDecoration: "none", color: "inherit" }}>
          Browse
        </Link>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit" component={Link} to="/sell">
          <SellIcon />
        </IconButton>
        <Link to="/sell" style={{ textDecoration: "none", color: "inherit" }}>
          Sell
        </Link>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Personal</p>
      </MenuItem>
    </Menu>
  );
};

export default MobileMenu;
