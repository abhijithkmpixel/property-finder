import { collection, getDocs } from "firebase/firestore/lite";
import React, { useEffect, useRef, useState } from "react";
import HeadTag from "../../components/Head";
import Header from "../../components/Header";
import { db } from "../api/firebase";
import Link from "next/link";
import { api } from "../api/auth/api";
import AOS from "aos";
import Footer from "../../components/Footer";
import Slider from "react-slick";
import PropertyEnquiryForm from "../../components/forms/PropertyEnquiryForm";
import CurrencyFormat from "react-currency-format";

const index = ({ data, agent }) => {
  const mainSlider = useRef();
  const thumbSlider = useRef();
  const [openMailer, setopenMailer] = useState(false);

  useEffect(() => {
    // console.log(agent);
    AOS.init({
      offset: 100,
    });
    AOS.refresh();
    return () => {};
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: false,
    slidesToScroll: 1,
    customPaging: function (i) {
      return (
        <div className="thumbs">
          <img src={data?.images[i]} alt="" />
        </div>
      );
    },
  };

  return (
    <>
      <HeadTag title={data.title} meta={data.tags} />
      <Header innerpage={true} />
      {openMailer && (
        <PropertyEnquiryForm
          prop={data}
          email={agent?.email}
          setopenMailer={setopenMailer}
        />
      )}
      <section className="section_prop_details">
        <div className="prop_detail_banner">
          <div
            className="prop_image_wr"
            data-aos="fade-up"
            data-aos-duration="900"
            data-aos-delay="300"
          >
            <Slider {...settings} ref={mainSlider}>
              {data.images?.map((img) => {
                return <img src={img} alt={data.title} />;
              })}
            </Slider>
            {/* <img src={data.images} alt={data.title} /> */}
          </div>
          <div className="container">
            {/* </div> */}

            <div className="body_copy">
              <div className="row">
                <div
                  className="col-12 col-lg-8"
                  data-aos="fade-up"
                  data-aos-duration="900"
                  data-aos-delay="100"
                >
                  <h4>{data.title}</h4>
                  <h1>{data.tags}</h1>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      {data?.facilities && data?.facilities.length > 0 ? (
                        <div className="facilities">
                          <h6>Facilities</h6>
                          <ul className="">
                            {data?.facilities.map((f, index) => {
                              return <li key={index}>{f}</li>;
                            })}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                    <div className="col-12 col-md-6">
                      {console.log(data?.amenities)}
                      {data?.amenities ? (
                        <div className="facilities">
                          <h6>Amenities</h6>
                          <ul className="">
                            {data?.amenities?.maids_room == true && (
                              <li>Maids room</li>
                            )}
                            {data?.amenities?.Central_ac == true && (
                              <li>Central A/C and Heater</li>
                            )}
                            {data?.amenities?.balcony == true && (
                              <li>Balcony</li>
                            )}
                            {data?.amenities?.cctv == true && (
                              <li>CCTV security</li>
                            )}
                            {data?.amenities?.electricity_backup == true && (
                              <li>Electricity backup</li>
                            )}
                            {data?.amenities?.garden == true && <li>Garden</li>}
                            {data?.amenities?.gym == true && (
                              <li>Gym & Fitness area</li>
                            )}
                            {data?.amenities?.laundry_room == true && (
                              <li>Laundry rom</li>
                            )}
                            {data?.amenities?.pool == true && (
                              <li>Swimming pool</li>
                            )}
                            {data?.amenities?.study == true && (
                              <li>Study room</li>
                            )}
                            {data?.amenities?.waste == true && (
                              <li>Waste disposal facility</li>
                            )}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="description">
                    <h3>Description</h3>
                    <div
                      className="body"
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    ></div>
                  </div>
                </div>
                <div
                  className="col-12 col-lg-4"
                  data-aos="fade-up"
                  data-aos-duration="900"
                  data-aos-delay="100"
                >
                  <ul className="row inner_sidebar">
                    <li className="col-12">
                      {/* <h5>Price:</h5> */}
                      <span>
                        <CurrencyFormat
                          value={data.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          // format={'##,##,##,##,##,##,###'}
                        />
                         AED /{" "}
                        {data?.period == "m" && data?.period !== "0"
                          ? "Monthly"
                          : null}
                        {data?.period == "y" && data?.period !== "0"
                          ? "Yearly"
                          : null}
                        {data?.period == "0" ? "One time" : null}
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
                  <ul
                    className="points_wrp"
                    data-aos="fade-up"
                    data-aos-duration="900"
                    data-aos-delay="100"
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
                      <span>
                        {data?.address}, {data?.location}, {data?.pincode},{" "}
                        {data?.state}
                      </span>
                    </li>

                    {/* <div className="pt-5 pb-5"></div> */}
                  </ul>
                  <Link href={`/agents/` + agent?.info_slug}>
                    <a>
                      <div
                        className="card mb-5 mt-5 agent_card"
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
                            <div className="card-body ">
                              <p className="card-text">
                                <small className="text-muted">
                                  <img
                                    src={agent?.company.company_image}
                                    style={{ maxWidth: 100 }}
                                    alt=""
                                  />
                                </small>
                              </p>
                              <p className="card-text">{agent?.company.name}</p>
                              <h5 className="card-title">{agent?.name}</h5>
                              <p className="card-text">
                                Position : {agent?.position}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                  <div className="points_wrp position-sticky">
                    <a
                      href={`tel:${agent?.mobile}`}
                      className="btn btn-danger btn-lg text-center w-100 mb-4"
                    >
                      CALL NOW {agent?.mobile}
                    </a>
                    <button
                      className="btn btn-green btn-lg text-center w-100 mb-4"
                      onClick={(e) => setopenMailer(true)}
                    >
                      REQUEST A VIEWING
                    </button>
                    <a
                      href={`https://wa.me/91${agent?.mobile}`}
                      target={"_blank"}
                      className="btn btn-success btn-lg text-center w-100 "
                    >
                      <img src="/whatsapp.png" alt="" /> Whatsapp
                    </a>
                  </div>
                </div>
                {/* <div className="row"></div>
                <div className="col-12 col-lg-8">
                 
                </div>
                <div className="col-12 col-lg-4">
              
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default index;
export async function getServerSideProps(context) {
  const { req, query, params } = context;

  const data = await api.get(`/api/all/${query.slug}`).then((res) => {
    return res.data;
  });
  const agents = await api.get(`/api/agents/${data[0].agent}`).then((res) => {
    return res.data;
  });
  // const agents = await api.get("/api/agents").then((res) => {
  //   // console.log(res.data);
  //   return res.data;
  // });
  // const agent = agents?.filter((a) => {
  //   if (a.info_slug.toString() == data[0].agent) {
  //     return a;
  //   }
  // });
  return {
    props: {
      data: data[0],
      agent: agents[0],
    },
  };
}
