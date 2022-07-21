import { async } from '@firebase/util';
import { collection, getDocs, query } from 'firebase/firestore/lite';
import React,{ useEffect ,useState , useContext} from 'react'
import Header from '../../components/Header';
import RecommendedProp from '../../components/RecommendedProp';
import {db} from '../api/firebase';
import { PropContext } from '../../components/PropertyContext';
import HeadTag from '../../components/Head';

const index = ({datas,agents}) => {
  const proper= useContext(PropContext);
  const [property, setproperty] = useState()
  useEffect(() => {
    // const dbRef = collection(db,'properties');
    // // const q = query(dbRef);
    // const data = await getDocs(dbRef);
    
    // return () => {
      //   return data
      // }
      // console.log(datas);
  }, [])
  
  return (
    <>
    <HeadTag title='Sale'/>

    <Header />
    {/* {
      console.log(proper)
    } */}
    <RecommendedProp title='Properties for sale' list={datas} agents={agents}/>
    </>

  )
}

export default index;
export async function getServerSideProps(context){
  const collectionRef = collection(db, "properties");
  const q = query(collectionRef);
  const datarr = await getDocs(collectionRef);
  const datas = datarr.docs.map((doc) => {
    return {
        ...doc.data(),
        id: doc.id
    };
  });

  
const agents = await fetch(`http://` + context.req.headers.host +'/api/agents')
.then(res =>res.json())
.then(json=> {return json})
  const filtered = datas.filter(data=> data.serviceType == 'sale');
  return {
    props: {
      datas: filtered,
      agents:agents
    },
  };
}