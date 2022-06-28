import React, { useEffect, useState } from "react";
import { db } from "../../pages/api/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore/lite";

import AgentListingSticky from "../AgentListingSticky";
import CustonFieldEdito from "./CustonFieldEdito";
import Link from "next/link";
var slugify = require("slugify");

const AddAgent = ({ agents }) => {
  const [editor, seteditor] = useState(false);
  const [loader, setloader] = useState(false);
  const [slug, setslug] = useState(null);
  const [image, setimage] = useState("");

  const addProp = async (e) => {
    e.preventDefault();
    setloader(true);
    if (e.target.agentID.value) {
      const docRef = doc(
        db,
        "agents",
        document.getElementById("agentID").value
      );
      console.log(e.target.name.value);
      const sub = await setDoc(docRef, {
        name: e.target.name.value,
        image: e.target.image.value,
        nationality: e.target.nationality.value,
        position: e.target.position.value,
        company: {
          company_image: e.target.company_image.value,
          name: e.target.company_name.value,
        },
        languages: e.target.language.value,
        info_slug: slugify(e.target.name.value, {
          replacement: "-", // replace spaces with replacement character, defaults to `-`
          remove: undefined, // remove characters that match regex, defaults to `undefined`
          lower: true, // convert to lower case, defaults to `false`
          strict: false, // strip special characters except replacement, defaults to `false`
          locale: "vi", // language code of the locale to use
          trim: true, // trim leading and trailing replacement chars, defaults to `true`
        }),
        about_me: e.target.about_me.value,
        email: e.target.email.value,
        mobile: e.target.mobile.value,
        since: e.target.since.value,
      });
      alert(`Document  has been updated`);
    } else {
      const collectionRef = collection(db, "agents");
      const sub = await addDoc(collectionRef, {
        name: e.target.name.value,
        image: e.target.image.value,
        nationality: e.target.nationality.value,
        position: e.target.position.value,
        company: {
          company_image: e.target.company_image.value,
          name: e.target.company_name.value,
        },
        languages: e.target.language.value,
        info_slug: slugify(e.target.name.value, {
          replacement: "-", // replace spaces with replacement character, defaults to `-`
          remove: undefined, // remove characters that match regex, defaults to `undefined`
          lower: true, // convert to lower case, defaults to `false`
          strict: false, // strip special characters except replacement, defaults to `false`
          locale: "vi", // language code of the locale to use
          trim: true, // trim leading and trailing replacement chars, defaults to `true`
        }),
        about_me: e.target.about_me.value,
        email: e.target.email.value,
        mobile: e.target.mobile.value,
        since: e.target.since.value,
      });
      alert(`Document with id ${sub.id} has been added to Database`);
    }
    setloader(false);
    seteditor(false);
    e.target.reset();
  };
  function editProp(p) {
    // console.log(p);
    setslug(p.info_slug);
    seteditor(true);
    // document.getElementById("slug").value = slug? slug:    {info_slug: slugify(doument.getElementById("name").value, {
    //         replacement: "-", // replace spaces with replacement character, defaults to `-`
    //         remove: undefined, // remove characters that match regex, defaults to `undefined`
    //         lower: true, // convert to lower case, defaults to `false`
    //         strict: false, // strip special characters except replacement, defaults to `false`
    //         locale: "vi", // language code of the locale to use
    //         trim: true, // trim leading and trailing replacement chars, defaults to `true`
    //       })};
    if (window !== undefined) {
      // console.log(document.getElementById("agentID").getAttribute('value'));
      document.getElementById("agentID").value = p.id;
      document.getElementById("name").value = p.name;
      document.getElementById("position").value = p.position;
      document.getElementById("nationality").value = p.nationality;
      document.getElementById("image").value = p.image;
      setimage(p.image);
      document.getElementById("company_image").value = p.company?.company_image;
      document.getElementById("company_name").value = p.company?.name;
      document.getElementById("language").value = p.languages;
      document.getElementById("mobile").value = p.mobile ? p.mobile : "";
      document.getElementById("email").value = p.email ? p.email : "";
      document.getElementById("since").value = p.since ? p.since : "";
      document.getElementById("about_me").value = p.about_me ? p.about_me : "";
    }
  }
  // const updateProp = async (e) => {
  //   e.preventDefault();
  //   setloader(true);
  //   const docRef = doc(
  //     db,
  //     "agents",
  //     document.getElementById("agentID").value
  //   );
  //   console.log(e.target.name.value);
  //   const sub = await setDoc(docRef, {
  //     name: doument.getElementById("name").value,
  //     position: document.getElementById("position").value,
  //     nationality: document.getElementById("nationality").value,
  //     image: document.getElementById("image").value,
  //     company: {
  //       company_image: document.getElementById("company_image").value,
  //       company_name: document.getElementById("company_name").value,
  //     },
  //     language: document.getElementById("language").value,
  //     mobile: document.getElementById("mobile").value,
  //     email: document.getElementById("email").value,
  //     since: document.getElementById("since").value,
  //     about_me: document.getElementById("about_me").value,
  //     info_slug: slugify(doument.getElementById("name").value, {
  //       replacement: "-", // replace spaces with replacement character, defaults to `-`
  //       remove: undefined, // remove characters that match regex, defaults to `undefined`
  //       lower: true, // convert to lower case, defaults to `false`
  //       strict: false, // strip special characters except replacement, defaults to `false`
  //       locale: "vi", // language code of the locale to use
  //       trim: true, // trim leading and trailing replacement chars, defaults to `true`
  //     }),
  //   });
  //   alert(`Document has been updated`);
  //   resetform();
  //   setloader(false);
  //   // router.push("/add-property");
  // };

  function resetform() {
    seteditor(false);
    setslug(null);
    setimage("");
    document.getElementById("name").value = "";
    document.getElementById("slug").value = "";
    document.getElementById("agentID").value = "";

    document.getElementById("position").value = "";
    document.getElementById("nationality").value = "";
    document.getElementById("image").value = "";
    document.getElementById("company_image").value = "";
    document.getElementById("company_name").value = "";
    document.getElementById("language").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("email").value = "";
    document.getElementById("since").value = "";
    document.getElementById("about_me").value = "";
  }

  return (
    <>
      <div className="row m-0">
        <div className="col-12 col-lg-9">
          <div className={editor && `hidden`}>
            <AgentListingSticky agents={agents} editProp={editProp} />
          </div>

          <div className={!editor && `hidden`}>
            <form className="" onSubmit={(e) => addProp(e)}>
              <div className="add_prop_form">
              {
            editor && slug !==null?
          <Link href={`/agents/${slug}`}><a className="btn btn-success btn-lg" target={'_blank'}> View</a></Link>:null
          }
                <h3>Add an agent</h3>
                <fieldset className={"hidden"}>
                  <label htmlFor="agentID">id</label>
                  <input type="text" name="agentID" id="agentID" />
                </fieldset>
                <fieldset className={"hidden"}>
                  <label htmlFor="slug">id</label>
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    defaultValue={slug}
                  />
                </fieldset>
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
                  <select name="nationality" id="nationality" required>
                    <option value="india">India</option>
                    <option value="pakisthan">Pakisthan</option>
                    <option value="uzbekistan">Uzbekistan</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="united kingdom">united kingdom</option>
                  </select>
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
                  <img src={image} id="imageId" alt="" />
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
                  <input type="email" name="email" id="email" required />
                </fieldset>
                <fieldset>
                  <label htmlFor="since">Agent since</label>
                  <input type="text" name="since" id="since" required />
                </fieldset>

                <fieldset>
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
                        onClick={resetform}
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
          </div>
        </div>
        <div className="col-12 col-lg-3">
          <div className="p-5"></div>
          <div className="card mt-5">
            <img
              src="https://images.pexels.com/photos/8867472/pexels-photo-8867472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="card-img-top"
              alt="..."
            />

            <div className="card-body">
              <div className="card-title fs-2 text-black">
                Total agents ({agents.length})
              </div>
              {/* <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p> */}
              <button
                className="btn btn-primary btn-lg"
                onClick={() => seteditor(true)}
              >
                Add new agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAgent;
