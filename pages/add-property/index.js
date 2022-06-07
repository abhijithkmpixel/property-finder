import AddProperty from "../../components/AddProperty"
import HeadTag from "../../components/Head"
import Header from "../../components/Header"

const index = ({agents}) => {
  return (
    <>
    <HeadTag title='Add property' meta='add a property to the db' />
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