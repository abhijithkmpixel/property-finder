import { async, jsonEval } from "@firebase/util";
import { doc } from "firebase/firestore/lite";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import RecommendedProp from "../../components/RecommendedProp";
import Link from "next/link";
import SearchResultItem from "../../components/SearchResultItem";
import HeadTag from "../../components/Head";
import AdvSearch from "../../components/forms/AdvSearch";
import Paginate from "../../components/Paginate";

const index = ({ props, type, locs }) => {
  const slug = useRouter();
  // const [propertys, setpropertys] = useState(null);
  const [currentItems, setCurrentItems] = useState();
  const [pageCount, setPageCount] = useState(1);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemsPerPage, setitemsPerPage] = useState(8)
  const [itemOffset, setItemOffset] = useState(0);

useEffect(() => {
  // Fetch items from another resources.
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  setCurrentItems(props.slice(itemOffset, endOffset));
  setPageCount(Math.ceil(props.length / itemsPerPage));

}, [itemOffset, itemsPerPage,props]);



  return (
    <div>
      <HeadTag
        title="Search results"
        meta={"search result for given parameters"}
      />
      <Header />

      <section className="mt-5 mb-5">
        <div className="container">
          <AdvSearch locs={locs} />
        </div>
      </section>
      <section className="recc_prop_section">
        <div className="container">
          <div className="inner_wrap">
            <h1 className="mb-4">
              {type == "all"
                ? "All properties"
                : `Properties for ${type.replace("-", " ")}`}{" "}
            </h1>
            {props && props.length !== 0 && (
              <div className="row">
                {currentItems?.map((prop) => {
                  return (
                    <div className="col-8" key={prop?.id}>
                      <SearchResultItem property={prop} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <Paginate  itemsPerPage={itemsPerPage} pageCount={pageCount} items={props} setItemOffset={setItemOffset}/>
          {props.length == 0 && <h1>No results found</h1>}
        </div>
      </section>
    </div>
  );
};

export default index;

export async function getServerSideProps(context) {
  const slug = context.query;
  const { req, params, query } = context;
  var propert = "";
  await fetch(`http://` + context.req.headers.host + `/api/` + slug.type)
    .then((response) => response.json())
    .then((json) => {
      propert = json;
    });
  const newProp = propert.filter((prop) => {
    console.log(prop.location + "+" + slug?.location);
    if (
      (slug?.property_type ? prop.propertyType == slug?.property_type : true) &&
      (slug?.min_area ? Number(prop.propertySize) >= slug?.min_area : true) &&
      (slug?.max_area ? Number(prop.propertySize) <= slug?.max_area : true) &&
      (slug?.min_rent ? Number(prop.price) >= slug?.min_rent : true) &&
      (slug?.max_rent ? Number(prop.price) <= slug?.max_rent : true) &&
      (slug?.min_price ? Number(prop.price) >= slug?.min_price : true) &&
      (slug?.max_price ? Number(prop.price) <= slug?.max_price : true) &&
      (slug?.location ? prop.location == slug?.location : true) &&
      (slug?.rent_duration
        ? prop.period.toString() == slug?.rent_duration.toString()
        : true)
    ) {
      return prop;
    }
  });
  //for getting the locations list
  const locations = await fetch(
    `http://` + context.req.headers.host + "/api/locations"
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

  return {
    props: {
      props: newProp,
      type: query.type,
      locs: locations,
    },
  };
}
