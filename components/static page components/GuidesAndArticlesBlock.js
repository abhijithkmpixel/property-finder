import React, { useEffect } from "react";
import AOS from "aos";
import Link from "next/link";

const GuidesAndArticlesBlock = () => {
  useEffect(() => {
    
    AOS.init({
      offset:100

    });
    AOS.refresh();
    return () => {
      
    }
  }, [])
  
  return (
    <section className="guides_and_articles_colum_block ">
      
      <div className="container">
        {/* <div className="title_wrp d-flex justify-content-center w-100 align-items-center">
        <h5>Guides & Articles?</h5>
      </div> */}
        <div className="row">
          <div className="col-12 col-md-12" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <div className="guides_column_title">
              <span>Tips:</span>
              <h5>Guides <br /> and Articles</h5>
              <div className="bg_blurb"></div>
              {/* <div className="bg_blurb"></div> */}
            </div>
          </div>
          <div className="col-12 col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
            <div className="Guides_block_card">
              <img
                src="https://g5p6r6b9.stackpathcdn.com/homeo/wp-content/uploads/elementor/thumbs/blog1-op5h9ukqohpvlj56kvz57kxf15eqhdeymxa36hjeck.jpg"
                alt="apartment"
              />
              <h4 className="">Buyer's guide</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus non cum beatae temporibus ex, aliquid quibusdam ut
                sit soluta delectus.
              </p>
              <Link       href="/buyersguide">
              <a
          
                className="btn btn-danger btn-lg"
              >
                Read More
              </a>
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="900">
            <div className="Guides_block_card">
              <img
                src="https://g5p6r6b9.stackpathcdn.com/homeo/wp-content/uploads/elementor/thumbs/blog2-op5h9ukqohpvlj56kvz57kxf15eqhdeymxa36hjeck.jpg"
                alt=""
              />
              <h4>Renter's guide</h4>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Corporis asperiores omnis at, cum aliquam recusandae obcaecati
                labore excepturi soluta accusantium!
              </p>
              <Link   href="/rentersguide">
              <a
              
                className="btn btn-danger btn-lg"
              >
                Read More
              </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidesAndArticlesBlock;
