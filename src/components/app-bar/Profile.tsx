import React from "react";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { getAuth } from "firebase/auth";
import { Badge } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, addUser, selectUser } from "../../store/user/userSlice";
import { styled } from "@mui/material/styles";
// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  IconButton,
  Paper,
  Popper,
  Stack,
  Tab,
  Tabs,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";

// const pages = ['Products', 'Pricing', 'Blog'];

const settings = ["Profile", "Account", "Logout"];

const Profile = (props: { open: boolean }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [profileOption, setProfileOption] = React.useState("");
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {};

  const handleProfileOptionChange = (setting: string) => {
    setAnchorElUser(null);
    // setProfileOption(setting);
    // console.log(setting);
    if (setting === "Logout") {
      handleLogoutUser();
    }
  };
  const handleLogoutUser = () => {
    console.log("Logout Function called");
    const loggedOutUser = getAuth().signOut();
    dispatch(logout());
  };

  //   React.useEffect(()=>{
  //     if(profileOption==='Logout'){

  //     }

  //   },[profileOption])
  const photoURL = user?.photoURL;

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{}}>
          {/* <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          > */}
          <Avatar
            alt="profile user"
            src={photoURL}
            sx={{ width: 32, height: 32 }}
          />
          {/* </StyledBadge> */}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting}
            onClick={() => handleProfileOptionChange(setting)}
          >
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Profile;
