import { async } from "@firebase/util";
import { Alert } from "@mui/material";
import { addDoc, collection } from "firebase/firestore/lite";
import React,{useEffect} from "react";
import { db } from "../pages/api/firebase";
const AddProperty = () => {
  //  useEffect(async() => {
 
  
  //   return () => {
      
  //   }
  // }, [])
  
  const addProp = async (e)=>{
    e.preventDefault()


    const collectionRef = collection(db, "properties");
    const sub = await addDoc(collectionRef,{
      title: e.target.title.value,
      images: e.target.images.value,
      serviceType: e.target.serviceType.value,
      tags: e.target.tags.value,
      slug: e.target.slug.value,
      propertySize: e.target.propertySize.value,
      price: e.target.price.value,
      location: e.target.location.value,
      description: e.target.description.value,
      bedroom: e.target.bedroom.value,
      bathroom: e.target.bathroom.value,
      propertyType: e.target.propertyType.value,

    });
    e.target.reset();
    alert(`Document with id ${sub.id} has been added to Database`)


  }

  return (
    <form className="add_prop_form" onSubmit={(e)=> addProp(e)}>
      <h3>Add a property</h3>
      <fieldset>
      <Alert severity="success">This is a success alert — check it out!</Alert>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" required />
      </fieldset>
      <fieldset>
        <label htmlFor="propertyType">Property type</label>
        {/* <input type="text" name="propertyType" id="propertyType" required/> */}
        <select name="propertyType" id="propertyType">
          <option value="office space">Office Space</option>
          <option value="retail">Retail</option>
          <option value="warehouse">Warehouse</option>
          <option value="shop">Shop</option>
          <option value="villa">Villa</option>
          <option value="show room">Show Room</option>
          <option value="whole building">Whole Building</option>
          <option value="Land">Land</option>
          <option value="Farm">Farm</option>
          <option value="Co-working space">Co-working space</option>
          <option value="Bulk Rent Unit">Bulk Rent Unit</option>
          <option value="Staff Accommodation">Staff Accommodation</option>
          <option value="Business Centre">Business Centre</option>
          <option value="Factory">Factory</option>
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="serviceType">Type of service</label>
        <select name="serviceType" id="serviceType" required>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="tags">Tags</label>
        <input type="text" name="tags" id="tags" required/>
      </fieldset>
      <fieldset>
        <label htmlFor="slug">Slug</label>
        <input type="text" name="slug" id="slug" required/>
      </fieldset>
      <fieldset>
        <label htmlFor="propertySize">Property size (in Sq.Ft.)</label>
        <input type="text" name="propertySize" id="propertySize" required/>
      </fieldset>
      <fieldset>
        <label htmlFor="price">Price</label>
        <input type="text" name="price" id="price" required/>
      </fieldset>
      <fieldset>
        <label htmlFor="location">Location</label>
        <input type="text" name="location" id="location" required/>
      </fieldset>
      <fieldset>
        <label htmlFor="images">Images</label>
        <input type="text" name="images" id="images" required/>
      </fieldset>
      <fieldset>
        <label htmlFor="description">Description</label>
        {/* <input type="text" name="description" id="description" /> */}
        <textarea name="description" id="description" cols="30" rows="10" required></textarea>
      </fieldset>
      <fieldset>
        <label htmlFor="bedroom">Bedroom</label>
        <input type="text" name="bedroom" id="bedroom" required/>
      </fieldset>
      <fieldset>
        <label htmlFor="bathroom">Bathroom</label>
        <input type="text" name="bathroom" id="bathroom" required/>
      </fieldset>
      <input
        type="submit"
        className="btn btn-primary btn-xl"
        placeholder="Add property"
      />
    </form>
  );
};

export default AddProperty;
