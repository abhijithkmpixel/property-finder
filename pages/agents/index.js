import React from "react";
import Header from "../../components/Header";
import Link from "next/link";
import HeadTag from "../../components/Head";
import { api } from "../api/auth/api";
import Footer from "../../components/Footer";
import AgentVIdeoBanner from "../../components/banners/AgentVIdeoBanner";
import WhatAreYouLookingFor from "../../components/WhatAreYouLookingFor";
import AgentsPageListing from "../../components/AgentsPageListing";
const index = ({ agents }) => {
  return (
    <>
    <HeadTag title='All agents' meta='list of all the agents in the system' />
    <Header innerpage={true}/>
    <AgentVIdeoBanner />
    <WhatAreYouLookingFor />
  <AgentsPageListing agents={agents}/>
      <Footer/>
    </>
  );
};

export default index;

export async function getServerSideProps(context) {
  var agents = "";

  await api(`/api/agents`)
    .then((response) => agents = response.data)
    
  return {
    props: {
      agents: agents,
    },
  };
}
