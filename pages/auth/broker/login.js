import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import Footer from "../../../components/Footer";
import HeadTag from "../../../components/Head";
import Header from "../../../components/Header";
import { api } from "../../api/auth/api";
import { useLogContaxt } from "../../api/auth/logContext";
import { auth } from "../../api/firebase";

const login = ({agents}) => {
  const [errorMsg, seterrorMsg] = useState(null);
  const router = useRouter();
const {loggedUser , updateLoggedUser} = useContext(useLogContaxt);
console.log(loggedUser);
  const submitHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        if (user) {
          agents?.map((agent) => {
            if (agent?.email == user?.email) {
              router.push(`/Profile/${agent?.info_slug}`);
  
            }
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterrorMsg(errorCode);
        setTimeout(() => {
          seterrorMsg(null);
        }, 4000);
      });
  };
  return (
    <>
      <HeadTag title="Register" meta={"register page for broker"} />
      <Header innerpage={true} />
      <section className="register-form">
        <div className="wrapper">
          <div className="registration_form position-relative">
            <div className="title">Login Form</div>
            {errorMsg && (
              <div
                className="alert alert-danger fs-4 position-absolute "
                role="alert"
              >
                {errorMsg}
              </div>
            )}
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
                  <input
                    type="submit"
                    value="Login"
                    className="submit_btn mt-5"
                  />
                </div>
              </div>
              <p className="already-in">
                New user? <Link href={"/auth/broker/register"}> Register</Link>
              </p>
            </form>
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
