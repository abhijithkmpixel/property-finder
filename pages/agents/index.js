import React from "react";
import Header from "../../components/Header";
import Link from "next/link";
import HeadTag from "../../components/Head";
import { api } from "../api/auth/api";
import Footer from "../../components/Footer";
import AgentVIdeoBanner from "../../components/banners/AgentVIdeoBanner";
import WhatAreYouLookingFor from "../../components/WhatAreYouLookingFor";
import AgentsPageListing from "../../components/AgentsPageListing";
import { useRouter } from "next/router";
import GettingStarted from "../../components/static page components/GettingStarted";
const index = ({ agents }) => {
  return (
    <>
      <HeadTag
        title="Agents"
        meta="Find great properties from the top real estate agents in India verified by Find homes"
        keyword={"Agents,real estate,best property finder"}
      />
      <Header innerpage={true} />
      <AgentVIdeoBanner />
      <WhatAreYouLookingFor />
      <AgentsPageListing agents={agents} />
      <GettingStarted />
      <Footer />
    </>
  );
};

export default index;

export async function getServerSideProps(context) {
  var agents = "";

  await api(`/api/agents`).then((response) => (agents = response.data));

  return {
    props: {
      agents: agents,
    },
  };
}
