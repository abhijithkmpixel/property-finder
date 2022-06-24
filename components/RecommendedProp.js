import Link from "next/link";
import React, { useEffect, useState } from "react";

const RecommendedProp = ({ title, list, agents, filter }) => {
  const [filtered, setfiltered] = useState(list);
  useEffect(() => {
    // console.log(list);

    return () => {};
  }, [filtered]);

  const filterPorps = (e) => {
    switch (e.target.value) {
      case "all":
        setfiltered(list);
        break;
      case "sale":
        setfiltered(list?.filter((p) => p.serviceType == "sale"));
        break;
      case "rent":
        setfiltered(list?.filter((p) => p.serviceType == "rent"));
        break;
      case "commercial-sale":
        setfiltered(list?.filter((p) => p.serviceType == "commercial-sale"));
        break;
      case "commercial-rent":
        setfiltered(list?.filter((p) => p.serviceType == "commercial-rent"));
        break;
    }
    // console.log(filtered);
  };
  return (
    <section className="recc_prop_section">
      <div className="container">
        <div className="title_wrp d-flex justify-content-between w-100 align-items-center">
          {title && <h5>{title}</h5>}
          {filter && (
            <div className="div">
              <b className="text-lg-start fs-4 m-3">({filtered.length})</b>
              <select
                name="options"
                id="options"
                className=" mt-3 justify-self-end border border-danger form-select-lg  btn-outline-danger fs-4"
                onChange={(e) => filterPorps(e)}
              >
                <option value="all">All</option>
                <option value="rent">Rent</option>
                <option value="sale">Sale</option>
                <option value="commercial-sale">Commercial sale</option>
                <option value="commercial-rent">Commercial rent</option>
              </select>
            </div>
          )}
        </div>
        <div className="reommended_props_offgrid">
          <div className="row">
            {filtered && filtered.length > 0
              ? filtered?.map((prop, index) => {
                  return (
                    <div
                      className={`col-12 col-md-6 ${
                        index % 2 == 0 ? "bigone" : ""
                      }`}
                      key={prop.id}
                    >
                      <Link href={`/details/` + prop.slug}>
                        <a>
                          <div className="prop_col_card">
                            <div className="prop_img">
                              <img src={prop.images} alt={prop.title} />
                              <div className="builder_logo">
                                {agents?.map((a) => {
                                  if (
                                    a.info_slug.toString() ==
                                    prop.agent.toString()
                                  ) {
                                    return (
                                      <img
                                        src={a.company.company_image}
                                        alt={a.company.name}
                                      />
                                    );
                                  }
                                })}
                              </div>
                              <div className="hover_card">
                                <div>
                                  <h5>{prop.title}</h5>
                                  <span>See more info...</span>
                                </div>
                              </div>
                            </div>
                            <div className="body_coopy">
                              <h4>{prop.location} </h4>
                              <div className="card_footer">
                                <div>
                                  <span>{prop.propertyType}</span>
                                  <span>
                                    <b>{prop.propertySize}</b> sq.ft
                                  </span>
                                </div>
                                <div>
                                  {prop.bedroom !== "0" && (
                                    <span>
                                      {" "}
                                      <b>{prop.bedroom}</b> Bed
                                    </span>
                                  )}
                                  {prop.bathroom !== "0" && (
                                    <span>
                                      {" "}
                                      <b>{prop.bathroom}</b> Bath
                                    </span>
                                  )}
                                </div>
                                {/* <span className="price">{prop.price} AED</span> */}
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

        {filtered?.length == 0 && <h4>No listing found</h4>}
      </div>
    </section>
  );
};

export default RecommendedProp;
