import AddProperty from "../../components/AddProperty"
import Header from "../../components/Header"

const index = ({agents}) => {
  return (
    <>
    <Header/>
<AddProperty agents={agents}/>
    </>
  )
}

export default index
export async function getServerSideProps(context){
  const { req, params, query } = context;
  var agents = "";
  await fetch(`http://` + context.req.headers.host + `/api/agents` )
    .then((response) => response.json())
    .then((json) => {
      agents = json;
    });
    return{
      props:{
        agents:agents
      }
    }
}