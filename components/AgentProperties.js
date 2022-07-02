import Link from "next/link";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import SearchResultItem from "./SearchResultItem";

const AgentProperties = ({ title, list, agents, filter }) => {
  const [filtered, setfiltered] = useState(list);
  useEffect(() => {
    // console.log(list);
    AOS.init({
      duration:700,
      offset:100
    });
    AOS.refresh();
    return () => {};
  }, [filtered]);

  const filterPorps = (e) => {
    switch (e.target.value) {
      case "all":
        setfiltered(list);
        break;
      case "sale":
        setfiltered(list?.filter((p) => p.serviceType == "sale"));
        break;
      case "rent":
        setfiltered(list?.filter((p) => p.serviceType == "rent"));
        break;
      case "commercial-sale":
        setfiltered(list?.filter((p) => p.serviceType == "commercial-sale"));
        break;
      case "commercial-rent":
        setfiltered(list?.filter((p) => p.serviceType == "commercial-rent"));
        break;
    }
    // console.log(filtered);
  };
  return (
    <section className="recc_prop_section">
      <div className="container">
        <div className="title_wrp d-flex justify-content-between w-100 align-items-center">
          {title && <h5>{title}</h5>}
          {filter && (
            <div className="div">
              <b className="text-lg-start fs-4 m-3">({filtered.length})</b>
              <select
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
              </select>
            </div>
          )}
        </div>
        <div className="reommended_props_offgrid">
            {filtered && filtered.length > 0
              ? filtered?.map((prop, index) => {
                  return (
                    <SearchResultItem property={prop}/>
               
                  );
                })
              : null}
        </div>

        {filtered?.length == 0 && <h4>No listing found</h4>}
      </div>
    </section>
  );
};

export default AgentProperties;
