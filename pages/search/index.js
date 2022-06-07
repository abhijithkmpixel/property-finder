import { async, jsonEval } from "@firebase/util";
import { doc } from "firebase/firestore/lite";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import RecommendedProp from "../../components/RecommendedProp";
import Link from "next/link";
import SearchResultItem from "../../components/SearchResultItem";
import HeadTag from "../../components/Head";
import AdvSearch from "../../components/AdvSearch";

const index = ({ props, type }) => {
  const slug = useRouter();
  const [propertys, setpropertys] = useState(null);
  useEffect(() => {
    // console.log(props);
  }, []);

  return (
    <div>
      <HeadTag title="Search results" meta={'search result for given parameters'} />
      <Header />

      <section className="mt-5 mb-5">
        <div className="container">
          <AdvSearch />
        </div>
      </section>
      <section className="recc_prop_section">
        <div className="container">
          <h1 className="mb-4">Properties for {type.replace('-',' ')}</h1>
          <div className="row">
            {props && props !== [""] ? (
              props?.map((prop) => {
                return (
                  <div className="col-12" key={prop?.id}>
                    <SearchResultItem property={prop} />
                  </div>
                );
              })
            ) : (
              <img
                src="/loading-loading-forever.gif"
                alt="loading"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "contain",
                  margin: "auto",
                }}
              />
            )}
              </div>
            {
            props.length == 0 && <h1>No results found</h1>
            }
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
    if (
      (slug?.property_type ? prop.propertyType == slug?.property_type : true) &&
      (slug?.min_area ? Number(prop.propertySize) >= slug?.min_area : true) &&
      (slug?.max_area ? Number(prop.propertySize) <= slug?.max_area : true) &&
      (slug?.min_rent ? Number(prop.price) >= slug?.min_rent : true) &&
      (slug?.max_rent ? Number(prop.price) <= slug?.max_rent : true) &&
      (slug?.min_price ? Number(prop.price) >= slug?.min_price : true) &&
      (slug?.max_price ? Number(prop.price) <= slug?.max_price : true) &&
      (slug?.rent_duration
        ? prop.period.toString() == slug?.rent_duration.toString()
        : true)
    ) {
      return prop;
    }
  });

  return {
    props: {
      props: newProp,
      type: query.type,
    },
  };
}
