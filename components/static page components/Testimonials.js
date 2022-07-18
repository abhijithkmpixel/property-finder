import React, { useEffect } from "react";
import Slider from "react-slick";
import AOS from "aos";

function SampleNextArrow(props) {


  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "transparent" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "transparent" }}
      onClick={onClick}
    />
  );
}
const Testimonials = () => {
  useEffect(() => {
    // var l = document.querySelectorAll(".testimony_slider .slick-dots li");
    // document.getElementById("length").innerText = l.length;
    // document.getElementById("curr").innerText = 1
    AOS.init({
      offset:100

    });
    AOS.refresh();
    return () => {};
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 1900,
    slidesToShow: 1,
    fade: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    slidesToScroll: 1,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    arrows:false,
    beforeChange: (prev, next) => {
      // console.log(next);
      // document.getElementById("curr").innerText = next+10
    },
    // appendArrows:''
  };
  return (
    <section className="testimonials" >
      <div className="container">
        <div className="testimonials_wrapper row">
          <div className="col-12 col-lg-12"  data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
            <div className="div">
              <h4>Testimonials</h4>
              <h2>What Our Clients Say About Us.</h2>
            </div>
          </div>
          <div className="col-12 col-lg-12"  data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
            {/* <div className="slide_nav">
              <span id="curr"></span>
              <span id="length"></span>
            </div> */}
            <div className="testimony_slider">
              <Slider {...settings}>
                <div className="testimony_slide">
                  <div className="img_wrp">
                    <img
                      src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt="johnconor"
                    />
                  </div>
                  <div className="body_copy">
                    <h5>The Johnson Family</h5>
                    <p>
                      <span>"</span>
                      Find homes is outstanding. Prompt, courteous, patient and
                      understanding. BEST support I have ever received
                      <span>"</span>
                    </p>
                    <ul className="stars">
                      <li>⭐</li>
                      <li>⭐</li>
                      <li>⭐</li>
                      <li>⭐</li>
                      <li>⭐</li>
                    </ul>
                  </div>
                </div>
                <div className="testimony_slide">
                  <div className="img_wrp">
                    <img
                      src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt="johnconor"
                    />
                  </div>
                  <div className="body_copy">
                    <h5>The Conor family</h5>
                    <p>
                      <span>"</span>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt laudantium iure omnis eum aperiam excepturi.
                      <span>"</span>
                    </p>
                    <ul className="stars">
                      <li>⭐</li>
                      <li>⭐</li>
                      <li>⭐</li>
                      <li>⭐</li>
                      <li>⭐</li>
                    </ul>
                  </div>
                </div>
                <div className="testimony_slide">
                  <div className="img_wrp">
                    <img
                      src="https://images.pexels.com/photos/1103484/pexels-photo-1103484.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt="johnconor"
                    />
                  </div>
                  <div className="body_copy">
                    <h5>John Carter</h5>
                    <p>
                      <span>"</span>
                      Find homes is outstanding. Prompt, courteous, patient and
                      understanding. BEST support I have ever received
                      <span>"</span>
                    </p>
                    <ul className="stars">
                      <li>⭐</li>
                      <li>⭐</li>
                      <li>⭐</li>
                      <li>⭐</li>
                      <li>⭐</li>
                    </ul>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
