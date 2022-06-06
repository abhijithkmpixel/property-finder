import { async } from "@firebase/util";
import { Alert } from "@mui/material";
import { addDoc, collection } from "firebase/firestore/lite";
import React,{useEffect} from "react";
import { db } from "../pages/api/firebase";
const AddAgent = () => {
  //  useEffect(async() => {
 
  
  //   return () => {
      
  //   }
  // }, [])
  
  const addProp = async (e)=>{
    e.preventDefault()


    const collectionRef = collection(db, "agents");
    const sub = await addDoc(collectionRef,{
      name: e.target.name.value,
      image: e.target.image.value,
      nationality: e.target.nationality.value,
      position: e.target.position.value,
      company: {
        company_image: e.target.company_image.value,
        name: e.target.company_name.value,

      },
      languages: e.target.language.value,
      info_slug: e.target.name.value.replace(' ','-'),
      // location: e.target.location.value,
      // description: e.target.description.value,
      // period: e.target.servicePeriod.value,
      // bedroom: e.target.bedroom.value,
      // bathroom: e.target.bathroom.value,
      // propertyType: e.target.propertyType.value,

    });
    e.target.reset();
    alert(`Document with id ${sub.id} has been added to Database`)


  }

  return (
    <form className="add_prop_form" onSubmit={(e)=> addProp(e)}>
      <h3>Add an agent</h3>
      <fieldset>
        <label htmlFor="nationality">Type of service</label>
        <select name="nationality" id="nationality" required>
          <option value="india">India</option>
          <option value="pakisthan">Pakisthan</option>
          <option value="london">london</option>
          <option value="Kyrgyzstan">Kyrgyzstan</option>
          <option value="united kingdom">united kingdom</option>
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="image">Image</label>
        <input type="text" name="image" id="image" required/>
      </fieldset>
      <fieldset>
        <label htmlFor="position">Position</label>
        <input type="text" name="position" id="position" required/>
      </fieldset>
      <fieldset>
        <label htmlFor="company_image">company image</label>
        <input type="text" name="company_image" id="company_image" required/>
      </fieldset>
      <fieldset>
        <label htmlFor="company_name">Company name</label>
        <input type="text" name="company_name" id="company_name" required/>
      </fieldset>
      <fieldset>
        <label htmlFor="language">language</label>
        <input type="text" name="language" id="language" required/>
      </fieldset>

      <fieldset>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" required/>
      </fieldset>
      <input
        type="submit"
        className="btn btn-primary btn-xl"
        placeholder="Add Agent"
      />
    </form>
  );
};

export default AddAgent;
