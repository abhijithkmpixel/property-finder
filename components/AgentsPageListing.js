import Link from 'next/link';
import React, { useEffect } from "react";
import AOS from "aos";

const AgentsPageListing = ({agents}) => {
  useEffect(() => {
    
    AOS.init({
      offset:100

    });
    AOS.refresh();
    return () => {
      
    }
  }, [])

  return (
    <section className="agents_listing_grid  ">
    <div className="container">
      {/* {console.log(agents)} */}
      <div class="title_wrp d-flex justify-content-center  w-100 align-items-center"><h5 className="">Our agents</h5></div>
      <div className="row">
        {agents?.map((agent,index) => {
          return (
            <div className="col-12 col-md-4 col-lg-3" key={agent.id}>
              <Link href={"/agents/" + agent.info_slug}>
                <a data-aos="fade-up" data-aos-duration="1000" data-aos-delay='100'>
                  <div className="agent-list-card" >
                    {
                      // https://www.w3schools.com/howto/img_avatar.png
                      agent?.image?
                      <img
                        src={agent.image}
                        className="card-img-top"
                        alt={agent.name}
                      />:
                      <img
                      src={'https://www.w3schools.com/howto/img_avatar.png'}
                      className="card-img-top"
                      alt={agent.name}
                    />
                    }
                    <div className="card-body">
                      <h5 className="card-title">{agent.name}</h5>
                      <p className="card-text">{agent.position}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <span className="fw-bold">Nationality : </span>
                        {agent.nationality}{" "}
                      </li>
                      <li className="list-group-item">
                        <span className="fw-bold">Languages : </span>
                        {agent.languages}
                      </li>
                      {/* <li className="list-group-item">A third item</li> */}
                    </ul>
                  
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
     
      </div>
    </div>
  </section>
  )
}

export default AgentsPageListing