import React, { useEffect, useState } from "react";

const PropsListingSticky = ({ props, editProp }) => {
  const [filtered, setfiltered] = useState(props);
  useEffect(() => {
    // setfiltered(props)
    // console.log(filtered);
  
    return () => {
      
    }
  }, [filtered])
  
  const filterPorps = (e) => {
    switch (e.target.value) {
      case "all":
        setfiltered(props);
        break;
      case "sale":
        setfiltered(props?.filter((p) => p.serviceType == "sale"));
        break;
      case "rent":
        setfiltered(props?.filter((p) => p.serviceType == "rent"));
        break;
      case "commercial-sale":
        setfiltered(props?.filter((p) => p.serviceType == "commercial-sale"));
        break;
      case "commercial-rent":
        setfiltered(props?.filter((p) => p.serviceType == "commercial-rent"));
        break;
    }
  };
  return (
    <aside className="sticky_list_select">
      <div className="headers m-3 mb-3 mt-5 d-flex justify-content-between">
        <h2 className="fs-1">Properties</h2>
        {/* <select
          name="options"
          id="options"
          className=" mt-3 justify-self-end border border-danger form-select-lg  btn-outline-danger fs-4"
          onChange={(e) => filterPorps(e)}
        >
          <option value="all">All</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
          <option value="commercial-sale">Commercial sale</option>
          <option value="commercial-rent">Commercial rent</option>
        </select> */}
      </div>
      <ul>
        {props?.map((p) => {
          return (
            <li
              key={p.id}
              onClick={() => {
                editProp(p);
              }}
            >
              <div className="card mb-3 p-3">
                <img src={p.images} className="card-img-top" alt={p.title} />
                <div className="card-body">
                  <h5 className="card-title">{p.title}</h5>
                  <p className="card-text">{p.tags}</p>
                  <p className="card-text">{p.id}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default PropsListingSticky;
