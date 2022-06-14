import React,{useState} from "react";
import BuyProperty from "./forms/BuyProperty";
import RentProperty from "./forms/RentProperty";

const HomeBanner = ({locs}) => {
  const [rent, setrent] = useState(true)
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
              <RentProperty locs={locs} />

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
