import React from 'react'
import Link from 'next/link';
const RecommendedPropSidebar = ({recommendedProps}) => {
  return (
    <div className="suggested_props_sidebar">
    <h3>Recommended properties</h3>
    <ul>
      {recommendedProps?.map((p, index) => {
        return (
          <li className="prop_list_item" key={index}>
            <Link href={`/details/${p?.slug}`}>
              <a>
                <img src={p?.images[0]} alt={p?.title} />
                <div className="body_content">
                  <h6>{p?.tags}</h6>
                  <p>
                    {p?.location} {p?.state}
                  </p>
                </div>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
  )
}

export default RecommendedPropSidebar