import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
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
      <HeadTag title="Edit renter's guide" meta="" />
      <Header />
      <Rentersguide
        title="Renter's guide"
        docName="rentersguide"
        results={results}
      />
    </>
  );
};

export default Guides;
export async function getServerSideProps(context) {
  var data = null;
  await api.get("/api/renterguide").then((res) => {
    data = res.data;
  });
  console.log(data);

  return {
    props: {
      results: data,
    },
  };
}
