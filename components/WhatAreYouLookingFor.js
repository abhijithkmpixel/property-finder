import React, { useEffect } from "react";
import AOS from "aos";
import Link from "next/link";

const WhatAreYouLookingFor = () => {
  useEffect(() => {
    
    AOS.init({
      offset:100

    });
    AOS.refresh();
    return () => {
      
    }
  }, [])
  
  return (
    <section className="why_are_you_looking_for ">
      <div className="container">
        <div className="title_wrp d-flex justify-content-center w-100 align-items-center" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="100">
          <h5>What are you looking for?</h5>
        </div>
          <div className="row">
          <div className="col-12 col-md-4" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200">
              <div className="why_choose_card">
                <img src="/villa.webp" alt="" />
                <h4>Villas/Houses</h4>
                <p>
                  We went down the lane, by the body of the man in black, sodden
                  now from the overnight hail, and broke into the woods at the
                  foot of the hill.
                </p>
                <Link  href="/search?type=all&p_t=villa">
                <a className="btn btn-danger btn-lg">View all</a>
                </Link>
              </div>
            </div>
            <div className="col-12 col-md-4" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="600">
              <div className="why_choose_card">
                <img src="/apart.png" alt="apartment" />
                <h4 className="">APARTMENTS</h4>
                <p>
                  We went down the lane, by the body of the man in black, sodden
                  now from the overnight hail, and broke into the woods at the
                  foot of the hill.
                </p>
                <Link href="/search?type=all&p_t=apartments">
                <a  className="btn btn-danger btn-lg">View all</a>
                </Link>
              </div>
            </div>
        
            <div className="col-12 col-md-4" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="900">
              <div className="why_choose_card">
                <img src="office.png" alt="" />
                <h4>OFFICES</h4>
                <p>
                  We went down the lane, by the body of the man in black, sodden
                  now from the overnight hail, and broke into the woods at the
                  foot of the hill.
                </p>
                <Link href="/search?type=all&p_t=office%20space">
                <a  className="btn btn-danger btn-lg">View all</a>
                </Link>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
};

export default WhatAreYouLookingFor;
