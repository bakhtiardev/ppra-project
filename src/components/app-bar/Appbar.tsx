import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Profile from "./Profile";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import { makeStyles } from "@mui/styles";
import NustLogo from "../../assets/nust.png";

const pages = ["Dashboard", "Contact", "About"];
const settings = ["Profile", "Account", "Logout"];

function Appbar(props: { open: boolean; toggleDrawer: any }) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [userSetting, setUserSetting] = React.useState<
    null | string | HTMLElement
  >(null);

  const handleOxpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
    // console.log("handleOpenNavMenu", event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    // console.log("handleOpenUserMenu", event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(null);
    // console.log(e.target.value);
  };

  return (
    <AppBar position="absolute" open={props.open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={props.toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(props.open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Avatar alt="NUST" src={NustLogo} sx={{ width: 43, height: 43 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            // flexGrow: 1,
            ml: 1,
            mr: 1,
            display: { xs: "none", md: "flex" },
            fontFamily: "inherit",
            fontSize: 18,
            fontWeight: 550,
            letterSpacing: ".05rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          NUST
        </Typography>
        <Divider
          orientation="vertical"
          variant="middle"
          sx={{
            width: "1.2px",
            height: "25px",
            backgroundColor: "white",
            marginRight: 1.5,
            marginLeft: 0.5,
          }}
          // flexItem
        />
        <PlagiarismIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            flexGrow: 1,
            mr: 1,
            display: { xs: "none", md: "flex" },
            fontFamily: "inherit",
            fontSize: 18,
            fontWeight: 550,
            // letterSpacing: '.3rem',
            color: "inherit",
            textDecoration: "none",
          }}
        >
          PPRA Monitor
        </Typography>
        {/* <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Dashboard
        </Typography> */}

        <IconButton color="inherit">
          <Badge badgeContent={4} color="warning">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Profile />
      </Toolbar>
    </AppBar>
  );
}
export default Appbar;
