import { doc, getDoc } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import Dashboard from "../../components/admins/Dashboard";
import { auth, db } from "../api/firebase";
import HeadTag from "../../components/Head";
import { useRouter } from "next/router";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Header from "../../components/Header";
const LoginForm = () => {
  const [loggedIn, setloggedIn] = useState(false);
  const router = useRouter();
  const [errorMsg, seterrorMsg] = useState(null);
  const [loader, setloader] = useState(false);
  useEffect(() => {

    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // seterrorMsg(true);
        router.push("/");
      }
    });
    return () => {};
  }, [loggedIn]);

  function formHandler(e) {
    seterrorMsg(null)
    setloader(true)
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      e.target.exampleInputEmail1.value,
      e.target.exampleInputPassword1.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);
        if (user) {
          // router.push("/");
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        seterrorMsg(errorCode);
        setloader(false)
        setTimeout(() => {
          seterrorMsg(null);
        }, 3000);
      });
  }

  return (
    <>
      <HeadTag title={"Admin"} />
      <Header innerpage={true}/>
      <div id="login-page">
        <div className="login">
          <h2 className="login-title">Login</h2>
          <p className="notice">Please login to access the system</p>
          {errorMsg && (
            <div className="alert alert-danger fs-4" role="alert">
              {errorMsg}
            </div>
          )}
          <form className="form-login" onSubmit={formHandler}>
            <label for="email">E-mail</label>
            <div className="input-email d-flex align-items-center">
              <i className="fas fa-envelope icon_login"></i>
              <input
                type="email"
                // className="form-control "
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
                placeholder="Enter your e-mail"
              />
            </div>
            <label for="password">Password</label>
            <div className="input-password d-flex align-items-center">
              <i className="fas fa-lock icon_login"></i>
              <input
                required
                type="password"
                className="form-control "
                id="exampleInputPassword1"
                placeholder="Enter your password"
              />
            </div>
            <div className="checkbox">
              <label for="remember">
                <input type="checkbox" name="remember" />
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className={`btn btn-lg btn-primary btn-block text-sm-center w-100 login_btn ${
                +loader && "opacity-50 pe-none"
              }`}
            >
              <i className="fas fa-door-open"></i> Sign in
              {loader && (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </button>
          </form>
          {/* <a href="#">Forgot your password?</a> */}
          <div className="created">
            <p>
              Created by <a >aj km</a>
            </p>
          </div>
        </div>
        <div className="background">
          <h1>
            We are so excited to have you back among us. Welcome back to work!
          </h1>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
