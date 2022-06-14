import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const Paginate = ({ itemsPerPage, pageCount, items, setItemOffset }) => {
  // We start with an empty list of items.

  // Invoke when user click to request another page.
  useEffect(() => {
    
  
    return () => {
      
    }
  }, [items])
  
  const handlePageClick = (event) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };
  const hrefBuilder = () =>{
    return '/#'
  }

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="< prev"
        // renderOnZeroPageCount={null}
        containerClassName="pagination pagination-lg "
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        previousClassName="page-item nav"
        nextClassName="page-item nav"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        breakClassName='page-item'
        breakLinkClassName='page-link'
        hrefBuilder={hrefBuilder}
      />
    </>
  );
};

export default Paginate;
