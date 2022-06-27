import React, { useEffect, useState } from "react";

const AgentListingSticky = ({ agents, editProp }) => {
  const [filtered, setfiltered] = useState(agents);
  useEffect(() => {
    // setfiltered(props)
    // console.log(filtered);
  
    return () => {
      
    }
  }, [filtered])
  
  return (
    <aside className="sticky_list_select">
      <div className="headers m-3 mb-3 mt-5 d-flex justify-content-between">
        <h2 className="fs-1">Properties</h2>
      </div>
      <ul>
        {agents?.map((p) => {
          return (
            <li
              key={p.id}
              onClick={() => {
                editProp(p);
              }}
            >
              <div className="card mb-3 p-3">
                <img src={p.image} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.position}</h5>
                  {/* <p className="card-text">{p.tags}</p> */}
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

export default AgentListingSticky;
