import { async } from '@firebase/util';
import { collection, getDocs, query } from 'firebase/firestore/lite';
import React,{ useEffect ,useState} from 'react'
import Header from '../../components/Header';
import RecommendedProp from '../../components/RecommendedProp';
import {db} from '../api/firebase';
const index = ({datas}) => {
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
    <RecommendedProp title='Properties for rent' list={datas}/>
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
  const filtered = datas.filter(data=> data.serviceType == 'rent');
  return {
    props: {
      datas: filtered,
    },
  };
}