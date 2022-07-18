import { doc, setDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "../../pages/api/firebase";
import ProfilePageDetails from "../static page components/ProfilePageDetails";
import Countries from "./Countries";
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
const AgentDetailsForm = ({setloading, userData, seteditor, editor, loadEditorData }) => {
  const [loader, setloader] = useState(false);
  const [uploadingImage, setuploadingImage] = useState(false);

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
    document.getElementById("district").innerHTML = htmlString;
  }

  const updateData = async (e) => {
    e.preventDefault();
    setloader(true);

    const docRef = doc(db, "agents", userData?.id);

    const sub = await setDoc(docRef, {
      ...userData,
      name: document.getElementById("name").value,
      image: document.getElementById("image").value,
      nationality: document.getElementById("nationality").value,
      state: document.getElementById("agent_state").value,
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
      district: document.getElementById("district").value,

    });

    seteditor(false);
    setloading(true);

    // setuserData(null);
    // router.push('/Profile')
    window.location.reload(true);
    setloader(false);
  };

  function loadEditorData() {
    document.getElementById("district").innerHTML = `<option  selected value='${userData?.district}'>${userData.district}</option>` ;
    document.getElementById("name").value = userData?.name;
    document.getElementById("position").value = userData?.position;
    document.getElementById("nationality").value = userData?.nationality;
    document.getElementById("agent_state").value = userData?.state;

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
       document.getElementById("district").value = userData?.district? userData?.district : '';

  }

  function getimage(e) {
    // setprofileImage(e.target.files[0]);
    uploadImage(e.target.files[0]);
  }
  function uploadImage(file) {
    if (file) {
      const proImgRef = ref(
        storage,
        `brokers/${userData?.info_slug}/${file.name}`
      );
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
            <label htmlFor="agent_state">State</label>
            <select
                    name="agent_state"
                    id="agent_state"
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
            <label htmlFor="district">District</label>
            <select class="" name="district" id="district" required>
                    <option value="">-- select state -- </option>
                  </select>
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
            <input
              type="file"
              className="mb-2"
              id="image_uploader"
              onChange={getimage}
            />

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
            <textarea name={"about_me"} id={"about_me"} rows={30}></textarea>
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
    </>
  );
};

export default AgentDetailsForm;
