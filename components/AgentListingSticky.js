import React, { useEffect, useState } from "react";
import Paginate from "./Paginate";

const AgentListingSticky = ({ agents, editProp }) => {
  const [filtered, setfiltered] = useState();

  const [currentItems, setCurrentItems] = useState();
  const [pageCount, setPageCount] = useState(1);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemsPerPage, setitemsPerPage] = useState(6);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // setfiltered(props)
    // console.log(filtered);
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(agents.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(agents.length / itemsPerPage));
    return () => {};
  }, [itemOffset, itemsPerPage,agents]);
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  return (
    <aside className="sticky_list_select">
      <div className="headers m-3 mb-3 mt-5 d-flex justify-content-between">
        <h2 className="fs-1">Agents</h2>
      </div>
      
      <ul>
        {currentItems?.map((p) => {
          return (
            <li key={p.id}>
              <div className="card h-100 p-3">
                <img src={p.image} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <span className="card-title">{p.name}</span>
                  <p className="card-text">{p.nationality}</p>
                  <p className="card-text">{p.position}</p>
                </div>
                <div className="btnr_wrap">
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => {
                      editProp(p);
                    }}
                  >
                    Edit
                  </button>
                  <button className="btn btn-outline-danger">Delete</button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className=" h-auto mw-100 my-5 mx-5" style={{width:'max-content'}}>
        <Paginate
          itemsPerPage={itemsPerPage}
          pageCount={pageCount}
          items={agents}
          setItemOffset={setItemOffset}
        />
      </div>
    </aside>
  );
};

export default AgentListingSticky;
