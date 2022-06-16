import { doc, getDoc } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import Dashboard from "../../components/admins/Dashboard";
import { auth, db } from "../api/firebase";
import HeadTag from "../../components/Head";
import { useRouter } from "next/router";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
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
        console.log(user);
        if (user) {
          router.push("/");
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
      <div className="d-flex justify-content-center align-items-center vh-100 bg-secondary">
        <form className="w-25 p-3 border bg-light" onSubmit={formHandler}>
          <h1 className="mb-3 fs-1">Welcome back!</h1>
          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          )}
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              required
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary btn-xl ${
              +loader && "opacity-50 pe-none"
            }`}
          >
            Submit
            {loader && (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
