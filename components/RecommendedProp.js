import Link from "next/link";
import React from "react";

const RecommendedProp = ({ title, list }) => {
  return (
    <section className="recc_prop_section">
      {
        // console.log(list)
      }
      <div className="container">
        {title && <h5>{title}</h5>}
        <div className="row">
          {list && list.length > 0
            ? list?.map((prop) => {
                return (
                  <div className="col-12 col-md-6 col-lg-4">
                    <Link href={`/details/` + prop.slug}>
                      <a>
                        <div className="prop_col_card">
                          <div className="prop_img">
                            <img src={prop.images} alt="proprty image" />
                            <div className="builder_logo">
                              <img src="/b.jpg" alt="builder logo" />
                            </div>
                          </div>
                          <div className="body_coopy">
                            <h4>{prop.tags}</h4>
                            <div className="card_footer">
                              <span>{prop.propertyType}</span>
                              <span>{prop.propertySize}</span>

                              <span> {prop.bedroom} Bed</span>
                              <span> {prop.bathroom} Bath</span>
                              <span className="price">{prop.price} AED</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </section>
  );
};

export default RecommendedProp;
