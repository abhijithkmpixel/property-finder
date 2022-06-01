import { collection, getDocs } from 'firebase/firestore/lite';
import React ,{createContext , useState}from 'react'
import { db } from '../pages/api/firebase';

export const PropContext = createContext();
const PropertyContext = ({children}) => {
  const [propContext, setpropContext] = useState({value: 'false'})
  return (
    <PropContext.Provider value={{propContext,setpropContext}}>
      {children}
    </PropContext.Provider>
  )
}

export default PropertyContext;
// export async function getServerSideProps(){
//   const collectionRef = collection(db, "properties");
//   const datarr = await getDocs(collectionRef);
//   const datas = datarr.docs.map((doc) => {
//     return {
//         ...doc.data(),
//         id: doc.id
//     };
//   });
//   // const filtered = datas.filter(data=> data.serviceType == 'rent');
//   return {
//     props: {
//       data: datas,
//     },
//   };
// }