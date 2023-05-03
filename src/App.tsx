import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";
import Appbar from "./components/app-bar/Appbar";
import Signin from "./components/signin-page/Signin";
import Todo from "./components/todo/Todo";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import AllRoutes from "./AllRoutes";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppSelector } from "./store/hooks";
import { selectUser } from "./store/user/userSlice";
function App() {
  const user = useAppSelector(selectUser);
  const [isLogged, setIsLogged] = React.useState(user?.isLogin);
  // console.log(user);
  // const [user] = useAuthState(auth);
  // const [user, setUser] = React.useState(() => {
  //   const auth = getAuth();
  //   return auth.currentUser;
  // });
  // const [userLoggedIn, setUserLoggedIn] = React.useState(false);

  // React.useEffect(() => {
  //   const user = getAuth().currentUser;
  //   // setUser(getAuth().currentUser);
  //   // console.log(getAuth().currentUser);
  //   console.log(user);
  //   if (user) {
  //     setUserLoggedIn(true);
  //   }

  //   // console.log("useEffect called");
  // }, []);

  // React.useEffect(() => {
  //   setUser(logedinUser);
  // }, []);

  // console.log(user);

  if (!user?.isLogin) {
    return <Signin />;
  } else return <AllRoutes />;
  // if (!userLoggedIn) {
  //   return <Signin />;
  // } else return <AllRoutes />;
}

export default App;
