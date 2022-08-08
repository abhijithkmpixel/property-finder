// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "./firebase";

export   default async  function  handler (req, res) {
  const collectionRef = collection(db, "properties");
  const q = query(collectionRef, where("status", "!=", 'sold'));
  const datarr = await  getDocs(q);
  const datas = datarr?.docs?.map((doc) => {
      return {
      ...doc.data(),
        id: doc.id,
        // timestamp:new Date(doc._document.version.timestamp.seconds * 1000),
      };
  });
  const filtered = datas.filter(d=> d?.recommend && d.recommend == true)
  res.status(200).json( filtered )
}
