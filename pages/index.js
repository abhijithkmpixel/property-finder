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
      {
        locs && 
      <HomeBanner locs={locs} />
      }
      {
        propList && agents ?
        <RecommendedProp
          title="Recommended properties"
          list={propList}
          agents={agents}
          filter={false}
        />: null
      }
    </>
  );
}

export async function getServerSideProps(context) {
  const data = await api.get("/api/recommended")
    // .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
// console.log(data);
  const agents = await api.get("/api/agents")
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

  const locations = await api.get("/api/locations")
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
