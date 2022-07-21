import Head from "next/head";
import { useContext, useEffect } from "react";
import HeadTag from "../components/Head";
import { api } from "./api/auth/api";
import { LogContext } from "./api/auth/logContext";
import { useLogContaxt } from "./api/auth/logContext";
import AOS from "aos";
import LoginForm from "../components/forms/LoginForm";

export default function Home({ propList, agents, locs }) {

  useEffect(() => {
    // console.log(logs);
    AOS.init({
      offset:100

    });
    AOS.refresh();
    return () => {};
  }, []);

  return (
    <>
    <LoginForm /></>
  );
}

export async function getServerSideProps(context) {
  const data = await api.get("/api/recommended")
    .then((res) => {
      return res.data;
    });
// console.log(data);
  const agents = await api.get("/api/agents")
    .then((res) => {
      return res.data;
    });

  const locations = await api.get("/api/locations")
  .then((res) => {
    return res.data;
  });
  return {
    props: {
      propList: data,
      agents: agents,
      locs: locations,
    },
  };
}
