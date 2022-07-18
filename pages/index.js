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
import GettingStarted from "../components/static page components/GettingStarted";
import Testimonials from "../components/static page components/Testimonials";

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
      <HeadTag title={"Find homes"} meta="Find Homes is an innovative real estate company that helps to find the perfect home for you.best property finder site in india" keyword={'Best property finder site in india, user friendly,highly rated'} />
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
      <GettingStarted/>
      <Testimonials />
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
