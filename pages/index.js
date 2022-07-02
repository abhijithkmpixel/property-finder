import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect } from "react";
import HeadTag from "../components/Head";
import Header from "../components/Header";
import HomeBanner from "../components/banners/HomeBanner";
import PageLoader from "../components/PageLoader";
import RecommendedProp from "../components/RecommendedProp";
import styles from "../public/styles/Home.module.css";
import { api } from "./api/auth/api";
import { LogContext } from "./api/auth/logContext";
import { useLogContaxt } from "./api/auth/logContext";
import AOS from "aos";
import Footer from "../components/Footer";
import WhatAreYouLookingFor from "../components/WhatAreYouLookingFor";
import GuidesAndArticlesBlock from "../components/static page components/GuidesAndArticlesBlock";

export default function Home({ propList, agents, locs }) {

  useEffect(() => {
    // console.log(logs);
    AOS.init({
      offset:100

    });
    AOS.refresh();
    return () => {};
  }, []);

  return (
    <>
      <Header />
      {/* <PageLoader/> */}
      <HeadTag title={"Find homes"} meta="Homepage of find homes ,your companion on finding the best properties for you" />
      {
        locs && 
      <HomeBanner locs={locs} />
      }
      <WhatAreYouLookingFor />
      <GuidesAndArticlesBlock />
      {
        propList && agents ?
        <RecommendedProp
          title="Properties we recommend"
          list={propList}
          agents={agents}
          filter={false}
        />: null
      }
      <Footer/>

    </>
  );
}

export async function getServerSideProps(context) {
  const data = await api.get("/api/recommended")
    .then((res) => {
      return res.data;
    });
// console.log(data);
  const agents = await api.get("/api/agents")
    .then((res) => {
      return res.data;
    });

  const locations = await api.get("/api/locations")
  .then((res) => {
    return res.data;
  });
  return {
    props: {
      propList: data,
      agents: agents,
      locs: locations,
    },
  };
}
