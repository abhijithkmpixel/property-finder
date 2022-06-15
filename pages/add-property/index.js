import { useEffect, useState } from "react";
import AddProperty from "../../components/forms/AddProperty";
import HeadTag from "../../components/Head";
import Header from "../../components/Header";

const index = ({ agents, props }) => {
  const [proper, setproper] = useState(null)
useEffect(() => {
   fetch( `/api/all`)
  .then((response) => response.json())
  .then((json) => {
    // props = json;
    setproper(json)
  });

  return () => {
    
  }
}, [proper])

  return (
    <>
      <HeadTag title="Add property" meta="add a property to the db" />
      <Header />
      <AddProperty agents={agents} props={proper}/>
   
    </>
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
  return {
    props: {
      agents: agents,
      props: props,
    },
  };
}
