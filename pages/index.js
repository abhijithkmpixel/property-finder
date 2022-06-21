import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect } from "react";
import HeadTag from "../components/Head";
import Header from "../components/Header";
import HomeBanner from "../components/HomeBanner";
import PageLoader from "../components/PageLoader";
import RecommendedProp from "../components/RecommendedProp";
import styles from "../public/styles/Home.module.css";
import { api } from "./api/auth/api";
import { LogContext } from "./api/auth/logContext";
import { useLogContaxt } from "./api/auth/logContext";
export default function Home({ propList, agents, locs }) {
  useEffect(() => {
    // console.log(logs);

    return () => {};
  }, []);

  return (
    <>
      <Header />
      <HeadTag title={"Property finder"} meta="listing" />
      <HomeBanner locs={locs} />
      <RecommendedProp
        title="Recommended properties"
        list={propList}
        agents={agents}
        filter={false}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const data = await api("/api/recommended")
    // .then((res) => res.json())
    .then((res) => {
      return res.data;
    });

  const agents = await fetch(process.env.API_DOMAIN_URL + "/api/agents")
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

  const locations = await fetch(process.env.API_DOMAIN_URL + "/api/locations")
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
  return {
    props: {
      propList: data,
      agents: agents,
      locs: locations,
    },
  };
}
