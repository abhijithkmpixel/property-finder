import React from "react";
import Header from "../../components/Header";
import Link from "next/link";
import HeadTag from "../../components/Head";
const index = ({ agents }) => {
  return (
    <>
    <HeadTag title='All agents' meta='list of all the agents in the system' />
      <Header />
      <section className="agents_listing_grid">
        <div className="container">
          {/* {console.log(agents)} */}
          <div className="row">
            {agents?.map((agent) => {
              return (
                <div className="col-12 col-md-4 col-lg-3" key={agent.id}>
                  <Link href={"/agents/" + agent.info_slug}>
                    <a>
                      <div className="card" style={{ width: "100%;" }}>
                        <img
                          src={agent.image}
                          className="card-img-top"
                          alt={agent.name}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{agent.name}</h5>
                          <p className="card-text">{agent.position}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            <span className="fw-bold">Nationality : </span>
                            {agent.nationality}{" "}
                          </li>
                          <li className="list-group-item">
                            <span className="fw-bold">Languages : </span>
                            {agent.languages}
                          </li>
                          {/* <li className="list-group-item">A third item</li> */}
                        </ul>
                      
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default index;

export async function getServerSideProps(context) {
  var agents = "";

  await fetch(process.env.API_DOMAIN_URL + `/api/agents`)
    .then((response) => response.json())
    .then((json) => {
      agents = json;
    });
  return {
    props: {
      agents: agents,
    },
  };
}
