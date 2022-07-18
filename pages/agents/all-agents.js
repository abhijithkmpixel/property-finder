import React, { useEffect, useState } from "react";
import AgentsListing from "../../components/AgentsListing";
import Footer from "../../components/Footer";
import Countries from "../../components/forms/Countries";
import States from "../../components/forms/States";
import HeadTag from "../../components/Head";
import Header from "../../components/Header";
import { api } from "../api/auth/api";

const AllAgentsSearch = ({ agents }) => {
  const [filteresAgents, setfilteresAgents] = useState(agents);
  useEffect(() => {
    
  
    return () => {
      
    }
  }, [])
  
  function filterCountry(country) {
    var arr = [...agents];
    var newArr = arr.filter((a) => {
      return a?.nationality.toLowerCase() == country.toLowerCase();
    });
    setfilteresAgents(newArr)
  }
  function filterState(state) {
    var arr = [...agents];
    var newArr = arr.filter((a) => {
      return a?.state?.toLowerCase() == state.toLowerCase();
    });
    setfilteresAgents(newArr)
  }
  function resetForm(){
    setfilteresAgents(agents)
  }
  function filterByname(name){
    var arr = [...agents];
    if(name){
      var newArr = arr.filter((a) => {
        return a?.name?.toLowerCase().includes(name.toLowerCase());
      });
      setfilteresAgents(newArr)
    }else{
      setfilteresAgents(agents)
    }
  }
  return (
    <>
      <HeadTag
        title={"All agents"}
        meta={
          "Find great properties from the top real estate agents in India verified by Find homes"
        }
        keyword={"Agents,real estate,best property finder"}
      />
      <Header innerpage={true} />
      <section className="filter_agents">
        <div className="container">
          <div className="filter_wrapper">
            <h1>Search Agent</h1>
            <div className="filter_wrap">
              <div className="search_byName_input">
                <input
                  type="search"
                  placeholder="Search Name"
                  id="search_name"
                  name="search_name"
                  onChange={(e)=>filterByname(e.target.value)}
                />
              </div>
              <div className="filter_by_dropdown">
                <Countries name={"country"} filterCountry={filterCountry} />
              </div>
              <div className="filter_by_dropdown">
                <States filterState={filterState} />
              </div>
              <button className="btn btn-danger fs-3 " onClick={resetForm}>Reset</button>
            </div>
          </div>
        </div>
      </section>
      <AgentsListing agents={filteresAgents} />
      <Footer />
    </>
  );
};

export default AllAgentsSearch;
export async function getServerSideProps(context) {
  var agents = "";

  await api(`/api/agents`).then((response) => (agents = response.data));

  return {
    props: {
      agents: agents,
    },
  };
}
