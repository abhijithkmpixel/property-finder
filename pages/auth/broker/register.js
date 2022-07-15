import Link from "next/link";
import React, { useEffect, useState } from "react";
import Countries from "../../../components/forms/countries";
import HeadTag from "../../../components/Head";
import Header from "../../../components/Header";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../api/firebase";
import { doc, setDoc } from "firebase/firestore/lite";
import Footer from "../../../components/Footer";
import { useRouter } from "next/router";
var slugify = require("slugify");

const BrokerRegister = () => {
  const router = useRouter();
  const [errorMsg, seterrorMsg] = useState(null);
  const [loading, setloading] = useState(false);
  const [agreed, setagreed] = useState(false);
  const addUser = async (email, e) => {
    const userslug = slugify(e.target.fname.value, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: "vi", // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    })
    const docRef = doc(db, "agents", email);
    const sub = await setDoc(docRef, {
      name: e.target.fname.value,
      // image: e.target.image.value,
      nationality: e.target.country.value,
      verified: false,
      email: email,
      info_slug: userslug
    });
    alert(`User registered`);
    localStorage.setItem("slug",userslug);
    router.push(`/Profile/${userslug}`);
  };

  useEffect(() => {
    return () => {};
  }, [agreed]);

  const submitHandler = async (e) => {
    // const auth = getAuth();
    e.preventDefault();
    seterrorMsg(null);
    setloading(true);
    await signOut(auth);
    localStorage.removeItem("slug");

    createUserWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        addUser(user?.email, e);
        e.target.reset;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        setloading(false);
        seterrorMsg(() => geterrCOde(errorCode));
        setTimeout(() => {
          seterrorMsg(null);
        }, 4000);
      });
  };

  function geterrCOde(errorCode) {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "Email already in use";
        break;
      case "auth/invalid-email":
        return "Invalid mail id use";
        break;
      default:
        return errorCode;
        break;
    }
  }

  return (
    <>
      <HeadTag title="Register" meta={"register page for broker"} />
      <Header innerpage={true} />
      <section className="register-form"  style={{'--img':'url(https://images.pexels.com/photos/463996/pexels-photo-463996.jpeg?auto=compress&cs=tinysrgb&w=1600)'}}>
        <div className="wrapper">
          <div className="registration_form position-relative">
            <div className="title">Register Form</div>
            {errorMsg && (
              // <div className="alert alert-danger fs-4 position-absolute " role="alert">
              //   {errorMsg}
              // </div>
              <div
                className="position-fixed bottom-0 end-0 p-3 "
                style={{ zIndex: 11 }}
              >
                <div
                  id="liveToast"
                  className="toast show "
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                >
                  <div className="toast-header">
                    {/* <img src="..." className="rounded me-2" alt="..."/> */}
                    <strong className="me-auto fs-4 text-danger">Alert</strong>
                    {/* <small>11 mins ago</small> */}
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="toast"
                      aria-label="Close"
                      onClick={() => seterrorMsg(null)}
                    ></button>
                  </div>
                  <div className="toast-body fs-4 ">{errorMsg}</div>
                </div>
              </div>
            )}
            <form onSubmit={(e)=>submitHandler(e)}>
              <div className="form_wrap">
                <div className="input_wrap">
                  <label for="fname">Full Name</label>
                  <input type="text" id="fname" required />
                </div>
                {/* <div className="input_wrap">
                    <label for="lname">Last Name</label>
                    <input type="text" id="lname" required />
                  </div> */}
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
                {/* <div className="input_wrap">
                  <label>Gender</label>
                  <ul>
                    <li>
                      <label className="radio_wrap">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          className="input_radio"
                          checked
                        />
                        <span>Male</span>
                      </label>
                    </li>
                    <li>
                      <label className="radio_wrap">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          className="input_radio"
                        />
                        <span>Female</span>
                      </label>
                    </li>
                  </ul>
                </div> */}
                <div className="input_wrap">
                  <label for="city">City</label>
                  <input type="text" id="city" required />
                </div>
                <div className="input_wrap">
                  <label for="country">Country</label>
                  {/* <input type="text" id="country" required/> */}
                  <Countries name={"country"} />
                </div>
                <div className="input_wrap d-flex">
                  <input
                    type="checkbox"
                    id="termsconditions"
                    className="mr-3"
                    required
                    onClick={() => {if(document.getElementById('termsconditions').checked == true){setagreed(true)}else{
                      setagreed(false)
                    } }}
                  />
                  <label
                   onClick={() => {if(document.getElementById('termsconditions').checked == true){setagreed(true)}else{
                    setagreed(false)
                   } }}
                    for="termsconditions"
                    className="mx-2"
                  >
                    I agree to the {''}
                    <Link href={"/terms-and-conditions"}>
                       terms & conditions 
                    </Link>{' '}
                    and <Link href={"privacy-policy"}>privacy policy </Link>of
                    Find Homes
                  </label>
                </div>
                <div className="input_wrap">
                  <button
                    className={`submit_btn mt-3 mb-5 ${
                      +loading && "opacity-50 pe-none"
                    }   ${+!agreed && "opacity-25 pe-none"}`}
                  >
                    Register now
                    {loading && (
                      <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
              <p className="already-in">
                Already registered?{" "}
                <Link href={"/auth/broker/login"}> Login</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BrokerRegister;
