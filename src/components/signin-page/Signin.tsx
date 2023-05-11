import React from "react";
import { auth } from "../../firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { selectUser, addUser } from "../../store/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Checkbox,
  Button,
  FormGroup,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
// import { Icon } from '@mdi/react';
// import { mdiFacebook, mdiGoogle } from '@mdi/js';
import { FacebookTwoTone, Google } from "@mui/icons-material";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Signin = () => {
  const dispatch = useAppDispatch();
  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // console.log("User signed in", getAuth().currentUser);
    const user = getAuth().currentUser;
    // console.log({ name: user?.displayName, email: user?.email });
    console.log("PhotoURL", user);
    dispatch(
      addUser({
        name: user?.displayName,
        email: user?.email,
        isLogin: true,
        photoURL: user?.photoURL,
      })
    );
  };
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // console.log("User signed in", getAuth().currentUser);
    const user = getAuth().currentUser;
    // console.log({ name: user?.displayName, email: user?.email });
    console.log("PhotoURL", user);
    dispatch(
      addUser({
        name: user?.displayName,
        email: user?.email,
        isLogin: true,
        photoURL: user?.photoURL,
      })
    );
  };
  const signInWithEmailPassword = async (email, password) => {
    // const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
      let createRes = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("create User", createRes);
    }
    console.log("User signed in", getAuth().currentUser);
    // const user = getAuth().currentUser;
    // console.log("PhotoURL", user);
    // dispatch(
    //   addUser({
    //     name: user?.displayName,
    //     email: user?.email,
    //     isLogin: true,
    //     photoURL: user?.photoURL,
    //   })
    // );
  };
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      const res = signInWithEmailPassword(
        formik.values.email,
        formik.values.password
      );
      // console.log(res);
    },
  });

  return (
    <>
      {/* <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p> */}

      <Container maxWidth="sm">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100vh" }}
        >
          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: "1rem",
                maxWidth: "350px",
                my: 1,
                mx: "auto",
              }}
            >
              <CardContent sx={{ p: 5, mb: 4 }}>
                <form onSubmit={formik.handleSubmit}>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    align="center"
                    gutterBottom
                    mb={5}
                  >
                    Sign in
                  </Typography>

                  <TextField
                    label="Email address"
                    id="email"
                    size="small"
                    name="email"
                    margin="dense"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    fullWidth
                    mb={4}
                  />
                  <TextField
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    size="small"
                    fullWidth
                    margin="normal"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    mb={4}
                  />
                  <FormGroup>
                    <FormControlLabel
                      sx={{ mb: 3, mt: 1 }}
                      control={
                        <Checkbox
                          name="rememberMe"
                          id="rememberMe"
                          checked={rememberMe}
                          onChange={handleRememberMeChange}
                          label="Remember password"
                        />
                      }
                      label="Remember password"
                    />
                  </FormGroup>

                  <Button
                    variant="contained"
                    sx={{ fontSize: 13, fontWeight: 600 }}
                    size="large"
                    fullWidth
                    type="submit"
                  >
                    Login
                  </Button>
                  {/* <hr style={{ margin: "1rem 0" }} /> */}
                  <Divider sx={{ my: 3 }} />
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Google sx={{ width: 0.8 }} />}
                    sx={{
                      fontFamily: "revert",
                      fontSize: 13,
                      fontWeight: 550,
                      mb: 1.5,
                      bgcolor: "#dd4b39",
                      "&:hover": { bgcolor: "#c74333" },
                    }}
                    fullWidth
                    onClick={signInWithGoogle}
                  >
                    Sign in with google
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<FacebookTwoTone sx={{ width: 0.8 }} />}
                    sx={{
                      fontFamily: "revert",
                      fontSize: 13,
                      fontWeight: 550,
                      bgcolor: "#3b5998",
                      "&:hover": { bgcolor: "#2d4373" },
                    }}
                    fullWidth
                    onClick={signInWithFacebook}
                  >
                    Sign in with facebook
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Signin;
