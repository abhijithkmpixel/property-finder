// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "../firebase";

export   default async  function  handler (req, res) {
  const collectionRef = collection(db, "agents");
  // const q = query(collectionRef, where("verified", "==", true));
  const datarr = await  getDocs(collectionRef);
  const agents = datarr?.docs?.map((doc) => {
    return {
        ...doc.data(),
        id: doc.id,
        // timestamp:new Date(doc._document.version.timestamp.seconds * 1000)
    };
  });
  res.status(200).json( agents )
}
