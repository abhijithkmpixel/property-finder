// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "../firebase";

export   default async  function  handler (req, res) {
  const {slug} = req.query

  const collectionRef = collection(db, "agents");
  const q = query(collectionRef, where("info_slug", "==", slug));
  const querySnapshot = await getDocs(q)

  const agents = querySnapshot?.docs?.map((doc) => {
    return {
        ...doc.data(),
        id: doc.id,
        timestamp:new Date(doc._document.version.timestamp.seconds * 1000)
    };
  });
  res.status(200).json( agents )
}
