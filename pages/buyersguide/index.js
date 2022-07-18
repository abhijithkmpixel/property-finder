import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
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
      <HeadTag title="Buyers's Guide" meta="Find Homes is an innovative real estate company that helps to find the perfect home for you.best property finder site in india" keyword={'A guide for learning to buy a property in india ,How to rent a house'} image={'/rent.jpeg'} />
      <Header innerpage={true}/>
      <StaticBanner banner={data?.banner} image={'/rent.jpeg'} />
      <GuidesBody body={data?.body_copy} />
      <Footer/>

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
