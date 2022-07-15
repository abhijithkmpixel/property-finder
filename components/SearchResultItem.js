import React from "react";
import Link from "next/link";
import CurrencyFormat from "react-currency-format";
import Slider from "react-slick";

const SearchResultItem = ({ property }) => {
  var settings = {
    // dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    fade: false,
    autoplay: false,
    // autoplaySpeed: 6000,
    pauseOnHover: false,
    slidesToScroll: 1,
    // customPaging: function (i) {
    //   return (
    //     <div className="thumbs">
    //       <img src={data?.images[i]} alt="" />
    //     </div>
    //   );
    // },
  };
  return (
    <Link href={`/details/` + property?.slug} as={`/details/` + property?.slug}>
      <a>
        <div className="prop_search_result_card border p-3">
          <div className="prop_img" onClick={(e)=>{e.stopPropagation()}}>
          <Slider {...settings} >
              {property?.images?.map((img,index) => {
                return <img src={img} alt={property?.title} key={index} />;
              })}
            </Slider>
            {/* <img src={property?.images} alt="proprty image" /> */}

            {/* <div className="builder_logo">
            <img src="/b.jpg" alt="builder logo" />
          </div> */}
          </div>
          <div className="body_coopy">
            {property?.verified && property?.verified == true ? (
              <div
                className="d-flex align-items-center fs-4 text-dark mb-3 float-end"
                role="alert"
              >
                <img
                  src="http://getdrawings.com/free-icon/facebook-verified-icon-70.png"
                  style={{ width: "20px", height: "20px", marginRight: "9px" }}
                  alt=""
                />
                Verified
              </div>
            ) : null}
            <h4>
              <span>
                <CurrencyFormat
                  value={property?.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix="₹ "
                  // format={'##,##,##,##,##,##,###'}
                />
              </span>{" "}
              /{" "}
              {property?.period == "m" && property?.period !== "0"
                ? "Monthly"
                : null}
              {property?.period == "y" && property?.period !== "0"
                ? "Yearly"
                : null}
              {property?.period == "0" ? "One time" : null}
            </h4>
            <h3>{property?.tags}</h3>
            <div className="card_footer d-flex justify-content-between">
              <div>
                <span>{property?.propertyType}</span>
                <span>
                  <b>{property?.propertySize}</b> Sq.ft.
                </span>
              </div>
              <div>
                {property?.bedroom !== "0" && (
                  <span>
                    <b>{property?.bedroom}</b> Bed
                  </span>
                )}
                {property?.bathroom !== "0" && (
                  <span>
                    <b> {property?.bathroom}</b> Bath
                  </span>
                )}
              </div>
              {/* <span className="price">{property?.price} AED</span> */}
            </div>
            <h6>
              {property.location} , {property.state}
            </h6>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default SearchResultItem;
