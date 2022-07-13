import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import CustonFieldEdito from "../../components/forms/CustonFieldEdito";
import HeadTag from "../../components/Head";
import Header from "../../components/Header";
import PageLoader from "../../components/PageLoader";
import ProfilePageDetails from "../../components/static page components/ProfilePageDetails";
import { api } from "../api/auth/api";
import { auth, db } from "../api/firebase";
import Countries from "../../components/forms/countries";
import { useRef } from "react";
import { doc, setDoc } from "firebase/firestore/lite";
import { Router } from "@mui/icons-material";
import { useRouter } from "next/router";
import AddProperty from "../../components/forms/AddMyProperty";

const index = ({ agent,props }) => {
  const [userData, setuserData] = useState(null);
  const [editor, seteditor] = useState(false);
  const [loader, setloader] = useState(false);
  const [loading, setloading] = useState(true);
  const [myprops, setmyprops] = useState(null);
  //referrences to inputs`
  const router = useRouter();
  useEffect(() => {
    console.log(agent);
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
          if (agent?.email == currentUser?.email) {
            setuserData(agent);
            setloading(false);
          }else{
            router.push("/404");

          }
      } else {
        // setloading(true);
        router.push("/auth/broker/login");
      }
    });

    // document.getElementById("agentID").value = userData?.id;
    document.getElementById("name").value = userData?.name;
    document.getElementById("position").value = userData?.position;
    document.getElementById("nationality").value = userData?.nationality;
    document.getElementById("image").value = userData?.image;
    // setimage(userData?.image);
    document.getElementById("company_image").value =
      userData?.company?.company_image;
    document.getElementById("company_name").value = userData?.company?.name;
    document.getElementById("language").value = userData?.languages;
    document.getElementById("mobile").value = userData?.mobile
      ? userData?.mobile
      : "";
    document.getElementById("email").value = userData?.email
      ? userData?.email
      : "";
    document.getElementById("since").value = userData?.since
      ? userData?.since
      : "";
    document.getElementById("about_me").value = userData?.about_me
      ? userData?.about_me
      : "";

    return () => {};
  }, []);



  const updateData = async (e) => {
    e.preventDefault();
    setloader(true);

    const docRef = doc(db, "agents", userData?.id);
    setloading(true);

    const sub = await setDoc(docRef, {
      ...userData,
      name: document.getElementById("name").value,
      image: document.getElementById("image").value,
      nationality: document.getElementById("nationality").value,
      position: document.getElementById("position").value,
      company: {
        company_image: document.getElementById("company_image").value,
        name: document.getElementById("company_name").value,
      },
      languages: document.getElementById("language").value,
      about_me: document.getElementById("about_me").value,
      // email: e.target.email.value,
      mobile: document.getElementById("mobile").value,
      since: document.getElementById("since").value,
    });

    seteditor(false);
    // setuserData(null);
    // router.push('/Profile')
    window.location.reload(true);
    setloader(false);
  };

  return (
    <>
      {loading && <PageLoader />}
      <HeadTag title={"Profile"} meta={"details page "} />
      <Header innerpage={true} />
      <ProfilePageDetails
        userData={userData}
        seteditor={seteditor}
        editor={editor}
      />
      <form className={`${!editor && "hidden"}`} onSubmit={updateData}>
        <div className="add_prop_form">
          <h3>Agent details</h3>

          <fieldset>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" required />
          </fieldset>
          <fieldset>
            <label htmlFor="position">Position</label>
            <input type="text" name="position" id="position" required />
          </fieldset>
          <fieldset>
            <label htmlFor="nationality">Nationality</label>
            <Countries name="nationality" />
          </fieldset>
          <fieldset>
            <label htmlFor="image">Image</label>
            <input
              type="text"
              name="image"
              id="image"
              required
              onChange={(e) => setimage(e.target.value)}
            />
            <img src={userData?.image} id="imageId" alt="" />
          </fieldset>

          <fieldset>
            <label htmlFor="company_image">company image</label>
            <input
              type="text"
              name="company_image"
              id="company_image"
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="company_name">Company name</label>
            <input type="text" name="company_name" id="company_name" required />
          </fieldset>
          <fieldset>
            <label htmlFor="language">language</label>
            <input type="text" name="language" id="language" required />
          </fieldset>
          <fieldset>
            <label htmlFor="mobile">Mobile</label>
            <input type="text" name="mobile" id="mobile" required />
          </fieldset>
          <fieldset>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
          </fieldset>
          <fieldset>
            <label htmlFor="since">Agent since</label>
            <input type="text" name="since" id="since" required />
          </fieldset>

          <fieldset className="w-100">
            <label htmlFor="about_me">About me</label>
            <CustonFieldEdito fieldName={"about_me"} />
          </fieldset>
          <div className="d-flex w-100 justify-content-between">
            <button
              type="submit"
              className={`btn btn-primary btn-xl ${
                +loader && "opacity-50 pe-none"
              }`}
              value="Add agent"
              onClick={updateData}
            >
              Save
              {loader && (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </button>
            {editor ? (
              <>
                <button
                  className={`btn btn-danger btn-xl ${
                    +loader && "opacity-50 pe-none"
                  }`}
                  type="button"
                  onClick={() => seteditor(false)}
                >
                  Close
                  {loader && (
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                </button>
              </>
            ) : null}
          </div>
        </div>
      </form>
      <AddProperty  props={props} />

      <Footer />
    </>
  );
};

export default index;

export async function getServerSideProps(context) {
  const { req, params, query } = context;
  var agents = "";
  await api.get(`/api/agents/${query.slug}`).then((response) => {
    agents = response.data;
  });
  // console.log(agents);
  var props = "";

  await api.get(`/api/myproperty/${query.slug}`).then((response) => {
    props = response.data;
  });
  console.log(props);

  return {
    props: {
      agent:( agents == []? null:agents[0]),
      props:props ==[]?null:props
    },
  };
}
