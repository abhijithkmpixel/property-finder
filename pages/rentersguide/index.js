import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import EditorDiv from "../../components/forms/Editor";
import HeadTag from "../../components/Head";
import Header from "../../components/Header";
import GuidesBody from "../../components/static page components/GuidesBody";
import StaticBanner from "../../components/static page components/StaticBanner";
import { api } from "../api/auth/api";
import { db } from "../api/firebase";
const index = ({ data }) => {
  useEffect(() => {
    // console.log(data);
    return () => {};
  }, [data]);

  return (
    <>
      <HeadTag title="Renter's Guide" meta="a guide for fellow renters" />
      <Header innerpage={true}/>
      <StaticBanner banner={data?.banner} />
      {/* <EditorDiv /> */}
      <GuidesBody body={data?.body_copy} />
      <Footer/>

    </>
  );
};

export default index;
export async function getServerSideProps(context) {
  const { req, query, params } = context;
  const data = await api
    .get("/api/renterguide")
    .then((res) => {
      return res.data;
    });

  return {
    props: {
      data: data,
    },
  };
}
