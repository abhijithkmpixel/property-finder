import React from 'react'
import HeadTag from '../../components/Head';

const index = ({agent}) => {
  return (
    <div>
      <HeadTag title={agent.name} meta={`${agent.position}`} />
      <section className="agent_details">
        <div className="container">
          <div className="agent_img"></div>
        </div>
      </section>
      <img src={agent?.image} alt={agent?.name} />
      </div>
  )
}

export default index;

export async function getServerSideProps(context){
  const {req,params,query} = context;
  var agents ='';
  console.log(params);
  await fetch(`http://` + req.headers.host + `/api/agents`)
    .then((response) => response.json())
    .then((json) => {
      agents = json;
    });
    const agent = agents.filter(age=> age.info_slug == params.slug)
  return {
    props: {
      agent: agent[0],
    },
  };
}