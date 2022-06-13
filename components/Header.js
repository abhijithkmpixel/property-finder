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
  const [user, setuser] = useState(false);
  const [userData, setuserData] = useState();

  const signinwithgoogle = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      signInWithPopup(auth, provider);
      // console.log("signed in");
      onAuthStateChanged(auth, (currentUser) => {
        // setuser(true);
        setuserData(currentUser);
      });
    } catch (err) {
      setuser(false);
      console.log(err.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    // setuser(false);
    setuserData("");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      setuserData(currentUser);
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
              {/* <li>
                <Link href="/">New projects</Link>
              </li> */}
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
                    {userData ? (
                     <>
                     <div className="user_console">
                        <img
                          src={userData?.photoURL}
                          alt={userData?.displayName}
                        />
                        <div className="user_data">
                          <span>{userData?.displayName}</span>
                          <p>{userData?.email}</p>
                        </div>
                      </div>
                          <button className="btn btn-danger w-100" onClick={logout}>
                            Logout
                          </button>
                          </> 
                    ) : (
                      <button
                        onClick={signinwithgoogle}
                        className="btn btn-danger"
                      >
                        Signin with google
                      </button>
                    )}
                  </li>
                  {/* <li>
                    <Link href="/">Building reviews</Link>
                  </li>
                  <li>
                    <Link href="/">Community Guides </Link>
                  </li>
                  <li>
                    <Link href="/">Property Blog </Link>
                  </li>
                  <li>
                    <Link href="/">Renter's guide </Link>
                  </li>
                  <li>
                    <Link href="/">Buyer's guide </Link>
                  </li>
                  <li>
                    <Link href="/">Mortgages </Link>
                  </li> */}
                  {/* additional links */}
                  {userData && (
                    <>
                      <li>
                        <Link href="/add-property">Add property </Link>
                      </li>
                      <li>
                        <Link href="/add-agent">Add agent </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </nav>
          {/* <div className="account_navigation">
            <div className="favourites">
              <Link href="/">
                <img src="/suit-heart.svg" alt="arrow down" />
              </Link>
            </div>
            <div className="account_avatar">
              <img src="https://lh3.googleusercontent.com/a-/AOh14GhPJ8CgYNK7mdX_4DntzSf3hI3XrcvUwUuGMhN3=s96-c" alt="" />
              <div className="account_lists">
                <div className="customer_data">
                  <div className="avatar">
                    <img src="https://lh3.googleusercontent.com/a-/AOh14GhPJ8CgYNK7mdX_4DntzSf3hI3XrcvUwUuGMhN3=s96-c" alt="avatar" />
                  </div>
                  <div className="bodycopy">
                    <h5>ancd@gmail.com</h5>
                    <button>Log out</button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
