import React, { useEffect, useState } from "react";
import AOS from "aos";

const AgentVIdeoBanner = ({ locs }) => {
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
      <section className="home_page_banner agentVideo_banner">
        <div className="bg_image">
          <video
            src="/agent.mp4"
            type="video/mp4"
            id="video-background"
            preload={'true'}
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
          <h1 data-aos="fade-up" data-aos-duration="900" data-aos-delay="300"><span>Why consult us?</span></h1>
          <p className="m-auto w-50"  data-aos="fade-up" data-aos-duration="900" data-aos-delay="600">Helping you pick the perfect home for you and your loved ones</p>

          {/* <div className="search_filter_forms" data-aos="fade-up" data-aos-duration="900" data-aos-delay="1000">
              <div className="form_wrapper">
                <RentProperty locs={locs} />
              </div>
            </div> */}
          </div>
        </div>
        {/* <a href="#main" className="scroll_down mt-4">
          <img src="/arrdwn.png" alt="" />
        </a> */}
      </section>
      <section className="p-4 w-100 bg-light" id="main">
        <div className="p-5"></div>
      </section>
    </>
  );
};

export default AgentVIdeoBanner;
