import React,{useState} from "react";
import BuyProperty from "./forms/BuyProperty";
import RentProperty from "./forms/RentProperty";

const HomeBanner = ({locs}) => {
  const [rent, setrent] = useState(true)
  return (
    <>
    <section className="home_page_banner">
      <div className="bg_image">
      <video src="/background-vid.mp4" type="video/mp4" id="video-background" preload="true" autoplay="true" loop="true" muted="true" playsinline="" />


        {/* <img src="/bg.jpg" alt="background" /> */}
      </div>
      <div className="main_contents">
        <h1>Find your future home</h1>
        <div className="search_filter_forms">
          <div className="container">
            <div className="form_wrapper">
              <RentProperty locs={locs} />

            </div>
          </div>
        </div>
      </div>
          <a href="#main" className="scroll_down mt-4"><img src="/down-ong.png" alt="" /></a>
    </section>
    <section className="p-4 w-100" id="main">
      <div className="p-5"></div>
    </section>
    </>
  );
};

export default HomeBanner;
