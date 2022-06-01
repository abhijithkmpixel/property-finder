import { async, jsonEval } from "@firebase/util";
import { useRouter } from "next/router";
import React ,{useEffect}from "react";

const index = ({ data }) => {
  const slug = useRouter();
  useEffect(() => {
    console.log(slug.query);

    return () => {
      // second
    };
  }, []);

  return <div>{JSON.stringify(slug?.query,null,4)}</div>;
};

export default index;

export async function getServerSideProps(context) {
  const slug = context.params;
  console.log(slug);
  return {
    props: {
      data: null,
    },
  };
}
