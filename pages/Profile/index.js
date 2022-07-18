import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import CustonFieldEdito from "../../components/forms/CustonFieldEdito";
import HeadTag from "../../components/Head";
import Header from "../../components/Header";
import PageLoader from "../../components/PageLoader";
import ProfilePageDetails from "../../components/static page components/ProfilePageDetails";
import { api } from "../api/auth/api";
import { auth, db, storage } from "../api/firebase";

import { useRef } from "react";
import { doc, setDoc } from "firebase/firestore/lite";
import { Router } from "@mui/icons-material";
import { useRouter } from "next/router";
import AddProperty from "../../components/forms/AddMyProperty";
import AboutMeEditor from "../../components/forms/AboutMeEditor";
import {
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import States from "../../components/forms/States";
import Countries from "../../components/forms/Countries";
import AgentDetailsForm from "../../components/forms/AgentDetailsForm";

const index = ({}) => {
  const [userData, setuserData] = useState(null);
  const [editor, seteditor] = useState(false);

  const [loading, setloading] = useState(true);
  const router = useRouter();
  const [props, setprops] = useState([]);

  const myInterval = setInterval(checkData, 100);

  useEffect(() => {
    // console.log('useeffect');
    let slug = localStorage.getItem("slug");

    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // gatData();
        api.get(`/api/agents/${slug}`).then((response) => {
          setuserData(response.data[0]);
          // console.log(response.data[0]);
        });
        api.get(`/api/myproperty/${slug}`).then((response) => {
          setprops(response.data);
        });

        // if (agent?.email == currentUser?.email) {
        //   setuserData(agent);
        //   setloading(false);
        // } else if(agent?.email !== currentUser?.email) {
        //   router.push("/404");
        // }
      } else {
        router.push("/auth/broker/login");
      }
    });
    return () => {};
  }, []);
  function checkData() {
    if (userData !== null) {
      clearInterval(myInterval);
      setTimeout(() => {
        setloading(false);
      }, 500);
    }
  }

  return (
    <>
      {loading ? <PageLoader /> : null}
      {userData !== null ? (
        <>
          <Header innerpage={true} />
          <AgentDetailsForm
            userData={userData}
            seteditor={seteditor}
            editor={editor}
            setloading={setloading}
          />

          {userData?.verified && userData?.verified == true && !editor ? (
            <AddProperty props={props} slug={userData?.info_slug} />
          ) : null}
          <Footer />
        </>
      ) : null}
      <HeadTag title={"Profile"} meta={"details page "} />
    </>
  );
};

export default index;

// export async function getServerSideProps(context) {
//   const { req, params, query } = context;
//   var agents = "";
//   await api.get(`/api/agents/${query.slug}`).then((response) => {
//     agents = response.data;
//   });

//   var props = "";

//   await api.get(`/api/myproperty/${query.slug}`).then((response) => {
//     props = response.data;
//   });
//   // console.log(props);

//   return {
//     props: {
//       agent: agents == [] ? null : agents[0],
//       props: props == [] ? null : props,
//     },
//   };
// }
