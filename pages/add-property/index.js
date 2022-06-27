import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Dashboard from "../../components/admins/Dashboard";
import AddProperty from "../../components/forms/AddProperty";
import HeadTag from "../../components/Head";
import Header from "../../components/Header";
import PageLoader from "../../components/PageLoader";
import { api } from "../api/auth/api";
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
      {/* <Header innerpage={true}/>
       */}
      <div className="layout has-sidebar fixed-sidebar fixed-header">
        <Dashboard />
        {/* <div id="overlay" className="overlay"></div> */}
        <div className="dash w-100">
          <div className="w-100">
            <AddProperty agents={agents} props={proper} />
          </div>
          <div className="overlay"></div>
        </div>
      </div>
    </>
  );
};

export default index;
export async function getServerSideProps(context) {
  const { req, params, query } = context;
  var agents = "";
  await api.get(`/api/agents`).then((response) => {
    agents = response.data;
  });

  var props = "";
  await api.get(`/api/all`).then((response) => {
    props = response.data;
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
