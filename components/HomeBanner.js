import React,{useState} from "react";
import BuyProperty from "./BuyProperty";
import RentProperty from "./RentProperty";

const HomeBanner = ({locs}) => {
  const [rent, setrent] = useState(true)
  return (
    <section className="home_page_banner">
      <div className="bg_image">
        <img src="/bg.jpg" alt="background" />
        {
          console.log(locs)
        }
      </div>
      <div className="main_contents">
        <h1>Find your future home</h1>
        <div className="search_filter_forms">
          <div className="container">
            <div className="form_wrapper">
              {/* <nav>
                <span className={rent?'active':''} onClick={()=>setrent(true)}>Rent</span>
                <span  className={rent?'':'active'}  onClick={()=>setrent(false)}>Buy</span>
              </nav> */}
              <RentProperty locs={locs} />

              {/* {
                rent?
                <RentProperty locs={locs} />
                :
                <BuyProperty locs={locs}/>
              } */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
