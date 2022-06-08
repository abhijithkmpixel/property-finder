import React, { useEffect } from "react";
import HeadTag from "../../components/Head";
import Header from "../../components/Header";
import Link from 'next/link'
const index = ({ agent, count }) => {
  useEffect(() => {
    console.log(count);

    return () => {};
  }, []);

  return (
    <div>
      <HeadTag title={agent.name} meta={`${agent.position}`} />
      <Header />
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
          {
            count && count.length !==0 &&
          <div className="row mt-5 mb-5">
            <h4>listed properties</h4>
            {
              count.map(a =>{
          return  <div className="col-12 col-md-4">
              <div className="card" style={{ width: "100%" }}>
                <img src={a.images} className="card-img-top" alt={a.title} />
                <div className="card-body">
                  <h5 className="card-title">{a.tags} </h5>
                  <p className="card-text">
                  {a.title} 
                  </p>
                  <Link href={'/details/'+a.slug}>
                  <a className="btn btn-primary">
                    Read more
                  </a>
                  </Link>
                </div>
              </div>
            </div>

              })
            }

           
          </div>

          }
        </div>
      </section>
    </div>
  );
};

export default index;

export async function getServerSideProps(context) {
  const { req, params, query } = context;
  var agents = "";
  await fetch(`http://` + req.headers.host + `/api/agents`)
    .then((response) => response.json())
    .then((json) => {
      agents = json;
    });
  var props = "";

  await fetch(`http://` + req.headers.host + `/api/all`)
    .then((response) => response.json())
    .then((json) => {
      props = json;
    });
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
