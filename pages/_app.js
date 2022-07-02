import "../public/styles/globals.css";
// import "bootstrap/dist/css/bootstrap.css";
import "../public/styles/app.min.css";
import "nprogress/nprogress.css";
import Router from "next/router";
import NProgress from "nprogress";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import LogContextProvider from "./api/auth/logContext";
import "aos/dist/aos.css";
import PageLoader from "../components/PageLoader";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }) {
  const [loader, setloader] = useState(false);
  const [loadingComplete, setloadingComplete] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      document.body.classList.add('loaded')
    }, 2000);
    setTimeout(() => {
      document.body.classList.add('loadingComplete')
      
    }, 5000);
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
    return () => {
      Router.events.off("routeChangeStart", () => NProgress.start());
      Router.events.off("routeChangeComplete", () => NProgress.done());
      Router.events.off("routeChangeError", () => NProgress.done());
    };
  }, []);

  return (
    <LogContextProvider>
      {/* <PageLoader /> */}

      {/* <SessionProvider session={pageProps.session}> */}
      <Component {...pageProps} />
      {/* </SessionProvider> */}
    </LogContextProvider>
  );
}

export default MyApp;
