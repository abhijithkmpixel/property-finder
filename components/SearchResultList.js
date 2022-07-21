import React, { useEffect, useState } from "react";
import AOS from "aos";
import Paginate from "./Paginate";
import SearchResultItem from "./SearchResultItem";

const SearchResultList = ({ props, type, locs ,itemOffset ,itemsPerPage ,pageCount ,setItemOffset,setPageCount}) => {

  useEffect(() => {
    AOS.init({
      offset: 100,
    });
    AOS.refresh();
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(props.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.length / itemsPerPage));
  }, [ pageCount]);
  return (
    <section className="recc_prop_section">
      <div className="container">
        <div className="inner_wrap">
          <div className="title_wrp d-flex justify-content-between w-100 align-items-center">
            <h1 className="mb-4">
              {type == "all"
                ? "All properties"
                : `Properties for ${type.replace("-", " ")}`}
            </h1>
            <b className="text-lg-start fs-4 m-3">
              {" "}
              {`(total ${props.length})`}{" "}
            </b>
          </div>
          {props && props.length !== 0 && (
            <div className="row">
              {currentItems?.map((prop) => {
                return (
                  <div
                    className="col-8"
                    key={prop?.id}
                    data-aos="fade-left"
                    data-aos-duration="900"
                    data-aos-delay="200"
                  >
                    <SearchResultItem property={prop} />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {props.length == 0 ? (
          <h1>No results found</h1>
        ) : (
          <Paginate
            itemsPerPage={itemsPerPage}
            pageCount={pageCount}
            items={props}
            setItemOffset={setItemOffset}
          />
        )}
      </div>
    </section>
  );
};

export default SearchResultList;
