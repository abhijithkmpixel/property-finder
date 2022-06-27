import React, { useEffect, useState } from "react";
import { db } from "../../pages/api/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore/lite";

import AgentListingSticky from "../AgentListingSticky";
import CustonFieldEdito from "./CustonFieldEdito";
var slugify = require("slugify");

const AddAgent = ({ agents }) => {
  const [editor, seteditor] = useState(false);
  const [loader, setloader] = useState(false);
  const [slug, setslug] = useState(null)
  
  const addProp = async (e) => {
    e.preventDefault();
    setloader(true)
    if(e.target.agentID.value){
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

    }else{
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
    setloader(false)

    e.target.reset();
  };
  function editProp(p) {
    // console.log(p);
    setslug(p.info_slug)
    seteditor(true);
    document.getElementById("slug").value = slug;

    document.getElementById("name").value = p.name;
    document.getElementById("position").value = p.position;
    document.getElementById("nationality").value = p.nationality;
    document.getElementById("image").value = p.image;
    document.getElementById("company_image").value = p.company?.company_image;
    document.getElementById("company_name").value = p.company?.name;
    document.getElementById("language").value = p.languages;
    document.getElementById("mobile").value = p.mobile ? p.mobile:'';
    document.getElementById("email").value = p.email;
    document.getElementById("since").value = p.since ? p.since : '';
    document.getElementById("about_me").value = p.about_me ?p.about_me:'';
    document.getElementById("agentID").value = p.id;

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
    setslug(null)
    document.getElementById("name").value = "";
    document.getElementById("slug").value = "";
    document.getElementById("agentID").value = "";


    document.getElementById("position").value = "";
    document.getElementById("nationality").value = "";
    document.getElementById("image").value ='';
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
      <AgentListingSticky agents={agents} editProp={editProp} />
      <form className="" onSubmit={(e) => addProp(e)}>
        <div className="add_prop_form">
        <h3>Add an agent</h3>
        <fieldset className={'hidden'}>
            <label htmlFor="agentID">id</label>
            <input type="text" name="agentID" id="agentID"  />
          </fieldset>
          <fieldset className={'hidden'}>
            <label htmlFor="slug">id</label>
            <input type="text" name="slug" id="slug" value={slug}  />
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
            <input type="text" name="image" id="image" required />
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
              {" "}
              Add agent{" "}
              {loader && (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </button>
          {editor ? (
            <>
              {/* <button
                className={`btn btn-primary btn-xl ${
                  +loader && "opacity-50 pe-none"
                }`}
                
                onClick={updateProp}
              >
                updateProp
                {loader && (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button> */}
              <button
                className={`btn btn-primary btn-xl ${
                  +loader && "opacity-50 pe-none"
                }`}
                type="button"
                onClick={resetform}
              >
                Reset
                {loader && (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>
            </>
          ) : (
            null
          )}
        
        </div>
        </div>
      </form>
    </>
  );
};

export default AddAgent;
