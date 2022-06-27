import React, { useEffect, useState } from "react";
import HeadTag from "../../components/Head";
import Header from "../../components/Header";
import Link from "next/link";
import RecommendedProp from "../../components/RecommendedProp";
import { api } from "../api/auth/api";
import Footer from "../../components/Footer";
import AgentProperties from "../../components/AgentProperties";
const index = ({ agent, count }) => {
  return (
    <>
      <HeadTag title={agent.name} meta={`${agent.position}`} />
      <Header innerpage={true}/>
      <section className="agent_details">
        <div className="container">
          <div className="inner">
            <div className="agent_img">
              <img src={agent?.image} alt={agent?.name} />
            </div>
            <div className="body_copy">
              <h3>
                {" "}
                <span className="fw-bold">Name :</span> {agent.name}
              </h3>
              <h4>
                {" "}
                <span className="fw-bold">Position :</span> {agent.position}
              </h4>
              <h4>
                {" "}
                <span className="fw-bold">Nationality :</span>{" "}
                {agent.nationality}
              </h4>
              <h4>
                {" "}
                <span className="fw-bold">Languages :</span> {agent.languages}
              </h4>
              <h4>
                {" "}
                <span className="fw-bold">Listed properties :</span>{" "}
                {count.length}
              </h4>

              <div className="col-12" key={agent.id}>
                <div className="card" style={{ width: "100%;" }}>
                  <img
                    src={agent.company.company_image}
                    className="card-img-top"
                    alt={agent.company.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{agent.company.name}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
             {agent?.about_me &&  <div className="about_me"> <h4>About me</h4> <p>{agent.about_me}</p></div>}
          {/* <RecommendedProp title={"My properties"} list={count} filter={true} /> */}
        </div>
      </section>
          <AgentProperties  title={"My properties"} list={count} filter={true}/>
      <Footer/>

    </>
  );
};

export default index;

export async function getServerSideProps(context) {
  const { req, params, query } = context;
  var agents = "";
  await api
    .get(`/api/agents`)
    .then((response) =>{agents = response.data;})
    
  var props = "";

  await api
    .get(`/api/all`)
    .then((response) =>{props = response.data;})
    
  const agent = agents.filter((age) => age.info_slug == params.slug);
  var count = props?.filter((p) => {
    if (p.agent == agent[0].info_slug) {
      return p;
    }
  });
  return {
    props: {
      agent: agent[0],
      count: count,
    },
  };
}
