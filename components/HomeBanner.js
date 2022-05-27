import React from "react";
import BuyProperty from "./BuyProperty";
import RentProperty from "./RentProperty";

const HomeBanner = () => {
  return (
    <section className="home_page_banner">
      <div className="bg_image">
        <img src="/bg.jpg" alt="background" />
      </div>
      <div className="main_contents">
        <h1>Find your future home</h1>
        <div className="search_filter_forms">
          <div className="container">
            <div className="form_wrapper">
              <nav>
                <span className="active">Rent</span>
                <span>Buy</span>
              </nav>
              <RentProperty />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
