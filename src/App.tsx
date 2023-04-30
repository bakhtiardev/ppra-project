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
  console.log(user);
  // const [logedinUser] = useAuthState(auth);
  // const user = getAuth().currentUser;
  // const [user, setUser] = React.useState(() => {
  //   const auth = getAuth();
  //   return auth.currentUser;
  // });
  // const [user, setUser] = React.useState(logedinUser);

  // React.useEffect(() => {
  //   // setUser(getAuth().currentUser);
  //   // console.log(getAuth().currentUser);

  //   setUser(user);
  //   // console.log("useEffect called");
  // }, [user]);

  // React.useEffect(() => {
  //   setUser(logedinUser);
  // }, []);

  // console.log(user);

  if (!user?.email) {
    return <Signin />;
  } else return <AllRoutes />;
}

export default App;
