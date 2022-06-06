import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/app.min.css";
import "nprogress/nprogress.css";
import Router from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";
NProgress.configure({showSpinner:false})
function MyApp({ Component, pageProps }) {
  useEffect(() => {
  
    Router.events.on("routeChangeStart", ()=> NProgress.start());
    Router.events.on("routeChangeComplete", ()=>NProgress.done());
    Router.events.on("routeChangeError", ()=>NProgress.done());
    return () => {
      Router.events.off("routeChangeStart", ()=> NProgress.start());
      Router.events.off("routeChangeComplete", ()=>NProgress.done());
      Router.events.off("routeChangeError", ()=>NProgress.done());
    }
  }, [])
  


  return <Component {...pageProps} />;
}

export default MyApp;
