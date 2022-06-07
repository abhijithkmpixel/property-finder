import Link from "next/link";
import React from "react";

const RecommendedProp = ({ title, list , agents }) => {
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
                  <div className="col-12 col-md-6 col-lg-4" key={prop.id}>
                    <Link href={`/details/` + prop.slug}>
                      <a>
                        <div className="prop_col_card">
                          <div className="prop_img">
                            <img src={prop.images} alt={prop.title} />
                            <div className="builder_logo">
                              {
                                agents?.map(a=>{
                                  if(a.info_slug.toString() == prop.agent.toString()){
                                    return <img src={a.company.company_image} alt={a.company.name} /> 
                                  }
                                })
                              }
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
