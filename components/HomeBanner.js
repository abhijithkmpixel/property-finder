import React, { useState } from "react";
import BuyProperty from "./forms/BuyProperty";
import RentProperty from "./forms/RentProperty";

const HomeBanner = ({ locs }) => {
  const [rent, setrent] = useState(true);
  return (
    <>
      <section className="home_page_banner">
        <div className="bg_image">
          <video
            src="/theme.mp4"
            type="video/mp4"
            id="video-background"
            preload="true"
            autoPlay="true"
            loop={true}
            muted={true}
            playsInline=""
            controls={false}
          />

          {/* <img src="/bg.jpg" alt="background" /> */}
        </div>
        <div className="main_contents">
            <div className="container">
          <h1>FIND OUT WHAT YOUR PROPERTY IS WORTH INSTANTLY</h1>
          <div className="search_filter_forms">
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
