import React from "react";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { AccountCircle, Checklist, Logout } from "./Icons";

const RenderMenu = ({
  isMenuOpen,
  handleMenuClose,
  anchorEl,
  handleLogout,
}: {
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  anchorEl: null | HTMLElement;
  handleLogout: () => void;
}) => {
  const menuId = "primary-search-account-menu";

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <IconButton size="large" color="inherit" component={Link} to="/profile">
          <AccountCircle />
        </IconButton>
        <Link
          to="/profile"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Profile
        </Link>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          color="inherit"
          component={Link}
          to="/my-listings"
        >
          <Checklist />
        </IconButton>
        <Link
          to="/my-listings"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          My Listings
        </Link>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton size="large" color="inherit">
          <Logout />
        </IconButton>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default RenderMenu;
