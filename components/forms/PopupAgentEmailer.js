import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const PopupAgentEmailer = ({ email,setopenMailer }) => {
  const form = useRef();
  useEffect(() => {
    
  
    return () => {
      
    }
  }, [])
  

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_sj9orxp",
        "template_1462vbx",
        form.current,
        "i7oi6TIYg2mUAzIWC"
      )
      .then(
        (result) => {
          alert(result.text);
          setopenMailer(false)
        },
        (error) => {
          alert(error.text);
        }
      );
  };
  return (
    <div className="agent_popup_form">
      <form onSubmit={sendEmail} ref={form} className={""}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            to
          </label>
          <input
            type="name"
            className="form-control"
            id="to_mail"
            name="to_mail"
            placeholder=""
            value={email}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="from_name"
            name="from_name"
            placeholder=""
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder=""
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Mobile
          </label>
          <input
            type="text"
            className="form-control "
            id="mobile"
            name="mobile"
            placeholder="name@example.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Message
          </label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="3"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-outline-danger" value={"send"} />
      </form>
      <button className="btn btn-primary" onClick={()=>setopenMailer(false)}>close</button>
    </div>
  );
};

export default PopupAgentEmailer;
