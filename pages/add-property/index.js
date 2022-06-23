import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AddProperty from "../../components/forms/AddProperty";
import HeadTag from "../../components/Head";
import Header from "../../components/Header";
import PageLoader from "../../components/PageLoader";
import { auth } from "../api/firebase";

const index = ({ agents, props }) => {
  const [proper, setproper] = useState(null);
  const router = useRouter();
  const [loggedIn, setloggedIn] = useState(false);
  useEffect(() => {
    fetch(`/api/all`)
      .then((response) => response.json())
      .then((json) => {
        // props = json;
        setproper(json);
      });

    return () => {};
  }, [proper]);
  onAuthStateChanged(auth, (currentUser) => {
    // console.log(currentUser);
    if (!currentUser) {
      router.push("/login");
      setloggedIn(true);
    }
    // setuser(true)
  });
  return (
    <>
      {
        // router.push('/')
        loggedIn && <PageLoader />
      }

      <HeadTag title="Add property" meta="add a property to the db" />
      <Header />
      <AddProperty agents={agents} props={proper} />
    </>
  );
};

export default index;
export async function getServerSideProps(context) {
  const { req, params, query } = context;
  var agents = "";
  await fetch(process.env.API_DOMAIN_URL + `/api/agents`)
    .then((response) => response.json())
    .then((json) => {
      agents = json;
    });
  var props = "";
  await fetch(process.env.API_DOMAIN_URL + `/api/all`)
    .then((response) => response.json())
    .then((json) => {
      props = json;
    });
  onAuthStateChanged(auth, (currentUser) => {
    if (!currentUser) {
      // console.log("out");
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    } else {
      // console.log("in");
    }
  });
  return {
    props: {
      agents: agents,
      props: props,
    },
  };
}
