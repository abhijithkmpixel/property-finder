import React, { useEffect } from 'react'

const ProfilePageDetails = ({userData,seteditor,editor}) => {
  useEffect(() => {
    
  // console.log(userData);
    return () => {
      
    }
  }, [userData,editor])
  
  return (
    <section className={"profile_page " + (editor && ' hidden')}>
    <div className="container">
      <div className="profile_image">
        <img src={userData?.image} alt={userData?.name} />
      </div>
      <div className="main">
        <h2>Details</h2>
        <div className="card">
          <div className="card-body">
            {/* <i className="fa fa-pen fa-xs edit"></i> */}
            <button className="btn btn-primary float-end" onClick={()=>seteditor(true)}>Edit</button>
            <table width='100' >
              <tbody>
                {userData?.name && (
                  <tr>
                    <td>Name</td>
                    <td>:</td>
                    <td>{userData?.name}</td>
                    {/* <input type="text" value={userData?.name} readOnly /> */}
                  </tr>
                )}
                {userData?.email && (
                  <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td>{userData?.email}</td>
                  </tr>
                )}
                {userData?.position && (
                  <tr>
                    <td>Position</td>
                    <td>:</td>
                    <td>{userData?.position}</td>
                  </tr>
                )}
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
  )
}

export default ProfilePageDetails