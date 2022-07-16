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

const index = ({  }) => {
  const [userData, setuserData] = useState(null);
  const [editor, seteditor] = useState(false);
  const [loader, setloader] = useState(false);
  const [loading, setloading] = useState(true);
  const [uploadingImage, setuploadingImage] = useState(false);
  const router = useRouter();
  const [props, setprops] = useState([])

const  myInterval = setInterval(checkData,100);

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
          setprops(response.data)
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
  function checkData(){
    if(userData !== null){
      clearInterval(myInterval);
      setTimeout(() => {
        setloading(false);
      }, 500);
    }
  }
  // const gatData = async () => {
  //   console.log('getdata');
  //   let slug = localStorage.getItem("slug");
  //   await api.get(`/api/agents/${slug}`).then((response) => {
  //     setuserData(response.data);
  //   });

  //   await api.get(`/api/myproperty/${slug}`).then((response) => {
  //     setprops(response.data)
  //   });
  // };
  const updateData = async (e) => {
    e.preventDefault();
    setloader(true);
    setloading(true);

    const docRef = doc(db, "agents", userData?.id);

    const sub = await setDoc(docRef, {
      ...userData,
      name: document.getElementById("name").value,
      image: document.getElementById("image").value,
      nationality: document.getElementById("nationality").value,
      state: document.getElementById("state").value,
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

  function loadEditorData() {
    document.getElementById("name").value = userData?.name;
    document.getElementById("position").value = userData?.position;
    document.getElementById("nationality").value = userData?.nationality;
    document.getElementById("state").value = userData?.state;

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
  }

  function getimage(e) {
    // setprofileImage(e.target.files[0]);
    uploadImage(e.target.files[0]);
  }
  function uploadImage(file) {
    if (file) {
      const proImgRef = ref(storage, `brokers/${agent?.info_slug}/${file.name}`);
      const uploadTask = uploadBytesResumable(proImgRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setuploadingImage(true);
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress + '% done');
          document.getElementById("profileImageProgress").style.width =
            progress + "%";
          if (progress == 100) {
            setuploadingImage(false);
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            document.getElementById("imageId").setAttribute("src", "");
            document.getElementById("imageId").setAttribute("src", downloadURL);
            document.getElementById("image").value = downloadURL;
          });
        }
      );
    }
  }

  return (
    <>
      {loading  ? <PageLoader />:null}
      { userData !== null ? (
        <>
          <Header innerpage={true} />
          <ProfilePageDetails
            userData={userData}
            seteditor={seteditor}
            editor={editor}
            loadEditorData={loadEditorData}
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
                <label htmlFor="state">State</label>
                <States  />
              </fieldset>
              <fieldset>
                <label htmlFor="image">Profile Image</label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  required
                  className="hidden"
                />
                <input type="file" className="mb-2" id="image_uploader" onChange={getimage} />

                <div className={`progress ${+!uploadingImage && "hidden"}`}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    id="profileImageProgress"
                    // style={{ width: "25%" }}
                    ariaValueNow="25"
                    ariaValueMin="0"
                    ariaValueMax="100"
                  ></div>
                </div>

                <img src={userData?.image} id="imageId" alt={userData?.name} />
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
                <input
                  type="text"
                  name="company_name"
                  id="company_name"
                  required
                />
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
                <input type="email" name="email" id="email" required readOnly />
              </fieldset>
              <fieldset>
                <label htmlFor="since">Agent since</label>
                <input type="text" name="since" id="since" required />
              </fieldset>

              <fieldset className="w-100">
                <label htmlFor="about_me">About me</label>
                {/* <CustonFieldEdito fieldName={"about_me"} /> */}
                {/* <AboutMeEditor fieldName={"about_me"}/> */}
                <textarea
                  name={"about_me"}
                  id={"about_me"}
                  rows={30}
                ></textarea>
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
                        <div
                          className="spinner-border text-light"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </form>
          
          {userData?.verified && userData?.verified == true  && !editor ? (
            <AddProperty props={props} slug={userData?.info_slug}/>
          ) : null}
          <Footer />
        </>
      ):null}
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
