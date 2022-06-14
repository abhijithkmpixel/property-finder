import Link from "next/link";
import React, { useEffect } from "react";

const GuidesBody = ({ body }) => {
  useEffect(() => {
    
  
    return () => {
      
    }
  }, [])

  return (
    <section className="guide_bodycopy">
      <div className="container">
      
        {body?.map((rep) => {
          return (
            <div className="description_rep_box">
              <h2>{rep.title}</h2>
              <p style={{ height: "50px" }}>
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
                  <div className="col-12 col-lg-8">
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
                  <div className="col-12 col-lg-4">
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
