import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import HeadTag from "../../../components/Head";
import Header from "../../../components/Header";
import { api } from "../../api/auth/api";
import { useLogContaxt } from "../../api/auth/logContext";
import { auth } from "../../api/firebase";

const login = ({ agents }) => {
  const [errorMsg, seterrorMsg] = useState(null);
  const router = useRouter();
  const { loggedUser, updateLoggedUser } = useLogContaxt();
  const [loading, setloading] = useState(false);
  // console.log(loggedUser);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        agents?.map((agent) => {
          if (agent?.email == currentUser?.email) {
            updateLoggedUser(agent);
            router.push(`/Profile/${agent?.info_slug}`);
          }
        });
      }
    });
    return () => {};
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    setloading(true);
    signInWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);
        if (user) {
          agents?.map((agent) => {
            if (agent?.email == user?.email) {
              // updateLoggedUser(agent);
              localStorage.setItem("slug", agent?.info_slug);
              router.push(`/Profile/${agent?.info_slug}`);
            }
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterrorMsg(geterrCOde(errorCode));
       
        setloading(false);
        setTimeout(() => {
          seterrorMsg(null);
        }, 4000);
      });
  };

  function geterrCOde(errorCode) {
    switch (errorCode) {
      case "auth/wrong-password":
        return "Oops! wrong password";
        break;
      case "auth/invalid-email":
        return "Invalid mail id use";
        break;
        case "auth/user-not-found":
          return "Wrong email id";
          break;
      default:
        return errorCode;
        break;
    }
  }
  return (
    <>
      <HeadTag title="Login" meta={"Login page for broker"} />
      <Header innerpage={true} />
      <section
        className="register-form"
        style={{
          "--img":
            "url(https://images.pexels.com/photos/731082/pexels-photo-731082.jpeg?auto=compress&cs=tinysrgb&w=1600)",
        }}
      >
        <div className="wrapper">
          <div className="position-relative ">
              {errorMsg && (
                <div
                  className="alert alert-danger fs-4 position-absolute bottom-100 w-100"
                  role="alert"
                >
                  {errorMsg}
                </div>
              )}
            <div className="registration_form ">
              <div className="title">Login Form</div>
              <form onSubmit={submitHandler}>
                <div className="form_wrap">
                  <div className="input_wrap">
                    <label for="email">Email Address</label>
                    <input type="text" id="email" required />
                  </div>
                  <div className="input_wrap">
                    <label for="password">Password </label>
                    <input type="password" id="password" required />
                    <img
                      src="/eye-fill.svg"
                      alt="show password"
                      className="show_passwrd"
                      onClick={(e) => {
                        document
                          .getElementById("password")
                          .setAttribute("type", "text");
                        e.target.classList.add("hidden");
                        document
                          .querySelector(".hide_passwrd")
                          .classList.remove("hidden");
                      }}
                    />
                    <img
                      src="/eye-slash-fill.svg"
                      alt="show password"
                      className="hide_passwrd hidden"
                      onClick={(e) => {
                        document
                          .getElementById("password")
                          .setAttribute("type", "password");
                        e.target.classList.add("hidden");
                        document
                          .querySelector(".show_passwrd")
                          .classList.remove("hidden");
                      }}
                    />
                  </div>

                  <div className="input_wrap">
                    type="submit"
                    <button
                      className={`submit_btn mt-3 mb-5 ${
                        +loading && "opacity-50 pe-none"
                      }`}
                    >
                      Login
                      {loading && (
                        <div
                          className="spinner-border text-light"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
                <p className="already-in">
                  New user?{" "}
                  <Link href={"/auth/broker/register"}> Register</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default login;
export async function getServerSideProps(context) {
  const { req, params, query } = context;
  var agents = "";
  await api.get(`/api/agents`).then((response) => {
    agents = response.data;
  });

  return {
    props: {
      agents: agents,
    },
  };
}
