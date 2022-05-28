import { async } from '@firebase/util';
import { collection, getDocs, query } from 'firebase/firestore/lite';
import React,{ useEffect ,useState} from 'react'
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
      console.log(datas);
  }, [])
  
  return (
    <RecommendedProp title='listed' list={datas}/>

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
  return {
    props: {
      datas: datas,
      // id: context.params,
    },
  };
}