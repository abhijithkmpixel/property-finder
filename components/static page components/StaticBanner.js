import React, { useEffect } from 'react'
import AOS from "aos";

const StaticBanner = ({banner}) => {
  function readingTime() {
    const text = document.querySelector("p").innerText;
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    document.getElementById("time").innerText = time;
  }
  useEffect(() => {
    // readingTime();
    // console.log(banner);
    AOS.init();
    AOS.refresh();
    return () => {
    }
  }, [])
  
  return (
    <section className='static_banner'>
          <div className="bg_image_banner">
            <img src="https://www.propertyfinder.ae/guides/wp-content/uploads/2019/07/Cover-inage-1248x450.jpg" alt="asdsads" />
          </div>
        <div className="inner_wrap_banner">
          <div className="banner_content">
            <span  data-aos="fade-up" data-aos-duration="900" data-aos-delay="300">{banner.label}</span>
            <h1  data-aos="fade-up" data-aos-duration="900" data-aos-delay="600">{banner.main_title}</h1>
            <p  data-aos="fade-up" data-aos-duration="900" data-aos-delay="900">{banner.sub_title}</p>
          </div>
        </div>
    </section>
  )
}

export default StaticBanner