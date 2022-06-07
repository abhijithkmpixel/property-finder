import React from 'react'

const index = ({agent}) => {
  return (
    <div>
      
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