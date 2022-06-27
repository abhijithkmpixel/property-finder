import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore/lite";
import { auth, db } from "../../pages/api/firebase";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CustonFieldEdito from "./CustonFieldEdito";
import { useRouter } from "next/router";
import PropsListingSticky from "../PropsListingSticky";
import EditorDiv from "./Editor";
import CKEditor from "react-ckeditor-component";

const AddProperty = ({ agents, props }) => {
  const [editor, seteditor] = useState(false);
  const [loader, setloader] = useState(false);
  const [facilities, setfacilities] = useState([""]);
  const router = useRouter();
  const [editorState, setEditorState] = useState(
    "<p>lorem</p>  <p>&nbsp;</p><p>capsicum</p>"
  );

  // const [description, setdescription] = useState('asdsad');
  useEffect(() => {
    // console.log(editorState);
    return () => {};
  }, [facilities]);

  const addProp = async (e) => {
    e.preventDefault();
    setloader(true);
    const collectionRef = collection(db, "properties");
    const sub = await addDoc(collectionRef, {
      title: e.target.title.value,
      images: e.target.images.value,
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
    });
    e.target.reset();
    alert(`Document with id ${sub.id} has been added to Database`);
    setloader(false);
    router.push("/add-property");
  };
  function editProp(p) {
    seteditor(true);
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
    document.getElementById("images").value = p.images;
    document.getElementById("description").value = p.description;
    document.getElementById("bedroom").value = p.bedroom;
    document.getElementById("bathroom").value = p.bathroom;
    document.getElementById("recommended").value = p.recommend
      ? p.recommend
      : "0";
    setfacilities(p?.facilities ? p?.facilities : [""]);
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
      title: document.getElementById("title").value,
      images: document.getElementById("images").value,
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
    });
    // console.log(sub);
    alert(
      `Document with id ${
        document.getElementById("propId").value
      } has been updated`
    );
    resetform();
    setloader(false);
    router.push("/add-property");

    // router.push("/add-property");
  };
  function resetform() {
    seteditor(false);
    document.getElementById("propId").value = "";
    document.getElementById("title").value = "";
    document.getElementById("images").value = "";
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
    document.getElementById("agent").value = "";
    setfacilities([]);
  }
  function updatefacility(e, index) {
    const prev = [...facilities];
    prev[index] = e.target.value;
    setfacilities(prev);
  }

  function addFacilityRow() {
    const prev = [...facilities];
    // console.log(facilities);
    prev[facilities.length] = "";
    setfacilities(prev);
  }
  function removeFacility(index){
    const prev = [...facilities];
    prev.splice(index,1)
    setfacilities(prev)
  }
  return (
    <>
      <PropsListingSticky props={props} editProp={editProp} />
      <form className="add_prop_form mb-5" onSubmit={(e) => addProp(e)}>
        <h3>Add a property</h3>
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
            <option value="staff accommodation">Staff Accommodation</option>
            <option value="business centre">Business Centre</option>
            <option value="factory">Factory</option>
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="agent">Agents</label>
          {/* <input type="text" name="agent" id="agent" required/> */}
          <select name="agent" id="agent">
            {agents?.map((agent) => {
              return <option value={agent.info_slug}>{agent.name}</option>;
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
          <input type="text" name="propertySize" id="propertySize" required />
        </fieldset>
        <fieldset>
          <label htmlFor="price">Price</label>
          <input type="text" name="price" id="price" required />
        </fieldset>
        <fieldset>
          <label htmlFor="location">Location</label>
          <input type="text" name="location" id="location" required />
        </fieldset>
        <fieldset>
          <label htmlFor="images">Images</label>
          <input type="text" name="images" id="images" required />
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
                  onClick={(e)=>removeFacility(index)}
                  style={{ width: "25px", height: "25px" ,marginLeft:'10px'}}
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
            <button
              className={`btn btn-primary btn-xl ${
                +loader && "opacity-50 pe-none"
              }`}
              type="button"
              onClick={updateProp}
            >
              updateProp
              {loader && (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </button>
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
          <button
            type="submit"
            className={`btn btn-primary btn-xl ${
              +loader && "opacity-50 pe-none"
            }`}
            value="Add property"
          >
            {" "}
            Add property{" "}
            {loader && (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </button>
        )}
      </form>
      <div className="p-5"></div>
    </>
  );
};

export default AddProperty;
