import { async } from '@firebase/util';
import { collection, getDocs, query } from 'firebase/firestore/lite';
import React,{ useEffect ,useState , useContext} from 'react'
import Header from '../../components/Header';
import RecommendedProp from '../../components/RecommendedProp';
import {db} from '../api/firebase';
import { PropContext } from '../../components/PropertyContext';

const index = ({datas}) => {
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
    <Header />
    {
      console.log(proper)
    }
    <RecommendedProp title='Properties for sale' list={datas}/>
    </>

  )
}

export default index;
export async function getServerSideProps(){
  const collectionRef = collection(db, "properties");
  const q = query(collectionRef);
  const datarr = await getDocs(collectionRef);
  const datas = datarr.docs.map((doc) => {
    return {
        ...doc.data(),
        id: doc.id
    };
  });
  const filtered = datas.filter(data=> data.serviceType == 'sale');
  return {
    props: {
      datas: filtered,
    },
  };
}