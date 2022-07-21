import { async, jsonEval } from "@firebase/util";
import { doc } from "firebase/firestore/lite";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import RecommendedProp from "../../components/RecommendedProp";
import Link from "next/link";
import SearchResultItem from "../../components/SearchResultItem";
import HeadTag from "../../components/Head";
import AdvSearch from "../../components/forms/AdvSearch";
import Paginate from "../../components/Paginate";
import { motion } from "framer-motion";
import { api } from "../api/auth/api";
import AOS from "aos";
import Footer from "../../components/Footer";
import SearchResultList from "../../components/SearchResultList";
import ShowYourListing from "../../components/static page components/ShowYourListing";
import RecommendedPropSidebar from "../../components/static page components/RecommendedPropSidebar";
import SpinnerLoader from "../../components/Spinner";
import ReviewBar from "../../components/static page components/ReviewBar";

const index = ({ props, type, locs, recomended }) => {
  // const [propertys, setpropertys] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [currentItems, setCurrentItems] = useState();

  const [itemsPerPage, setitemsPerPage] = useState(8);
  const [itemOffset, setItemOffset] = useState(0);
  const [properties, setproperties] = useState(props);
  const [recommendedProps, setrecommendedProps] = useState(recomended);
  const [searchData, setsearchData] = useState();
  const router = useRouter();
  const query = router.query;

  function reloaded() {
    setPageCount(1);
  }
  useEffect(() => {
    // Fetch items from another resources.
    // console.log('load');
    AOS.init({
      offset: 100,
      once: true,
    });
    AOS.refresh();
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(properties?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(properties?.length / itemsPerPage));
  }, [itemOffset, pageCount, properties]);

  function sort_search(e) {
    // reloaded();
    setItemOffset(0);
    switch (e.target.value) {
      case "a-b":
        var json = [...props];
        json.sort(function (a, b) {
          return a?.price - b?.price;
        });
        setproperties(json);
        break;
      case "b-a":
        var json = [...props];
        json.sort(function (a, b) {
          return b?.price - a?.price;
        });
        setproperties(json);
        break;
      case "verified":
        var json = [...props];
        var newarr = json.filter((p) => {
          return p?.verified && p?.verified == true;
        });

        setproperties(newarr);
        break;
      case "all":
        setproperties(props);
        break;
    }
  }

  return (
    <div>
      <HeadTag
        title="Search results"
        meta={
          "Find Homes is an innovative real estate company that helps to find the perfect home for you.best property finder site in india"
        }
        keyword={"properties,real estate"}
      />
      <Header innerpage={true} />
      <section className="mt-4">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-5 pb-4">
              <li class="breadcrumb-item fs-5 ">
                <Link className="" href="/">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active fs-5 " aria-current="page">
                search
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="mt-5 mb-5 advanced_search pt-5 pb-5">
        <div className="container">
          <div className="adv_search_wrapper">
            <AdvSearch
              locs={locs}
              reloaded={reloaded}
              data-aos="fade-up"
              data-aos-duration="900"
              data-aos-delay="200"
            />
          </div>
        </div>
      </section>
      {/* <SearchResultList properties={properties} type={type} locs={locs} itemOffset={itemOffset} itemsPerPage={itemsPerPage} pageCount={pageCount} setItemOffset={setItemOffset} setPageCount={setPageCount}/> */}
      <section className="recc_prop_section">
        <div className="container">
          <div className="inner_wrap">
            <div className="title_wrp d-flex justify-content-between w-100 align-items-center">
              <h1 className="mb-4">
                {type == "all"
                  ? "All properties"
                  : `Properties for ${type.replace("-", " ")}`}
              </h1>
              <div className="div">
                <b className="text-lg-start fs-4 m-3">
                  {" "}
                  {`(total ${properties?.length})`}{" "}
                </b>
                <select
                  name="search_sort"
                  className="border border-dark  p-2 text-start fs-4"
                  id="search_sort"
                  onChange={sort_search}
                >
                  <option value="all">Default</option>
                  <option value="a-b">Price Low To High</option>
                  <option value="b-a">Price High To Low</option>
                  <option value="verified">Verified Only</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 col-12">
                {properties && properties?.length !== 0
                  ? currentItems?.map((prop) => {
                      return (
                        <div
                          className="w-100"
                          key={prop?.id}
                          data-aos="fade-left"
                          data-aos-duration="900"
                          data-aos-delay="200"
                        >
                          <SearchResultItem property={prop} />
                        </div>
                      );
                    })
                  : null}
                {properties?.length == 0 ? (
                  <div class="results-list">
                    <div class="no-results-holder">
                      <div class="no-results d-flex">
                        <div class="kekra mx-3">
                          <img
                            src="/download.png"
                            alt="cactus"
                            style={{ width: "200px", height: "auto" }}
                          />
                        </div>
                        <div class="rightCol">
                          <div class="message">
                            <div class="title">
                              <div class="text">
                                <h3>
                                  Sorry! We couldn’t find anything for with
                                  these filters applied.
                                </h3>
                              </div>
                            </div>
                            <div class="details">
                              <div class="subtitle">Let’s try again?</div>
                              <ul class="text">
                                <li>Use fewer or different keywords.</li>
                                <li>Check your spelling.</li>
                                <li>Try removing some filters.</li>
                                <li>Start with something less-specific.</li>
                                <li>
                                  You can always refine your search results
                                  later.
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Paginate
                    itemsPerPage={itemsPerPage}
                    pageCount={pageCount}
                    items={properties}
                    setItemOffset={setItemOffset}
                    itemOffset={itemOffset}
                  />
                )}
              </div>
              <div className="col-12 col-lg-4">
                {recommendedProps && recommendedProps?.length > 0 ? (
                  <RecommendedPropSidebar recommendedProps={recommendedProps} />
                ) : null}
                <div
                  className="position-sticky  start-0"
                  style={{ top: "90px" }}
                >
                  <ShowYourListing />
                  <ReviewBar />
                </div>
              </div>
            </div>
          </div>
          {/* //no search results text  */}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default index;

export async function getServerSideProps(context) {
  const slug = context.query;

  const { req, params, query } = context;
  var propert = "";
  await api.get(`/api/` + slug?.type).then((res) => {
    propert = res.data;
  });
  const newProp = propert.filter((prop) => {
    if (
      (slug?.p_t ? prop.propertyType == slug?.p_t : true) &&
      (slug?.min_a ? Number(prop.propertySize) >= slug?.min_a : true) &&
      (slug?.max_a ? Number(prop.propertySize) <= slug?.max_a : true) &&
      (slug?.min_r ? Number(prop.price) >= slug?.min_r : true) &&
      (slug?.max_r ? Number(prop.price) <= slug?.max_r : true) &&
      (slug?.min_p ? Number(prop.price) >= slug?.min_p : true) &&
      (slug?.max_p ? Number(prop.price) <= slug?.max_p : true) &&
      (slug?.st && slug?.st !== "all"
        ? prop?.state?.toLowerCase() == slug?.st?.toLowerCase()
        : prop) &&
      (slug?.bd ? Number(prop.bedroom) == slug?.bd : true) &&
      (slug?.bt ? Number(prop.bathroom) == slug?.bt : true) &&
      (slug?.loc ? slug?.loc?.includes(prop?.location) : true) &&
      (slug?.d ? prop.period.toString() == slug?.d.toString() : true)
    ) {
      return prop;
    }
  });
  //for getting the locations list
  const locations = await api.get("/api/locations").then((res) => {
    return res.data;
  });
  const recomended = await api.get("/api/recommended").then((res) => {
    return res.data;
  });

  return {
    props: {
      props: newProp,
      type: query.type,
      locs: locations,
      recomended: recomended,
    },
  };
}
