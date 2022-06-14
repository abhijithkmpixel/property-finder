// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { collection, getDocs, query ,doc, getDoc} from "firebase/firestore/lite";
import { db } from "./firebase";

export   default async  function  handler (req, res) {
  const docRef = doc(db, "static_pages","buyersguide");
  const datarr = await  getDoc(docRef);

  res.status(200).json(datarr.data())
}
