import React, { useEffect, useState } from "react";
import Paginate from "./Paginate";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CurrencyFormat from "react-currency-format";

const PropsListingSticky = ({ props, editProp, deleteProp }) => {
  const [filtered, setfiltered] = useState(props);

  const [currentItems, setCurrentItems] = useState();
  const [pageCount, setPageCount] = useState(1);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemsPerPage, setitemsPerPage] = useState(6);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // setfiltered(props)
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(props.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.length / itemsPerPage));
    return () => {};
  }, [itemOffset, itemsPerPage, props]);

  const filterPropList = (e) => {
    var arr = [...currentItems];
    var newArr = [""];
    if (e.target.value !== "") {
      var newArr = props.filter((p) => {
        if (p?.title.toLowerCase().includes(e.target.value.toLowerCase())) {
          return p;
        }
      });
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(newArr.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(newArr.length / itemsPerPage));
    } else {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(props.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(props.length / itemsPerPage));
    }
  };
  function openSubMenu(e) {
    e.target.closest(".card").classList.add("open_subMenu");
  }
  function closeSubMenu(e) {
    e.target.closest(".card").classList.remove("open_subMenu");
  }
  return (
    <aside className="sticky_list_select">
      <div className="headers mb-3 d-flex justify-content-between">
        <h2 className="fs-1">My Properties</h2>
        <div className="search_filter_wrap">
          <input
            type="search"
            placeholder="Search..."
            onChange={filterPropList}
          />
        </div>
      </div>
      <ul>
        {currentItems?.map((p, index) => {
          return (
            <li key={p.id}>
              <div className="card h-100 p-3">
                <img src={p.images} className="card-img-top" alt={p.title} />
                <div className="card-body">
                  <h5 className="card-title">{p.title}</h5>
                  <p className="card-text">{p.tags}</p>
                  <p className="card-text">
                    {p?.address} ,{p?.location} {p?.state} ,{p?.pincode}
                  </p>

                  <p className="card-text">
                    <b>
                      <CurrencyFormat
                        value={p?.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix="AED "
                        // format={'##,##,##,##,##,##,###'}
                      />
                    </b>
                  </p>

                  {/* <p className="card-text">{p.id}</p> */}
                  {p?.verified && p?.verified == true ? (
                    <div class="alert alert-success fs-5 float-end" role="alert">
                      Approved
                    </div>
                  ) : (
                    <div class="alert alert-danger fs-5 float-end" role="alert">
                      Pending Valuation
                    </div>
                  )}
                </div>
                <div className="btnr_wrap d-flex">
                  <img
                    onClick={() => {
                      editProp(p);
                    }}
                    src="/pencil-fill.svg"
                    alt="edit icon"
                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                  />

                  <img
                    onClick={(e) => openSubMenu(e)}
                    src="/trash3-fill.svg"
                    alt="delete icon"
                    style={{
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      marginLeft: "15px",
                    }}
                  />
                  {/* <button className="btn btn-outline-danger" >Delete</button> */}
                  <div className="alert_delete_warn">
                    <p>Are you sure?</p>
                    <div className="d-flex align-items-center justify-content-between">
                      <img
                        onClick={() => deleteProp(p?.id)}
                        src="/tick.png"
                        alt="delete icon"
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                      />

                      <img
                        onClick={(e) => closeSubMenu(e)}
                        src="/cross.png"
                        alt="delete icon"
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          marginLeft: "15px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className=" h-auto my-5 mx-5" style={{ width: "max-content" }}>
        <Paginate
          itemsPerPage={itemsPerPage}
          pageCount={pageCount}
          items={props}
          setItemOffset={setItemOffset}
        />
      </div>
      {currentItems?.length == 0 && (
        <h1 class="alert  fs-4" role="alert">
          Oops! Nothing found
        </h1>
      )}
    </aside>
  );
};

export default PropsListingSticky;
