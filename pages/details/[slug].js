import { collection, getDocs } from "firebase/firestore/lite";
import React, { useEffect } from "react";
import HeadTag from "../../components/Head";
import Header from "../../components/Header";
import { db } from "../api/firebase";
import Link from "next/link";
const index = ({ data, agent }) => {
  useEffect(() => {
    // console.log(agent);
    return () => {};
  }, []);

  return (
    <>
      <HeadTag title={data.title} meta={data.tags}/>
      <Header />
      <section className="section_prop_details">
        <div className="container">
          <p>{data.serviceType}  {data.id}</p>
          <div className="row">
            <div className="col-lg-8 col-12 ">
              <div className="prop_image_wr">
                <img src={data.images} alt={data.title} />
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <ul className="points_wrp">
                <li>
                  <h5>Property size:</h5>
                  <span>{data.propertySize} Sq.Ft.</span>
                </li>
                <li>
                  <h5>Bedrooms:</h5>
                  <span>{data.bedroom} </span>
                </li>
                <li>
                  <h5>Bathrooms:</h5>
                  <span>{data.bathroom}</span>
                </li>
                <li>
                  <h5>Property type:</h5>
                  <span>{data.propertyType} </span>
                </li>
              </ul>
            </div>
            <div className="col-12">
              <div className="body_copy">
                <h4>{data.title}</h4>
                <h1>{data.tags}</h1>
                <ul className="points_wrp">
                  <li>
                    <h5>Location:</h5>
                    <span>{data.location}</span>
                  </li>
                  <li>
                    <h5>Price:</h5>
                    <span>{data.price} AED / {data.period == 'm' ?'Monthly':'Yearly'}</span>
                  </li>
                </ul>
                <Link href={`/agents/`+agent.info_slug}>
                  <a>
                    <div className="card mb-5 mt-5" style={{ maxWidth: "540px" }}>
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={agent.image}
                            className="img-fluid rounded-start"
                            alt={agent.name}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{agent?.name}</h5>
                            <p className="card-text">Position : {agent.position}</p>
                            <p className="card-text">Company : {agent.company.name}</p>
                            <p className="card-text">
                              <small className="text-muted">
                               <img src={agent.company.company_image} style={{maxWidth:100}} alt="" />
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
                {/* <p>{data.description}</p> */}
                <div className="description" dangerouslySetInnerHTML={{ __html: data.description}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
export async function getServerSideProps(context) {
  const slug = context.params;
  const collectionRef = collection(db, "properties");
  const datarr = await getDocs(collectionRef);
  const datas = datarr.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });
  const filter = datas.filter((data) => data.slug == slug.slug);

  const agents = await fetch(
    process.env.API_DOMAIN_URL + "/api/agents"
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
  const agent = agents?.filter((a) => {
    if (a.info_slug.toString() == filter[0].agent) {
      return a;
    }
  });
  // console.log(filter[0]);
  return {
    props: {
      data: filter[0],
      agent: agent[0],
    },
  };
}
