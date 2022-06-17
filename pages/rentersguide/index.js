import React, { useEffect, useState } from "react";
import EditorDiv from "../../components/forms/Editor";
import HeadTag from "../../components/Head";
import Header from "../../components/Header";
import GuidesBody from "../../components/static page components/GuidesBody";
import StaticBanner from "../../components/static page components/StaticBanner";
import { db } from "../api/firebase";
const index = ({data}) => {
  useEffect(() => {
// console.log(data);
    return () => {};
  }, [data]);

  return (
    <>
      <HeadTag title="Renter's Guide" meta="a guide for fellow renters" />
      <Header />
      <StaticBanner banner={data?.banner} />
      {/* <EditorDiv /> */}
      <GuidesBody body={data?.body_copy}/>
    </>
  );
};

export default index;
export async function getServerSideProps(context) {
  const {req,query,params} = context;
  const data = await fetch(
    process.env.API_DOMAIN_URL + "/api/renterguide"
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

  return {
    props: {
      data: data
    },
  };
}
