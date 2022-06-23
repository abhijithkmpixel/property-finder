// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { collection, getDocs, query } from "firebase/firestore/lite";
import { db } from "./firebase";

export   default async  function  handler (req, res) {
  const collectionRef = collection(db, "properties");
  const datarr = await  getDocs(collectionRef);
  const datas = datarr?.docs?.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
        timestamp:new Date(doc._document.version.timestamp.seconds * 1000),
      };
  });
  const filtered = datas.filter(d=> d.recommend)
  res.status(200).json( filtered )
}
