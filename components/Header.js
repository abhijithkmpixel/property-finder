import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { api } from "../pages/api/auth/api";
import { useLogContaxt } from "../pages/api/auth/logContext";
import { auth } from "../pages/api/firebase";

const Header = ({ innerpage }) => {
  const { loggedUser, updateLoggedUser } = useLogContaxt();
  const [userData, setuserData] = useState();
const [profileSlug, setprofileSlug] = useState()
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
    localStorage.removeItem("slug");

  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      if (currentUser) {
        setuserData(currentUser);
        let slug = localStorage.getItem("slug");
        // console.log(slug);
        setprofileSlug(slug)
      }
      // setuser(true)
    });

    return () => {};
  }, []);

  return (
    <header className={`${innerpage == true ? "innerpages" : ""}`}>
      <div className="container p-0">
        <div className="header_inner_wrapper">
          <div className="brand_logo">
            <Link href="/">
              <a>
                <img src="/mainlogo1.png" alt="logo" />
              </a>
            </Link>
          </div>
          <nav>
            <ul className="main_navigation">
              <li>
                <a href="/search?type=sale&st=all&">Buy</a>
              </li>
              <li>
                <a href="/search?type=rent&st=all&">Rent</a>
              </li>
              <li>
                {/* <Link href="/search?type=commercial-rent">Commercial</Link> */}
                <h5>
                  Commercial
                  <img src="/chevron-down.svg" alt="arrow down" />
                </h5>
                <ul className="sub_dropdown">
                  <li>
                    <a href="/search?type=commercial-rent">
                      Commercial Rent
                    </a>
                  </li>
                  <li>
                    <a href="/search?type=commercial-sale">
                      Commercial Sale
                    </a>
                  </li>
                </ul>
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
                  <li>
                    <Link href="/auth/broker/register">Sell with us</Link>
                  </li>
                  {userData && (
                    <>
                      <li>
                        {/* <Link href={`/Profile/${profileSlug}`}>My Profile</Link> */}
                        <Link href={`/Profile`}>My Profile</Link>

                      </li>
                      <li onClick={logout}>
                        <button className="btn btn-danger w-100 mb-4"> logout</button>
                      </li>
                    </>
                  )}
                  {/* <li>
                    <h5>
                      Register
                      <img src="/chevron-down.svg" alt="arrow down" />
                    </h5>
                    <ul className="inner_dropdown">
                      <li>
                        <Link href="/">
                          Register as buyer
                        </Link>
                      </li>
                      <li>
                        <Link href="/auth/broker/register">
                          Register as broker
                        </Link>
                      </li>
                   
                    </ul>
                  </li> */}
                  {/* // )} */}
                </ul>
              </li>
       
              <li className="contact_icon">
                <Link href="/contact">
                  <a>
                    <img src="/call.png" alt="call icon" />
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
// export async function getServerSideProps(context) {
//   const { req, params, query } = context;
//   var agents = "";
//   await api.get(`/api/agents`).then((response) => {
//     agents = response.data;
//   });

//   return {
//     props: {
//       agents: agents,
//     },
//   };
// }
