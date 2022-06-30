import React, { useEffect, useState } from "react";
import HeadTag from "../../components/Head";
import Header from "../../components/Header";
import emailjs from "@emailjs/browser";
import AOS from "aos";
import Footer from "../../components/Footer";

const index = () => {
  const [successMsg, setsuccessMsg] = useState(false);
  const [loader, setloader] = useState(false);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  
    return () => {
      
    }
  }, [])
  
  function submitHandler(e) {
    e.preventDefault();
    setloader(true)
    var templateParams = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    emailjs
      .sendForm(
        "service_sj9orxp",
        "template_p2sjrmx",
        "#contactform",
        "i7oi6TIYg2mUAzIWC"
      )
      .then(
        function (response) {
          // console.log("SUCCESS!", response.status, response.text);
          // alert("SUCCESS!", response.status, response.text);
          setsuccessMsg(true);
          setloader(false)
          setTimeout(() => {
            setsuccessMsg(false);
          }, 4000);
          e.target.reset();
        },
        function (error) {
          setloader(false)

          // console.log("FAILED...", error);
          // alert("FAILED...", error);
        }
      );
  }
  return (
    <>
{
  successMsg &&
<div className="position-fixed bottom-0 end-0 p-3 " style={{zIndex: 11}}>
  <div id="liveToast" className="toast show " role="alert" aria-live="assertive" aria-atomic="true">
    <div className="toast-header">
      {/* <img src="..." className="rounded me-2" alt="..."/> */}
      <strong className="me-auto">Alert</strong>
      {/* <small>11 mins ago</small> */}
      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={()=>setsuccessMsg(false)}></button>
    </div>
    <div className="toast-body fs-4 ">
    Success! message sent.
    </div>
  </div>
</div>
}
      <HeadTag title="Contact Us" meta="contact us with many options" />
      <Header innerpage={true} />
      <section className="contact_form">
        <div className="map">
          <img src="/contactbg.jpg" alt="" />
        </div>

        <div className="content ">
          <div className="contact"  data-aos="fade-up" data-aos-duration="900" data-aos-delay="700">
            <div className="other">
              <div className="info">
                <h2>More Methods </h2>
                <h3>Email</h3>
                <div className="svg-wrap">
                  <a href="mailto:johnconor@gmail.com">
                    <img src="/email.png" alt="email" />
                    johnconor@gmail.com
                  </a>
                </div>
                <h3>Connect</h3>
                <div className="svg-wrap">
                  <a href="http://instagram.com/" target="_blank">
                    <img src="/insta.png" alt="email" />
                  </a>

                  <a href="http://facebook.com" target="_blank">
                    <img src="/facebook.png" alt="email" />
                  </a>

                  <a href="http://linkedin.com/" target="_blank">
                    <img src="/linkedin.png" alt="email" />
                  </a>
                </div>
              </div>
            </div>
            <div className="form">
              <h1>Get In Touch</h1>
              {/* {successMsg && (
                <div
                  className="alert alert-success w-100 fs-4 alert-dismissible"
                  role="alert"
                >
                  Success! message sent.
                </div>
              )} */}
              <form onSubmit={submitHandler} id="contactform">
                <div className="flex-rev">
                  <input
                    type="text"
                    placeholder="John Conor"
                    name="name"
                    id="name"
                    required
                  />
                  <label for="name">Full Name</label>
                </div>
                <div className="flex-rev">
                  <input
                    type="email"
                    placeholder="johnconor@gmail.com"
                    name="email"
                    id="email"
                    required
                  />
                  <label for="email">Your Email</label>
                </div>

                <div className="flex-rev">
                  <textarea
                    placeholder="I have an query about...."
                    name="message"
                    id="message"
                    required
                  />
                  <label for="message">Email Message</label>
                </div>
                <button className={`w-100 ${loader && "opacity-50 pe-none"}`}>
                  Send Email{" "}
                  {loader && (
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer/>

    </>
  );
};

export default index;
