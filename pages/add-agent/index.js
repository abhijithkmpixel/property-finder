import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AddAgent from "../../components/forms/AddAgent";
import HeadTag from "../../components/Head";
import Header from "../../components/Header";
import PageLoader from "../../components/PageLoader";
import { auth } from "../api/firebase";

const index = () => {
  const router = useRouter()

  const [loggedIn, setloggedIn] = useState(false)

  onAuthStateChanged(auth, (currentUser) => {
    // console.log(currentUser);
    if (!currentUser) {
      router.push('/login')
      setloggedIn(true)
    }
    // setuser(true)
  });
  return (
    <>
       {
          // router.push('/')
          loggedIn &&
           <PageLoader />
        }
      <HeadTag title="Agents" meta="add a new agent to the db" />
      <Header />
      <AddAgent />
    </>
  );
};

export default index;
