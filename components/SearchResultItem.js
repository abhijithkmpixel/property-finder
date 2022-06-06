import React from 'react'
import Link from "next/link";

const SearchResultItem = ({property}) => {
  return (
    <Link href={`/details/` + property?.slug} as={`/details/` + property?.slug}>
    <a >
      <div className="prop_search_result_card">
        <div className="prop_img">
          <img src={property?.images} alt="proprty image" />
          {/* <div className="builder_logo">
            <img src="/b.jpg" alt="builder logo" />
          </div> */}
        </div>
        <div className="body_coopy">
          <h4>{property?.price} AED/ {property?.period == 'm'? 'Monthly':'Yearly'}</h4>
          <h3>{property?.tags}</h3>
          <div className="card_footer">
            <span>{property?.propertyType}</span>
            <span>{property?.propertySize} Sq.ft.</span>

            <span> {property?.bedroom} Bed</span>
            <span> {property?.bathroom} Bath</span>
            {/* <span className="price">{property?.price} AED</span> */}
          </div>
          <h6>{property.location}</h6>
        </div>
      </div>
    </a>
    </Link>
  )
}

export default SearchResultItem