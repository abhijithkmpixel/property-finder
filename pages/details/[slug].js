import { collection, getDocs } from "firebase/firestore/lite";
import React, { useEffect } from "react";
import HeadTag from "../../components/Head";
import Header from "../../components/Header";
import { db } from "../api/firebase";
import Link from "next/link";
import { api } from "../api/auth/api";
import AOS from "aos";
import Footer from "../../components/Footer";

const index = ({ data, agent }) => {
  useEffect(() => {
    // console.log(agent);
    AOS.init();
    AOS.refresh();
    return () => {};
  }, []);

  return (
    <>
      <HeadTag title={data.title} meta={data.tags} />
      <Header innerpage={true} />
      <section className="section_prop_details">
        <div className="prop_detail_banner">
          <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-5 pb-4">
                <li class="breadcrumb-item fs-5 text-light">
                  <Link className="text-light" href="/">
                    Home
                  </Link>
                </li>
                <li class="breadcrumb-item fs-5 text-light">
                  <Link href="/search?type=all">Property</Link>
                </li>
                <li
                  className="breadcrumb-item active fs-5 text-light"
                  aria-current="page"
                >
                  {data.title}
                </li>
              </ol>
            </nav>

            <div
              className="prop_image_wr"
              data-aos="fade-up"
              data-aos-duration="900"
              data-aos-delay="300"
            >
              <img src={data.images} alt={data.title} />
              <ul
                className="points_wrp"
                data-aos="fade-right"
                data-aos-duration="900"
                data-aos-delay="700"
              >
                <li>
                  <h5>Property size:</h5>
                  <span>{data.propertySize} Sq.Ft.</span>
                </li>
                <li>
                  <h5>Property type:</h5>
                  <span>{data.propertyType} </span>
                </li>
                <li>
                  <h5>Location:</h5>
                  <span>{data.location} </span>
                </li>

                <div className="pt-5 pb-5"></div>

                <a
                  href="tel:8111836280"
                  className="btn btn-danger btn-lg text-center w-100 mb-4"
                >
                  CALL NOW 8111836280
                </a>
                <button className="btn btn-green btn-lg text-center w-100 mb-4">
                  REQUEST A VIEWING
                </button>
                <a
                  href="https://wa.me/918111836280"
                  target={"_blank"}
                  className="btn btn-success btn-lg text-center w-100 "
                >
                  <img src="/whatsapp.png" alt="" /> Whatsapp
                </a>
              </ul>
            </div>
            <div className="body_copy">
              <div className="row">
                <div
                  className="col-12 col-lg-8"
                  data-aos="fade-up"
                  data-aos-duration="900"
                  data-aos-delay="900"
                >
                  <h4>{data.title}</h4>
                  <h1>{data.tags}</h1>
                </div>
                <div
                  className="col-12 col-lg-4"
                  data-aos="fade-up"
                  data-aos-duration="900"
                  data-aos-delay="900"
                >
                  <ul className="row inner_sidebar">
                    <li className="col-12">
                      {/* <h5>Price:</h5> */}
                      <span>
                        {data.price} AED /{" "}
                        {data.period == "m" ? "Monthly" : "Yearly"}
                      </span>
                    </li>
                    {data.bedroom !== "0" && (
                      <li className="col-6">
                        <h5>
                          <img src="/bedroom.png" alt="bedroom" />
                        </h5>
                        <span>{data.bedroom} </span>
                      </li>
                    )}
                    {data.bathroom !== "0" && (
                      <li className="col-6">
                        <h5>
                          <img src="/bathroom.png" alt="bathroom" />
                        </h5>
                        <span>{data.bathroom}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              {/* <p>{data.description}</p> */}
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: data.description }}
              ></div>
              <div className="row">
                <div className="col-12 col-lg-7">
                  <Link href={`/agents/` + agent?.info_slug}>
                    <a>
                      <div
                        className="card mb-5 mt-5"
                        style={{ maxWidth: "540px" }}
                      >
                        <div className="row g-0">
                          <div className="col-md-4">
                            <img
                              src={agent?.image}
                              className="img-fluid rounded-start"
                              alt={agent?.name}
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <h5 className="card-title">{agent?.name}</h5>
                              <p className="card-text">
                                Position : {agent?.position}
                              </p>
                              <p className="card-text">
                                Company : {agent?.company.name}
                              </p>
                              <p className="card-text">
                                <small className="text-muted">
                                  <img
                                    src={agent?.company.company_image}
                                    style={{ maxWidth: 100 }}
                                    alt=""
                                  />
                                </small>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="col-12 col-lg-5">
                  {data?.facilities && data?.facilities.length > 0 ? (
                    <ul className="facilities">
                      <h6>Facilities</h6>
                      {data?.facilities.map((f, index) => {
                        return <li key={index}>{f}</li>;
                      })}
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default index;
export async function getServerSideProps(context) {
  const slug = context.params;
  const collectionRef = collection(db, "properties");
  const datarr = await getDocs(collectionRef);
  const datas = datarr.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });
  const filter = datas.filter((data) => data.slug == slug.slug);
  const agents = await api.get("/api/agents").then((res) => {
    // console.log(res.data);
    return res.data;
  });
  const agent = agents?.filter((a) => {
    if (a.info_slug.toString() == filter[0].agent) {
      return a;
    }
  });
  // console.log(filter[0]);
  return {
    props: {
      data: filter[0],
      agent: agent[0],
    },
  };
}
