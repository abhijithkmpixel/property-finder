import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AddAgent from "../../components/forms/AddAgent";
import HeadTag from "../../components/Head";
import Header from "../../components/Header";
import PageLoader from "../../components/PageLoader";
import { auth } from "../api/firebase";
import { api } from "../api/auth/api";
import Dashboard from "../../components/admins/Dashboard";

const index = ({ agents }) => {
  const router = useRouter();

  const [loggedIn, setloggedIn] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    // console.log(currentUser);
    if (!currentUser) {
      router.push("/login");
      setloggedIn(true);
    }
    // setuser(true)
  });
  return (
    <>
      {
        // router.push('/')
        loggedIn && <PageLoader />
      }
      <HeadTag title="Dashboard" meta="add a new agent to the db" />
      {/* <Header innerpage={true}/>
       */}
      <div className="layout has-sidebar fixed-sidebar fixed-header">
        <Dashboard />
        {/* <div id="overlay" className="overlay"></div> */}
        <div className="dash">
          <div className="">
              <AddAgent agents={agents} />
          
          </div>
          <div className="overlay"></div>
        </div>
      </div>
    </>
  );
};

export default index;
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
