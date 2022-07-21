import "../public/styles/globals.css";
// import "bootstrap/dist/css/bootstrap.css";
import "../public/styles/app.min.css";
import "nprogress/nprogress.css";
import Router from "next/router";
import NProgress from "nprogress";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import LogContextProvider, { useLogContaxt } from "./api/auth/logContext";
import "aos/dist/aos.css";
import PageLoader from "../components/PageLoader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase";
import { api } from "./api/auth/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps ,agents}) {
  // const [loader, setloader] = useState(false);
  // const [loadingComplete, setloadingComplete] = useState(false);

  useEffect(() => {

    if (window !== undefined) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 180) {
          // console.log(window.screenY);
          document.body.classList.add("sticky_header");
        } else {
          document.body.classList.remove("sticky_header");
        }
      });
    }

    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());

    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        agents?.map((agent) => {
          if (agent?.email == currentUser?.email) {
            updateLoggedUser(agent);
          }
        });
      }
    });
    return () => {
      Router.events.off("routeChangeStart", () => NProgress.start());
      Router.events.off("routeChangeComplete", () => NProgress.done());
      Router.events.off("routeChangeError", () => NProgress.done());
    };
  }, []);

  return (
    <LogContextProvider>
      {/* <PageLoader /> */}

   
     
      <Component {...pageProps} />
      {/* </SessionProvider> */}
    </LogContextProvider>
  );
}

export default MyApp;
