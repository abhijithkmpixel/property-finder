import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const PopupAgentEmailer = ({ email, setopenMailer }) => {
  const form = useRef();
  const [loader, setloader] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setloader(true);
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
          setloader(false);

          setopenMailer(false);
        },
        (error) => {
          alert(error.text);
          setloader(false);
        }
      );
  };

  return (
    <div className="agent_popup_form">
      <form onSubmit={sendEmail2} ref={form} className={""}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            To
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
            required
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
            required
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
            required
            name="mobile"
            placeholder="name@example.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Message
          </label>
          <textarea
            className="form-control fs-4"
            id="message"
            required
            name="message"
            rows="3"
          ></textarea>
        </div>
      
        <button
          type="submit"
          className={`btn btn-danger fs-3 float-right btn-lg w-100 ${
            +loader && "opacity-50 pe-none"
          }`}
        >
          Send{" "}
          {loader && (
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </button>
      </form>
      <button
        className="btn btn-primary fs-2 btn-lg"
        onClick={() => setopenMailer(false)}
      >
        x
      </button>
    </div>
  );
};

export default PopupAgentEmailer;
