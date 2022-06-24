import Link from "next/link";
import React, { useEffect } from "react";
import AOS from "aos";

const GuidesBody = ({ body }) => {
  useEffect(() => {
    
    AOS.init();
    AOS.refresh();
    return () => {
      
    }
  }, [])

  return (
    <section className="guide_bodycopy">
      <div className="container">
      
        {body?.map((rep) => {
          return (
            <div className="description_rep_box">
              <h2  data-aos="fade-up" data-aos-duration="900" data-aos-delay="600">{rep.title}</h2>
              <p style={{ height: "50px" }}  data-aos="fade-up" data-aos-duration="900" data-aos-delay="600">
                {rep.subtitle}{" "}
                <span
                  onClick={(e) => {
                    if (e.target.closest("p").style.height == "50px") {
                      e.target.closest("p").style.height = "auto";
                      e.target.innerText = "Read Less";
                    } else {
                      e.target.closest("p").style.height = "50px";
                      e.target.innerText = "Read More";
                    }
                  }}
                >
                  Read more
                </span>
              </p>
              <div className="row">
                {rep.redirects_guides[0] && (
                  <div className="col-12 col-lg-8"  data-aos="fade-right" data-aos-duration="900" data-aos-delay="900">
                    <Link href={rep.redirects_guides[0].url}>
                      <a>
                        <div className="redir_card">
                          <img
                            src={rep.redirects_guides[0].image}
                            alt={rep.redirects_guides[0].title}
                          />
                          <h4>{rep.redirects_guides[0].title}</h4>
                          <p>{rep.redirects_guides[0].desc}</p>
                        </div>
                      </a>
                    </Link>
                  </div>
                )}
                {rep.redirects_guides[1] && (
                  <div className="col-12 col-lg-4"  data-aos="fade-left" data-aos-duration="900" data-aos-delay="900">
                    <Link href={rep.redirects_guides[1].url}>
                      <a>
                        <div className="redir_card">
                          <img
                            src={rep.redirects_guides[1].image}
                            alt={rep.redirects_guides[1].title}
                          />
                          <h4>{rep.redirects_guides[1].title}</h4>
                          <p>{rep.redirects_guides[1].desc}</p>
                        </div>
                      </a>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GuidesBody;
