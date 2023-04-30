import React from "react";
import { auth } from "../../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { selectUser, addUser } from "../../store/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Signin = () => {
  const dispatch = useAppDispatch();
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // console.log("User signed in", getAuth().currentUser);
    const user = getAuth().currentUser;
    // console.log({ name: user?.displayName, email: user?.email });
    dispatch(addUser({ name: user?.displayName, email: user?.email }));
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
};

export default Signin;
