import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Dashboard from "../../components/admins/Dashboard";
import HeadTag from "../../components/Head";
import PageLoader from "../../components/PageLoader";
import { auth } from "../api/firebase";

const index = () => {
  const [loggedIn, setloggedIn] = useState(false);
  const router = useRouter();

  onAuthStateChanged(auth, (currentUser) => {
    // console.log(currentUser);
    if (!currentUser) {
      setloggedIn(true);
      router.push("/login");
    }
    // setuser(true)
  });
  return (
    <>
      {
        // router.push('/')
        loggedIn && <PageLoader />
      }
      <HeadTag title={"Dashboard"} meta="dashboard" />
      <div className="layout has-sidebar fixed-sidebar fixed-header">
        <Dashboard />
        <div id="overlay" className="overlay"></div>
        <div className="dash">
          <div className="h-100">
            <div class="background w-100 h-100">
              <h1>
                We are so excited to have you back among us. Welcome back to
                work!
              </h1>
            </div>
          </div>
          <div className="overlay"></div>
        </div>
      </div>
    </>
  );
};

export default index;
