import React, { useEffect } from "react";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import { signOut } from "firebase/auth";
import { auth } from "../../pages/api/firebase";

const ProfilePageDetails = ({
  userData,
  seteditor,
  editor,
  loadEditorData,
}) => {
  useEffect(() => {
    // console.log(userData);
    return () => {};
  }, [userData, editor]);
  const logout = async () => {
    await signOut(auth);
    // setuser(false);
    localStorage.removeItem("slug");
    localStorage.removeItem("fire_auth");


  };

  return (
    <section className={"profile_page " + (editor && " hidden")}>
      <div className="profile_banner_image">
        <div className="bnr_img">
          <img
            src="https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="banner image"
          />
        </div>
        <div className="container position-relative">
          <div className="profile_image">
            <div>

            {userData?.image && userData?.image !== "" && userData?.image !=='undefined' ? (
              <img src={userData?.image} alt={userData?.name} />
            ) : (
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="no image"
              />
            )}
            <button className="btn btn-link text-danger fs-4 px-5 mt-3 d-block" onClick={logout}>LOGOUT</button>

            </div>
            <div className="name_n_title">
              <h1>{userData?.name}</h1>
              <h5>{userData?.position}</h5>
              {userData?.verified && userData?.verified == true ? (
                <>
                <div className="d-flex align-items-center fs-4 text-light mt-3" role="alert">
                  <img src="http://getdrawings.com/free-icon/facebook-verified-icon-70.png" style={{width:'20px',height:'20px'}} alt="" />
                  Verified
                </div>

                </>
              ) : (
                <div className="d-flex align-items-center fs-4 text-light mt-3" role="alert">
                <img src="/pending.png" style={{width:'20px',height:'20px'}} alt="" />
                Pending
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="main">
          <div className="card">
            <div className="card-body">
          <h2>My Details</h2>
              <img   onClick={() => {
                  seteditor(true);
                  loadEditorData();
                }} src="/pencil-fill.svg" alt="edit image" style={{width:'20px',height:'20px',cursor:'pointer',float:'right'}} />
              <table width="100">
                <tbody>
                  {/* {userData?.name && (
                    <tr>
                      <td>Name</td>
                      <td>:</td>
                      <td>{userData?.name}</td>
                    </tr>
                  )} */}
                  {userData?.email && (
                    <tr>
                      <td>Email</td>
                      <td>:</td>
                      <td>{userData?.email}</td>
                    </tr>
                  )}
                  {/* {userData?.position && (
                    <tr>
                      <td>Position</td>
                      <td>:</td>
                      <td>{userData?.position}</td>
                    </tr>
                  )} */}
                  {userData?.mobile && (
                    <tr>
                      <td>Mobile</td>
                      <td>:</td>
                      <td>{userData?.mobile}</td>
                    </tr>
                  )}
                  {userData?.languages && (
                    <tr>
                      <td>Languages</td>
                      <td>:</td>
                      <td>{userData?.languages}</td>
                    </tr>
                  )}
                  {userData?.nationality && (
                    <tr>
                      <td>Nationality</td>
                      <td>:</td>
                      <td>{userData?.nationality}</td>
                    </tr>
                  )}
                  {userData?.about_me && (
                    <tr>
                      <td>About me</td>
                      <td>:</td>
                      <td>{userData?.about_me}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePageDetails;
