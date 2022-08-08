// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "../firebase";

export   default async  function  handler (req, res) {
  const {slug , agent} = req.query

  const collectionRef = collection(db, "properties");
  const q = query(collectionRef, where("agent", "==", agent));
  const querySnapshot = await getDocs(q)
  const datas = querySnapshot?.docs?.map((doc) => {
    return {
        ...doc.data(),
        id: doc.id,
        // timestamp:new Date(doc._document.version.timestamp.seconds * 1000),
    };
  }); 
  const filtered = datas?.filter(p=> p.slug !== slug)

  res.status(200).json( filtered )
}
