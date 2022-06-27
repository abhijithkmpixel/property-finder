import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Dashboard from "../../../components/admins/Dashboard";
import Rentersguide from "../../../components/admins/Rentersguide";
import HeadTag from "../../../components/Head";
import Header from "../../../components/Header";
import PageLoader from "../../../components/PageLoader";
import { api } from "../../api/auth/api";
import { auth } from "../../api/firebase";

const Guides = ({ results }) => {
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
      {loggedIn && <PageLoader />}
      <HeadTag title="Edit buyers's guide" meta="" />

      {/* <Header innerpage={true}/> */}
      <div className="layout has-sidebar fixed-sidebar fixed-header">
        <Dashboard />
        <div id="overlay" className="overlay"></div>
        <div className="dash">
          <Rentersguide
            title="Buyer,s guide"
            docName="buyersguide"
            results={results}
          />
          <div className="overlay"></div>
        </div>
      </div>
    </>
  );
};

export default Guides;
export async function getServerSideProps(context) {
  var data = null;
  await api.get("/api/buyersguide").then((res) => {
    data = res.data;
  });
  // console.log(data);

  return {
    props: {
      results: data,
    },
  };
}
