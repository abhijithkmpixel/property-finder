import Link from "next/link";
import React, { useEffect } from "react";
import AOS from "aos";

const GettingStarted = () => {
  useEffect(() => {
    // var l = document.querySelectorAll(".testimony_slider .slick-dots li");
    // document.getElementById("length").innerText = l.length;
    // document.getElementById("curr").innerText = 1
    AOS.init({
      // offset:100

    });
    AOS.refresh();
    return () => {};
  }, []);
  return (
    <section className="get_started_asBroker">
      <div className="container">
        <div className="get_started_asBroker_wrapper">
          <h3  data-aos="fade-right" data-aos-duration="7000" data-aos-delay="100">Want to become a broker?</h3>
          <p  data-aos="fade-right" data-aos-duration="7000" data-aos-delay="100">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus,
            explicabo illum sint sit assumenda, aliquid qui iure debitis tempore
            quia, eos et harum illo similique recusandae voluptates placeat!
            Recusandae, impedit?
          </p>
          <Link href="/auth/broker/register">
            <a className="btn fs-3 btn-danger rounded-pill px-5"  data-aos="fade-right" data-aos-duration="7000" data-aos-delay="100">Register now</a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GettingStarted;
