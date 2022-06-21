import React from "react";
import Rentersguide from "../../../components/admins/Rentersguide";
import HeadTag from "../../../components/Head";
import Header from "../../../components/Header";
import { api } from "../../api/auth/api";

const Guides = ({ results }) => {
  return (
    <>
      <HeadTag title="Edit renter's guide" meta="" />
      <Header />
      <Rentersguide
        title="Renter's guide"
        docName="rentersguide"
        results={results}
      />
    </>
  );
};

export default Guides;
export async function getServerSideProps(context) {
  var data = null;
  await api.get("/api/renterguide").then((res) => {
    data = res.data;
  });
  console.log(data);

  return {
    props: {
      results: data,
    },
  };
}
