import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { auth } from "../pages/api/firebase";

const Header = () => {
  const [userData, setuserData] = useState();

  // const signinwithgoogle = (e) => {
  //   e.preventDefault();
  //   const provider = new GoogleAuthProvider();
  //   try {
  //     signInWithPopup(auth, provider);
  //     // console.log("signed in");
  //     onAuthStateChanged(auth, (currentUser) => {
  //       // setuser(true);
  //       setuserData(currentUser);
  //     });
  //   } catch (err) {
  //     setuser(false);
  //     console.log(err.message);
  //   }
  // };

  const logout = async () => {
    await signOut(auth);
    // setuser(false);
    setuserData("");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      if (currentUser) {
        setuserData(currentUser);
      }
      // setuser(true)
    });

    return () => {};
  }, []);

  return (
    <header>
      <div className="container">
        <div className="header_inner_wrapper">
          <div className="brand_logo">
            <Link href="/">
              <a>
                <img src="/logo.png" alt="logo" />
              </a>
            </Link>
          </div>
          <nav>
            <ul className="main_navigation">
              <li>
                <Link href="/search?type=sale">Buy</Link>
              </li>
              <li>
                <Link href="/search?type=rent">Rent</Link>
              </li>
              <li>
                <Link href="/search?type=commercial-rent">Commercial</Link>
              </li>
              <li>
                <Link href="/agents">Find agent</Link>
              </li>
              <li>
                <h5>
                  Explore
                  <img src="/chevron-down.svg" alt="arrow down" />
                </h5>
                <ul className="sub_dropdown">
                  <li>
                    <Link href="/rentersguide">Renter's guide </Link>
                  </li>
                  <li>
                    <Link href="/buyersguide">Buyer's guide </Link>
                  </li>
                  {!userData && (
                    <li>
                      <Link href="/login">Admin </Link>
                    </li>
                  )}
                </ul>
              </li>
              {userData && (
                <li>
                  <h5>
                    Admin
                    <img src="/chevron-down.svg" alt="arrow down" />
                  </h5>
                  {/* </h5> */}
                  <ul className="sub_dropdown">
                    <>
                      <div className="user_console">
                        <div className="user_data">
                          <span>Signed in as</span>
                          <p>{userData?.email}</p>
                        </div>
                      </div>
                    </>

                    <li>
                      <Link href="/add-property">Add property </Link>
                    </li>
                    <li>
                      <Link href="/add-agent">Add agent </Link>
                    </li>

                    {userData ? (
                      <button
                        className="btn btn-danger w-100 btn-lg"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    ) : null}
                  </ul>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
