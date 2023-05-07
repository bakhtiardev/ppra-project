import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, secondaryListItems } from "./listItems";
import Copyright from "../copy-right-footer/Copyright";
import Chart from "./Chart";
// import { auth } from "./firebase";

import Deposits from "./Deposits";
import Orders from "./Orders";
import Appbar from "../app-bar/Appbar";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/userSlice";
import Dropzone from "../dropzone/Dropzone";

import axios from "axios";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

// const displayName = user?.displayName;

function DashboardContent() {
  // const displayName = getAuth().currentUser?.displayName;
  const user = useAppSelector(selectUser);
  const displayName = user?.name;
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSubmit = async () => {
    // console.log("File", file);
    if (file) {
      console.log("File", file);

      let res = await uploadFile(file);
      console.log("Res", res.data);
      
    } else {
      // console.log("No File Selected");
    }
  };

  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    // formData=null
    return await axios.post("http://127.0.0.1:5000/upload", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  };
  React.useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Appbar toggleDrawer={toggleDrawer} open={open} />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {/* <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}> */}
                <Typography
                  variant="h6"
                  sx={{
                    color: "black",
                    fontFamily: "inherit",
                    fontWeight: 500,
                  }}
                  noWrap
                  href=""
                >
                  Welcome, {displayName}
                </Typography>
              </Grid>
              {/* Chart */}
              <Grid item xs={12} md={12} lg={12}>
                {/* <Paper
                  sx={{
                    p: 2,
                    alignContent: "center",
                    justifyContent: "center",

                    display: "flex",
                    // height: "10rem",
                    // flexDirection: "row",
                  }}
                ></Paper> */}
                <Dropzone setFile={setFile} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexFlow: "column",
                    p: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      fontSize: 20,
                      fontWeight: 600,
                      width: "40%",
                      height: "50px",
                    }}
                    size="large"
                    onClick={handleSubmit}
                    // fullWidth
                  >
                    Analyze
                  </Button>
                </Box>
                {/* <Chart /> */}
                {/* </Paper> */}
              </Grid>
              {/* Recent Deposits */}

              {/* <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                > */}
              {/* <Deposits /> */}
              {/* </Paper>
              </Grid> */}
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  {/* <Orders /> */}
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
