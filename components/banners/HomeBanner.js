import React, { useEffect, useState } from "react";
import BuyProperty from "../forms/BuyProperty";
import RentProperty from "../forms/RentProperty";
import AOS from "aos";

const HomeBanner = ({ locs }) => {
  const [rent, setrent] = useState(true);
  useEffect(() => {
    AOS.init({
      offset:100

    });
    AOS.refresh();
  
    return () => {
      
    }
  }, [])
  
  return (
    <>
      <section className="home_page_banner">
        <div className="bg_image">
          <video
            src="/theme.mp4"
            type="video/mp4"
            id="video-background"
            preload={true}
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            controls={false}
          />

          {/* <img src="/bg.jpg" alt="background" /> */}
        </div>
        <div className="main_contents">
            <div className="container">
          {/* <h1 data-aos="fade-up" data-aos-duration="900" data-aos-delay="300">FIND OUT WHAT YOUR <span>PROPERTY</span> IS WORTH <span>INSTANTLY</span></h1> */}
          <h1 data-aos="fade-up" data-aos-duration="900" data-aos-delay="300">WELCOME TO <span>FIND HOMES</span></h1>
          <p  data-aos="fade-up" data-aos-duration="900" data-aos-delay="600">Find Homes is an innovative real estate company that helps to find the perfect home for you.</p>

          <div className="search_filter_forms" data-aos="fade-up" data-aos-duration="900" data-aos-delay="1000">
              <div className="form_wrapper">
                <RentProperty locs={locs} />
              </div>
            </div>
          </div>
        </div>
        <a href="#main" className="scroll_down mt-4">
          <img src="/arrdwn.png" alt="" />
        </a>
      </section>
      <section className="p-4 w-100 bg-light" id="main">
        <div className="p-5"></div>
      </section>
    </>
  );
};

export default HomeBanner;
