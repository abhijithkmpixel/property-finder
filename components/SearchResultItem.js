import React from "react";
import Link from "next/link";

const SearchResultItem = ({ property }) => {
  return (
    <Link href={`/details/` + property?.slug} as={`/details/` + property?.slug}>
      <a>
        <div className="prop_search_result_card border p-3">
          <div className="prop_img">
            <img src={property?.images} alt="proprty image" />
            {/* <div className="builder_logo">
            <img src="/b.jpg" alt="builder logo" />
          </div> */}
          </div>
          <div className="body_coopy">
            <h4>
              <span>{property?.price}</span> AED/{" "}
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
                <span><b>{property?.propertySize}</b> Sq.ft.</span>
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
            <h6>{property.location} , {property.state}</h6>
            
          </div>
        </div>
      </a>
    </Link>
  );
};

export default SearchResultItem;
