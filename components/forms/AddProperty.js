import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore/lite";
import { auth, db } from "../../pages/api/firebase";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CustonFieldEdito from "./CustonFieldEdito";
import { useRouter } from "next/router";
import PropsListingSticky from "../PropsListingSticky";
import EditorDiv from "./Editor";
import CKEditor from "react-ckeditor-component";
import Link from "next/link";
import States from "./States";

const AddProperty = ({ agents, props }) => {
  const [editor, seteditor] = useState(false);
  const [loader, setloader] = useState(false);
  const [facilities, setfacilities] = useState([""]);
  const [newProp, setnewProp] = useState(true);
  const [slug, setslug] = useState("");
  const router = useRouter();
  const [pimages, setpimages] = useState([]);

  const [editorState, setEditorState] = useState(
    "<p>lorem</p>  <p>&nbsp;</p><p>capsicum</p>"
  );

  // const [description, setdescription] = useState('asdsad');
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
      slug: e.target.slug.value,
      propertySize: e.target.propertySize.value,
      price: e.target.price.value,
      location: e.target.location.value,
      description: e.target.description.value,
      period: e.target.servicePeriod.value,
      bedroom: e.target.bedroom.value,
      bathroom: e.target.bathroom.value,
      propertyType: e.target.propertyType.value,
      agent: e.target.agent.value,
      recommend: e.target.recommended.value,
      facilities: facilities,
      address:e.target.address.value,
      pincode:e.target.pincode.value,
      state:e.target.state.value,
      amenities: {
        maids_room: e.target.maids_room.checked,
        study: e.target.study.checked,
        maids_room: e.target.maids_room.checked,
        Central_ac: e.target.Central_ac.checked,
        balcony: e.target.balcony.checked,
        garden: e.target.garden.checked,
        pool: e.target.pool.checked,
        gym: e.target.gym.checked,
        electricity_backup: e.target.electricity_backup.checked,
        laundry_room: e.target.laundry_room.checked,
        cctv: e.target.cctv.checked,
        waste: e.target.waste.checked,
      },
    });
    e.target.reset();
    alert(`Document with id ${sub.id} has been added to Database`);
    setnewProp(false);
    setloader(false);
    router.push("/admin/properties");
  };
  function editProp(p) {
    seteditor(true);
    setslug(p.slug);
    setnewProp(false);
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
    document.getElementById("slug").value = p.slug;
    document.getElementById("propertySize").value = p.propertySize;
    document.getElementById("price").value = p.price;
    document.getElementById("location").value = p.location;
    // document.getElementById("images").value = p.images;
    document.getElementById("description").value = p.description;
    document.getElementById("bedroom").value = p.bedroom;
    document.getElementById("bathroom").value = p.bathroom;
    setpimages(p.images);
    document.getElementById("maids_room").checked =
      p?.amenities?.maids_room == true ? true : false;
    document.getElementById("study").checked =
      p?.amenities?.study == true ? true : false;
    document.getElementById("balcony").checked =
      p?.amenities?.balcony == true ? true : false;
    document.getElementById("Central_ac").checked =
      p?.amenities?.Central_ac == true ? true : false;
    document.getElementById("garden").checked =
      p?.amenities?.garden == true ? true : false;
    document.getElementById("pool").checked =
      p?.amenities?.pool == true ? true : false;
    document.getElementById("gym").checked =
      p?.amenities?.gym == true ? true : false;
    document.getElementById("electricity_backup").checked =
      p?.amenities?.electricity_backup == true ? true : false;
    document.getElementById("laundry_room").checked =
      p?.amenities?.laundry_room == true ? true : false;
    document.getElementById("cctv").checked =
      p?.amenities?.cctv == true ? true : false;
    document.getElementById("waste").checked =
      p?.amenities?.waste == true ? true : false;

    document.getElementById("recommended").value = p.recommend
      ? p.recommend
      : "0";
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
      address:document.getElementById("address").value,
      pincode:document.getElementById("pincode").value,
      state:document.getElementById("state").value,
      title: document.getElementById("title").value,
      images: pimages,
      serviceType: document.getElementById("serviceType").value,
      tags: document.getElementById("tags").value,
      slug: document.getElementById("slug").value,
      propertySize: document.getElementById("propertySize").value,
      price: document.getElementById("price").value,
      location: document.getElementById("location").value,
      description: document.getElementById("description").value,
      period: document.getElementById("servicePeriod").value,
      bedroom: document.getElementById("bedroom").value,
      bathroom: document.getElementById("bathroom").value,
      propertyType: document.getElementById("propertyType").value,
      agent: document.getElementById("agent").value,
      recommend: document.getElementById("recommended").value,
      facilities: facilities,
      amenities: {
        maids_room: document.getElementById("maids_room").checked,
        study: document.getElementById("study").checked,
        Central_ac: document.getElementById("Central_ac").checked,
        balcony: document.getElementById("balcony").checked,
        garden: document.getElementById("garden").checked,
        pool: document.getElementById("pool").checked,
        gym: document.getElementById("gym").checked,
        electricity_backup:
          document.getElementById("electricity_backup").checked,
        laundry_room: document.getElementById("laundry_room").checked,
        cctv: document.getElementById("cctv").checked,
        waste: document.getElementById("waste").checked,
      },
    });
    alert(
      `Document with id ${
        document.getElementById("propId").value
      } has been updated`
    );
    resetform();
    setloader(false);
    setslug("");

    router.push("/admin/properties");

    // router.push("/add-property");
  };
  function resetform() {
    seteditor(false);
    setnewProp(true);
    setslug("");
    setpimages([]);
    document.getElementById('htmlviewdiv').innerHTML =''
    document.getElementById("state").value = '';
    // document.getElementById("district").value = '';
    document.getElementById("pincode").value = '';
    document.getElementById("address").value = '';
    document.getElementById("propId").value = "";
    document.getElementById("title").value = "";
    // document.getElementById("images").value = "";
    document.getElementById("serviceType").value = "";
    document.getElementById("tags").value = "";
    document.getElementById("slug").value = "";
    document.getElementById("propertySize").value = "";
    document.getElementById("price").value = "";
    document.getElementById("location").value = "";
    document.getElementById("description").value = "";
    document.getElementById("servicePeriod").value = "";
    document.getElementById("bedroom").value = "";
    document.getElementById("bathroom").value = "";
    document.getElementById("propertyType").value = "";
    document.getElementById("agent").checked = false;
    // document.getElementById("maids_room").checked = false;
    // document.getElementById("study").checked = false;
    // document.getElementById("balcony").checked = false;
    // document.getElementById("Central_ac").checked = false;
    // document.getElementById("cctv").checked = false;
    // document.getElementById("electricity_backup").checked = false;
    // document.getElementById("garden").checked = false;
    // document.getElementById("gym").checked = false;
    // document.getElementById("laundry_room").checked = false;
    // document.getElementById("pool").checked = false;
    // document.getElementById("waste").checked = false;

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
  function imageUpdate(e, index) {
    var imgs = [...pimages];
    imgs[index] = e.target.value;
    setpimages(imgs);
  }

  function addImageRow() {
    var imgs = [...pimages];
    imgs = [...imgs, ""];
    setpimages(imgs);
  }

  function removeImage(index) {
    const prev = [...pimages];
    prev.splice(index, 1);
    setpimages(prev);
  }
  return (
    <>
      <div className="row m-0">
        <div className="col-12 col-lg-9">
          <div className={editor && "hidden"}>
            <PropsListingSticky props={props} editProp={editProp} />
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
              <fieldset>
                <label htmlFor="agent">Agents</label>
                {/* <input type="text" name="agent" id="agent" required/> */}
                <select name="agent" id="agent">
                  {agents?.map((agent) => {
                    return (
                      <option value={agent.info_slug}>{agent.name}</option>
                    );
                  })}
                </select>
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
              <fieldset>
                <label htmlFor="slug">Slug</label>
                <input type="text" name="slug" id="slug" required />
              </fieldset>
              <fieldset>
                <label htmlFor="propertySize">Property size (in Sq.Ft.)</label>
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
            <States/>
              </fieldset>
              <fieldset>
                <label htmlFor="location">District</label>
                <input type="text" name="location" id="location" required />
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
                {pimages?.map((img, index) => {
                  return (
                    <div className="d-flex mb-3">
                      <input
                        type="text"
                        name="images"
                        id="images"
                        value={img}
                        key={index}
                        required
                        onChange={(e) => imageUpdate(e, index)}
                      />
                      {img && (
                        <img
                          src={img}
                          alt="images"
                          style={{
                            width: "90px",
                            height: "50px",
                            marginLeft: "15px",
                          }}
                        />
                      )}
                      <img
                        src="/minus.svg"
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
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={addImageRow}
                >
                  Add row
                </button>
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
                <label htmlFor="recommended">Add to recomended</label>
                <select name="recommended" id="recommended">
                  <option value="0">no</option>
                  <option value="1">yes</option>
                </select>
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
                <label htmlFor="amenities">Amenities</label>
                <div className="d-flex flex-wrap inner_amenities">
                  <fieldset className="d-flex align-tems-center justify-content-start">
                    <input
                      type="checkbox"
                      name="amenities"
                      value={"maids_room"}
                      id="maids_room"
                    />
                    <label htmlFor="maids_room">Maids room</label>
                  </fieldset>
                  <fieldset className="d-flex align-tems-center justify-content-start">
                    <input
                      type="checkbox"
                      name="amenities"
                      value={"study"}
                      id="study"
                    />
                    <label htmlFor="study">Study</label>
                  </fieldset>
                  <fieldset className="d-flex align-tems-center justify-content-start">
                    <input
                      type="checkbox"
                      name="amenities"
                      value={"Central_ac"}
                      id="Central_ac"
                    />
                    <label htmlFor="Central_ac">Central A/C & Heating</label>
                  </fieldset>
                  <fieldset className="d-flex align-tems-center justify-content-start">
                    <input
                      type="checkbox"
                      name="amenities"
                      value={"balcony"}
                      id="balcony"
                    />
                    <label htmlFor="balcony">balcony</label>
                  </fieldset>
                  <fieldset className="d-flex align-tems-center justify-content-start">
                    <input
                      type="checkbox"
                      name="amenities"
                      value={"garden"}
                      id="garden"
                    />
                    <label htmlFor="garden">Garden</label>
                  </fieldset>
                  <fieldset className="d-flex align-tems-center justify-content-start">
                    <input
                      type="checkbox"
                      name="amenities"
                      value={"pool"}
                      id="pool"
                    />
                    <label htmlFor="pool">Pool</label>
                  </fieldset>
                  <fieldset className="d-flex align-tems-center justify-content-start">
                    <input
                      type="checkbox"
                      name="amenities"
                      value={"gym"}
                      id="gym"
                    />
                    <label htmlFor="gym">Gym</label>
                  </fieldset>
                  <fieldset className="d-flex align-tems-center justify-content-start">
                    <input
                      type="checkbox"
                      name="amenities"
                      value={"electricity_backup"}
                      id="electricity_backup"
                    />
                    <label htmlFor="electricity_backup">
                      Electricity Backup
                    </label>
                  </fieldset>
                  <fieldset className="d-flex align-tems-center justify-content-start">
                    <input
                      type="checkbox"
                      name="amenities"
                      value={"laundry_room"}
                      id="laundry_room"
                    />
                    <label htmlFor="laundry_room">Laundry Room</label>
                  </fieldset>
                  <fieldset className="d-flex align-tems-center justify-content-start">
                    <input
                      type="checkbox"
                      name="amenities"
                      value={"cctv"}
                      id="cctv"
                    />
                    <label htmlFor="cctv">CCTV Security</label>
                  </fieldset>
                  <fieldset className="d-flex align-tems-center justify-content-start">
                    <input
                      type="checkbox"
                      name="amenities"
                      value={"waste"}
                      id="waste"
                    />
                    <label htmlFor="waste">Waste Disposal</label>
                  </fieldset>
                </div>
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
                      <div className="spinner-border text-light" role="status">
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
          <div className="p-5"></div>
          <div className="card mt-5">
            <img
              src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600"
              className="card-img-top"
              alt="..."
            />

            <div className="card-body">
              <div className="card-title fs-2 text-black">
                Total properties ({props.length})
              </div>
              {/* <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p> */}
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  seteditor(true);
                  setnewProp(true);
                }}
              >
                Add new property
              </button>
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
    </>
  );
};

export default AddProperty;
