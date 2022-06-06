import { async, jsonEval } from "@firebase/util";
import { doc } from "firebase/firestore/lite";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import RecommendedProp from "../../components/RecommendedProp";
import Link from "next/link";
import SearchResultItem from "../../components/SearchResultItem";

const index = ({ props }) => {
  const slug = useRouter();
  const [propertys, setpropertys] = useState(null);
  useEffect(() => {
    console.log(props);
    // getData();
    // return null;
  }, []);

  const getData = async () => {
    await fetch(`api/${slug?.query?.type}`)
      .then((response) => response.json())
      .then((json) => {
        setpropertys(json);
      });
  };

  return (
    <div>
      <Header />

      <section className="recc_prop_section">
        <div className="container">
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
        </div>
      </section>
    </div>
  );
};

export default index;

export async function getServerSideProps(context) {
  const slug = context.query;
  var propert = "";

  await fetch(`http://` + context.req.headers.host + `/api/` + slug.type)
    .then((response) => response.json())
    .then((json) => {
      propert = json;
    });
  const newProp = propert.filter((prop) => {
    if((slug?.property_type
      ? prop.propertyType == slug?.property_type
      : true) &&
      (slug?.min_area
        ? Number(prop.propertySize) >= slug?.min_area
        : true) &&
      (slug?.max_area
        ? Number(prop.propertySize) <= slug?.max_area
        : true) &&
      (slug?.min_rent
        ? Number(prop.price) >= slug?.min_rent
        : true) &&
      (slug?.max_rent
        ? Number(prop.price) <= slug?.max_rent
        : true) &&
      (slug?.min_price
        ? Number(prop.price) >= slug?.min_price
        : true) &&
      (slug?.max_price
        ? Number(prop.price) <= slug?.max_price
        : true) &&
      (slug?.rent_duration
        ? prop.period.toString() == slug?.rent_duration.toString()
        : true)){
          return prop
        }
  });

  return {
    props: {
      props: newProp,
    },
  };
}
