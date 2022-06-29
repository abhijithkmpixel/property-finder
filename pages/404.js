import Link from "next/link";
import React from "react";
import Footer from "../components/Footer";
import HeadTag from "../components/Head";
import Header from "../components/Header";

const index = () => {
  return (
    <>
      <HeadTag title="404" meta="error page" />
      <Header innerpage={true} />
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className=" col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">Look like you're lost</h3>

                  <p>the page you are looking for not avaible!</p>
                  <Link href="/">
                    <a className="link_404 btn btn-danger btn-lg">Go to Home</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5 p-5"></div>
      </section>
      <Footer />
    </>
  );
};

export default index;
