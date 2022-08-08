import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import { auth, db, storage } from "../../pages/api/firebase";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CustonFieldEdito from "./CustonFieldEdito";
import { useRouter } from "next/router";
import PropsListingSticky from "../PropsListingSticky";
import EditorDiv from "./Editor";
import CKEditor from "react-ckeditor-component";
import Link from "next/link";
import States from "./States";
import {
  Punjab,
  AndraPradesh,
  ArunachalPradesh,
  Assam,
  Bihar,
  Chhattisgarh,
  Goa,
  Gujarat,
  Haryana,
  HimachalPradesh,
  JammuKashmir,
  Jharkhand,
  Karnataka,
  Kerala,
  MadhyaPradesh,
  Maharashtra,
  Manipur,
  Meghalaya,
  Mizoram,
  Nagaland,
  Odisha,
  Sikkim,
  Rajasthan,
  TamilNadu,
  Telangana,
  Tripura,
  UttarPradesh,
  Uttarakhand,
  WestBengal,
  AndamanNicobar,
  Chandigarh,
  DadraHaveli,
  DamanDiu,
  Delhi,
  Lakshadweep,
  Puducherry,
} from "./Districts";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
var slugify = require("slugify");
import { v4 as uuidv4 } from "uuid";
import { Alert } from "antd";

const AddProperty = ({ props, info_slug }) => {
  const [editor, seteditor] = useState(false);
  const [loader, setloader] = useState(false);
  const [facilities, setfacilities] = useState([""]);
  const [newProp, setnewProp] = useState(true);
  const [slug, setslug] = useState("");
  const router = useRouter();
  const [pimages, setpimages] = useState([]);
  const [propImagesProgress, setpropImagesProgress] = useState(false);
  const [currentProp, setcurrentProp] = useState(null);
  const [propVideo, setpropVideo] = useState(null)
  // const [editorState, setEditorState] = useState(
  //   "<p>lorem</p>  <p>&nbsp;</p><p>capsicum</p>"
  // );
  let foldername = localStorage.getItem("slug");

  useEffect(() => {
    return () => {};
  }, [facilities]);

  const addProp = async (e) => {
    e.preventDefault();
    setloader(true);
    const collectionRef = collection(db, "properties");
    const sub = await addDoc(collectionRef, {
      title: e.target.title.value,
      images: pimages,
      serviceType: e.target.serviceType.value,
      tags: e.target.tags.value,
      slug:
        slugify(e.target.title.value, {
          replacement: "-", // replace spaces with replacement character, defaults to `-`
          remove: undefined, // remove characters that match regex, defaults to `undefined`
          lower: true, // convert to lower case, defaults to `false`
          strict: false, // strip special characters except replacement, defaults to `false`
          locale: "vi", // language code of the locale to use
          trim: true, // trim leading and trailing replacement chars, defaults to `true`
        }) + uuidv4(),
      propertySize: e.target.propertySize.value,
      price: e.target.price.value,
      location: e.target.location.value,
      description: e.target.description.value,
      period: e.target.servicePeriod.value,
      bedroom: e.target.bedroom.value,
      bathroom: e.target.bathroom.value,
      propertyType: e.target.propertyType.value,
      agent: e.target.agent.value,
      recommend: false,
      verified: false,
      facilities: facilities,
      address: e.target.address.value,
      pincode: e.target.pincode.value,
      state: e.target.state.value,
      status: e.target.status.value,
      uploadDate:
        (new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        video:propVideo
    });
    e.target.reset();
    alert(`Document with id ${sub.id} has been added to Database`);
    setnewProp(false);
    setloader(false);
    setcurrentProp(null);
    // router.push(`/Profile/${foldername}`);
    // router.push(`/Profile`);
    window.location.reload(true);
  };
  function editProp(p) {
    seteditor(true);
    setslug(p.slug);
    setnewProp(false);
    setcurrentProp(p);
    document.getElementById("state").value = p?.state;
    // document.getElementById("district").value = p?.district;
    document.getElementById("pincode").value = p?.pincode;
    document.getElementById("address").value = p?.address;

    document.getElementById("title").value = p.title;
    document.getElementById("propertyType").value = p.propertyType;
    document.getElementById("agent").value = p.agent;
    document.getElementById("propId").value = p.id;
    document.getElementById("serviceType").value = p.serviceType;
    document.getElementById("tags").value = p.tags;
    document.getElementById("servicePeriod").value = p.period;
    // document.getElementById("slug").value = p.slug;
    document.getElementById("propertySize").value = p.propertySize;
    document.getElementById("price").value = p.price;
    // document.getElementById("location").value = p.location;
    document.getElementById(
      "location"
    ).innerHTML = `<option  selected value='${p?.location}'>${p.location}</option>`;
    // document.getElementById("images").value = p.images;
    document.getElementById("description").value = p.description;
    document.getElementById("bedroom").value = p.bedroom;
    document.getElementById("bathroom").value = p.bathroom;
    setpropVideo(p?.video ? p.video : null)
    document.getElementById("status").value =
      p?.status && p?.status !== "" ? p?.status : "avail";

    setpimages(p.images);

    setfacilities(p?.facilities ? p?.facilities : []);
  }
  const updateProp = async (e) => {
    e.preventDefault();
    setloader(true);
    const docRef = doc(
      db,
      "properties",
      document.getElementById("propId").value
    );
    const sub = await setDoc(docRef, {
      ...currentProp,
      address: document.getElementById("address").value,
      pincode: document.getElementById("pincode").value,
      state: document.getElementById("state").value,
      title: document.getElementById("title").value,
      images: pimages,
      serviceType: document.getElementById("serviceType").value,
      tags: document.getElementById("tags").value,
      // slug: document.getElementById("slug").value,
      propertySize: document.getElementById("propertySize").value,
      price: document.getElementById("price").value,
      location: document.getElementById("location").value,
      description: document.getElementById("description").value,
      period: document.getElementById("servicePeriod").value,
      bedroom: document.getElementById("bedroom").value,
      bathroom: document.getElementById("bathroom").value,
      propertyType: document.getElementById("propertyType").value,
      agent: document.getElementById("agent").value,
      // recommend: document.getElementById("recommended").value,
      status: document.getElementById("status").value,
      facilities: facilities,
      video: propVideo
    });
    setcurrentProp(null);
    alert(
      `Document with id ${
        document.getElementById("propId").value
      } has been updated`
    );
    resetform();
    setloader(false);
    setslug("");

    // router.push(`/Profile/${foldername}`);
    // router.push(`/Profile`);
    window.location.reload(true);

    // router.push("/add-property");
  };
  function resetform() {
    seteditor(false);
    setnewProp(true);
    setslug("");
    setpimages([]);
    setcurrentProp(null);
    document.getElementById("htmlviewdiv").innerHTML = "";
    document.getElementById("state").value = "";
    // document.getElementById("district").value = '';
    document.getElementById("pincode").value = "";
    document.getElementById("address").value = "";
    document.getElementById("propId").value = "";
    document.getElementById("title").value = "";
    // document.getElementById("images").value = "";
    document.getElementById("serviceType").value = "";
    document.getElementById("tags").value = "";
    // document.getElementById("slug").value = "";
    document.getElementById("propertySize").value = "";
    document.getElementById("price").value = "";
    document.getElementById("location").value = "";
    document.getElementById("description").value = "";
    document.getElementById("servicePeriod").value = "";
    document.getElementById("bedroom").value = "";
    document.getElementById("bathroom").value = "";
    document.getElementById("propertyType").value = "";
    document.getElementById("agent").checked = false;

    setfacilities([]);
  }
  function updatefacility(e, index) {
    const prev = [...facilities];
    prev[index] = e.target.value;
    setfacilities(prev);
  }

  function addFacilityRow() {
    const prev = [...facilities];
    prev[facilities.length] = "";
    setfacilities(prev);
  }
  function removeFacility(index) {
    const prev = [...facilities];
    prev.splice(index, 1);
    setfacilities(prev);
  }

  function addImageRow(e) {
    const file = e.target.files[0];
    if (file) {
      const proImgRef = ref(storage, `brokers/${foldername}/${file.name}`);
      const uploadTask = uploadBytesResumable(proImgRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setpropImagesProgress(true);
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          document.getElementById("propertyImageProgress").style.width =
            progress + "%";
          if (progress == 100) {
            setpropImagesProgress(false);
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // document.getElementById("imageId").setAttribute("src", downloadURL);
            // document.getElementById("image").value = downloadURL;
            var imgs = [...pimages];
            imgs = [...imgs, downloadURL];
            setpimages(imgs);
          });
        }
      );
    }
  }
  function uploadVideo(e) {
    const file = e.target.files[0];
    if (file) {
      const proImgRef = ref(storage, `brokers/${foldername}/${file.name}`);
      const uploadTask = uploadBytesResumable(proImgRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setpropImagesProgress(true);
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          document.getElementById("propertyImageProgress").style.width =
            progress + "%";
          if (progress == 100) {
            setpropImagesProgress(false);
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // document.getElementById("imageId").setAttribute("src", downloadURL);
            // document.getElementById("image").value = downloadURL;
            setpropVideo(downloadURL);
          });
        }
      );
    }
  }
  // function addImageRow(e) {
  //   // var imgs = [...pimages];
  //   // imgs = [...imgs, ""];
  //   // setpimages(imgs);
  //   uploadImage(e.target.files[0]);
  // }

  function removeImage(index) {
    const prev = [...pimages];
    prev.splice(index, 1);
    setpimages(prev);
  }

  function updateDistrict(e) {
    var StateSelected = e.target.value;
    var optionsList;
    var htmlString = "";

    switch (StateSelected) {
      case "Andra Pradesh":
        optionsList = AndraPradesh;
        break;
      case "Arunachal Pradesh":
        optionsList = ArunachalPradesh;
        break;
      case "Assam":
        optionsList = Assam;
        break;
      case "Bihar":
        optionsList = Bihar;
        break;
      case "Chhattisgarh":
        optionsList = Chhattisgarh;
        break;
      case "Goa":
        optionsList = Goa;
        break;
      case "Gujarat":
        optionsList = Gujarat;
        break;
      case "Haryana":
        optionsList = Haryana;
        break;
      case "Himachal Pradesh":
        optionsList = HimachalPradesh;
        break;
      case "Jammu and Kashmir":
        optionsList = JammuKashmir;
        break;
      case "Jharkhand":
        optionsList = Jharkhand;
        break;
      case "Karnataka":
        optionsList = Karnataka;
        break;
      case "Kerala":
        optionsList = Kerala;
        break;
      case "Madya Pradesh":
        optionsList = MadhyaPradesh;
        break;
      case "Maharashtra":
        optionsList = Maharashtra;
        break;
      case "Manipur":
        optionsList = Manipur;
        break;
      case "Meghalaya":
        optionsList = Meghalaya;
        break;
      case "Mizoram":
        optionsList = Mizoram;
        break;
      case "Nagaland":
        optionsList = Nagaland;
        break;
      case "Orissa":
        optionsList = Orissa;
        break;
      case "Punjab":
        optionsList = Punjab;
        break;
      case "Rajasthan":
        optionsList = Rajasthan;
        break;
      case "Sikkim":
        optionsList = Sikkim;
        break;
      case "Tamil Nadu":
        optionsList = TamilNadu;
        break;
      case "Telangana":
        optionsList = Telangana;
        break;
      case "Tripura":
        optionsList = Tripura;
        break;
      case "Uttaranchal":
        optionsList = Uttaranchal;
        break;
      case "Uttar Pradesh":
        optionsList = UttarPradesh;
        break;
      case "West Bengal":
        optionsList = WestBengal;
        break;
      case "Andaman and Nicobar Islands":
        optionsList = AndamanNicobar;
        break;
      case "Chandigarh":
        optionsList = Chandigarh;
        break;
      case "Dadar and Nagar Haveli":
        optionsList = DadraHaveli;
        break;
      case "Daman and Diu":
        optionsList = DamanDiu;
        break;
      case "Delhi":
        optionsList = Delhi;
        break;
      case "Lakshadeep":
        optionsList = Lakshadeep;
        break;
      case "Pondicherry":
        optionsList = Pondicherry;
        break;
      case "Uttarakhand":
        optionsList = Uttarakhand;
        break;
      case "Lakshadweep":
        optionsList = Lakshadweep;
        break;
      case "Puducherry":
        optionsList = Puducherry;
        break;
      case "all":
        optionsList = "";
        break;
    }

    for (var i = 0; i < optionsList.length; i++) {
      htmlString =
        htmlString +
        "<option value='" +
        optionsList[i] +
        "'>" +
        optionsList[i] +
        "</option>";
    }
    // $("#inputDistrict").html(htmlString);
    document.getElementById("location").innerHTML = htmlString;
  }

  const deleteProp = async (id) => {
    await deleteDoc(doc(db, "properties", id));
  };
  return (
    <>
      {
        // <Alert message="Success Tips" type="success" showIcon />
      }
      <section className="profile_page my-5 pt-5">
        <div className="row  container main">
          <div className="col-12 col-lg-9">
            <div className={editor && "hidden"}>
              <PropsListingSticky
                props={props}
                editProp={editProp}
                deleteProp={deleteProp}
              />
            </div>
            <div className={!editor && "hidden"}>
              <form className="add_prop_form mb-5" onSubmit={(e) => addProp(e)}>
                <h3>Property details</h3>
                <fieldset className="hidden">
                  <label htmlFor="title">id</label>
                  <input type="text" name="propId" id="propId" readOnly />
                </fieldset>
                <fieldset>
                  <label htmlFor="title">Title</label>
                  <input type="text" name="title" id="title" required />
                </fieldset>
                <fieldset>
                  <label htmlFor="propertyType">Property type</label>
                  {/* <input type="text" name="propertyType" id="propertyType" required/> */}
                  <select name="propertyType" id="propertyType">
                    <option value="office space">Office Space</option>
                    <option value="apartment">apartment</option>
                    <option value="retail">Retail</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="townhouse">townhouse</option>
                    <option value="shop">Shop</option>
                    <option value="villa">Villa</option>
                    <option value="show room">Show Room</option>
                    <option value="whole building">Whole Building</option>
                    <option value="land">Land</option>
                    <option value="farm">Farm</option>
                    <option value="co-working space">Co-working space</option>
                    <option value="bulk rent unit">Bulk Rent Unit</option>
                    <option value="staff accommodation">
                      Staff Accommodation
                    </option>
                    <option value="business centre">Business Centre</option>
                    <option value="factory">Factory</option>
                  </select>
                </fieldset>
                <fieldset className="hidden">
                  <label htmlFor="agent">Agents</label>
                  <input
                    type="text"
                    name="agent"
                    id="agent"
                    value={info_slug}
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="serviceType">Type of service</label>
                  <select name="serviceType" id="serviceType" required>
                    <option value="rent">Rent</option>
                    <option value="sale">Sale</option>
                    <option value="commercial-sale">Commercial Sale</option>
                    <option value="commercial-rent">Commercial rent</option>
                  </select>
                </fieldset>

                <fieldset>
                  <label htmlFor="tags">Tags</label>
                  <input type="text" name="tags" id="tags" required />
                </fieldset>
                <fieldset>
                  <label htmlFor="servicePeriod">Payment period</label>
                  <select name="servicePeriod" id="servicePeriod" required>
                    <option value="m">Monthly</option>
                    <option value="y">Yearly</option>
                    <option value="0">null</option>
                  </select>
                </fieldset>
                {/* <fieldset className="hidden">
                  <label htmlFor="slug">Slug</label>
                  <input type="text" name="slug" id="slug" required />
                </fieldset> */}
                <fieldset>
                  <label htmlFor="propertySize">
                    Property size (in Sq.Ft.)
                  </label>
                  <input
                    type="text"
                    name="propertySize"
                    id="propertySize"
                    required
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="price">Price</label>
                  <input type="text" name="price" id="price" required />
                </fieldset>
                <fieldset>
                  <label htmlFor="state">State</label>
                  {/* <States /> */}
                  <select
                    name="state"
                    id="state"
                    class=""
                    onChange={(e) => updateDistrict(e)}
                  >
                    <option selected value="all">
                      Chose state
                    </option>

                    <option value="Andra Pradesh">Andhra Pradesh</option>
                    <option value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Dadar and Nagar Haveli">
                      Dadar and Nagar Haveli
                    </option>
                    <option value="Daman and Diu">Daman and Diu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </fieldset>
                <fieldset>
                  <label htmlFor="location">District</label>
                  {/* <input type="text" name="location" id="location" required /> */}
                  <select class="" name="location" id="location" required>
                    <option value="">-- select state -- </option>
                  </select>
                </fieldset>
                <fieldset>
                  <label htmlFor="address">Address</label>
                  <input type="text" name="address" id="address" required />
                </fieldset>
                <fieldset>
                  <label htmlFor="pincode">Pin code</label>
                  <input type="text" name="pincode" id="pincode" required />
                </fieldset>

                <fieldset className="w-100">
                  <label htmlFor="images">Images</label>
                  <div className="row">
                    {pimages?.map((img, index) => {
                      return (
                        <div className="col-12 col-md-6 mb-3">
                          {/* <input
                          type="text"
                          name="images"
                          id="images"
                          value={img}
                          key={index}
                          className="hidden"
                          required
                          onChange={(e) => imageUpdate(e, index)}
                        /> */}
                          {img && (
                            <img
                              src={img}
                              alt="images"
                              style={{
                                width: "320px",
                                height: "200px",
                                marginLeft: "15px",
                                display: "inline",
                              }}
                            />
                          )}
                          <img
                            src="/trash3-fill.svg"
                            alt="minus"
                            onClick={(e) => removeImage(index)}
                            style={{
                              width: "25px",
                              height: "25px",
                              marginLeft: "10px",
                              float: "right",
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <input
                    type="file"
                    id="PropertyImageUploader"
                    className="hidden"
                    onChange={addImageRow}
                  />
                  <div
                    className={`progress ${+!propImagesProgress && "hidden"}`}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      id="propertyImageProgress"
                      // style={{ width: "25%" }}
                      ariaValueNow="25"
                      ariaValueMin="0"
                      ariaValueMax="100"
                    ></div>
                  </div>
                  <label
                    htmlFor="PropertyImageUploader"
                    className="btn fs-5 text-light btn-danger"
                  >
                    Add image
                  </label>
                </fieldset>
                <fieldset>
                  <label htmlFor="video">video</label>
                  <input type="file" id="video" onChange={(e)=>uploadVideo(e)}/>
                  {
                    propVideo && propVideo !==''?
                             <video
                             src={propVideo}
                             type="video/mp4"
                             id="property_video"
                             preload={"true"}
                             autoPlay={false}
                             loop={false}
                             muted={false}
                             playsInline={false}
                             controls={true}
                             className="video_preview"
                           />:
                           null
                  }
                </fieldset>
                <fieldset>
                  <label htmlFor="bedroom">Bedroom</label>
                  <input type="text" name="bedroom" id="bedroom" required />
                </fieldset>
                <fieldset>
                  <label htmlFor="bathroom">Bathroom</label>
                  <input type="text" name="bathroom" id="bathroom" required />
                </fieldset>

                <fieldset>
                  <label htmlFor="facilities">Facilities</label>
                  {facilities?.map((f, index) => {
                    return (
                      <div className="d-flex">
                        <input
                          type="text"
                          name="facilities"
                          value={f}
                          className="mb-4"
                          key={index}
                          onChange={(e) => updatefacility(e, index)}
                          id="facilities"
                          required
                        />
                        <img
                          src="/minus.svg"
                          alt="minus"
                          onClick={(e) => removeFacility(index)}
                          style={{
                            width: "25px",
                            height: "25px",
                            marginLeft: "10px",
                          }}
                        />
                      </div>
                    );
                  })}
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={addFacilityRow}
                  >
                    Add row
                  </button>
                </fieldset>

                <fieldset>
                  <label htmlFor="status">Status</label>
                  <select name="status" id="status" required>
                    <option value="avail">available</option>
                    <option value="sold">Sold</option>
                  </select>
                </fieldset>
                <fieldset className="w-100">
                  <label htmlFor="description">Description</label>
                  <CustonFieldEdito fieldName={"description"} />
                  {/* <div id="editorjs">
            <CKEditor
              activeClass="p10"
              content={editorState}
              events={{
                // 'blur': this.onBlur.bind(this),
                // 'afterPaste': this.afterPaste.bind(this),
                change: onEditorChange,
              }}
            />
          </div> */}
                </fieldset>

                {editor ? (
                  <>
                    {!newProp && (
                      <button
                        className={`btn btn-primary btn-xl ${
                          +loader && "opacity-50 pe-none"
                        }`}
                        type="button"
                        onClick={updateProp}
                      >
                        Update
                        {loader && (
                          <div
                            className="spinner-border text-light"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        )}
                      </button>
                    )}
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
                {newProp && (
                  <button
                    type="submit"
                    className={`btn btn-primary btn-xl ${
                      +loader && "opacity-50 pe-none"
                    }`}
                    value="Add property"
                  >
                    Save
                    {loader && (
                      <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                  </button>
                )}
              </form>
            </div>
          </div>
          <div className="col-12 col-lg-3">
            {/* <div className="p-5"></div> */}
            <div className="card ">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fsuburban-house-residential-cottage-real-estate-vector-id1201141748%3Fk%3D6%26m%3D1201141748%26s%3D170667a%26w%3D0%26h%3DLX0dcJxZFI4jFafT9miGyXxq8IHAT3Or7MVDNzkpkug%3D&f=1&nofb=1"
                className="card-img-top "
                alt="..."
              />

              <div className="card-body">
                <p className="card-text text-dark fs-5">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div className="card-title fs-2 text-black">
                  Total properties ({props.length})
                </div>
                {!editor && (
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                      seteditor(true);
                      setnewProp(true);
                    }}
                  >
                    Add New
                  </button>
                )}
                {!newProp && (
                  <Link href={`/details/${slug}`}>
                    <a
                      className="btn btn-outline-success btn-lg mx-2"
                      target={"_blank"}
                    >
                      {" "}
                      View
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="p-5"></div>
        </div>
      </section>
    </>
  );
};

export default AddProperty;
