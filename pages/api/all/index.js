// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "../firebase";

export   default async  function  handler (req, res) {
  const collectionRef = collection(db, "properties");
  // const q = query(collectionRef, where("verified", "==", true));
  const datarr = await  getDocs(collectionRef);

  const datas = datarr?.docs?.map((doc) => {
    return {
        ...doc.data(),
        id: doc.id,
        timestamp:new Date(doc._document.version.timestamp.seconds * 1000),
        // timestamp:doc._document 

    };
  });
  res.status(200).json( datas )
}
