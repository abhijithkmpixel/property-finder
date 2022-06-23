import React, { useEffect, useState } from "react";
import HeadTag from "../../components/Head";
import Header from "../../components/Header";
import GuidesBody from "../../components/static page components/GuidesBody";
import StaticBanner from "../../components/static page components/StaticBanner";
import { api } from "../api/auth/api";
import { db } from "../api/firebase";
const index = ({ data }) => {
  useEffect(() => {
    console.log(data);
    return () => {};
  }, [data]);

  return (
    <>
      <HeadTag title="Buyers's Guide" meta="a guide for fellow buyers" />
      <Header />
      <StaticBanner banner={data?.banner} />
      <GuidesBody body={data?.body_copy} />
    </>
  );
};

export default index;
export async function getServerSideProps(context) {
  const { req, query, params } = context;
  const data = await api.get("/api/buyersguide")
    .then((res) => {
      return res.data;
    });

  return {
    props: {
      data: data,
    },
  };
}
