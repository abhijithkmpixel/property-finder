import { collection, getDocs } from "firebase/firestore/lite";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import { db } from "../api/firebase";

const index = ({ data }) => {
  useEffect(() => {
    // console.log(data);
    return () => {};
  }, []);

  return (
    <>
    <Header />
    <section className="section_prop_details">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12 ">
            <div className="prop_image_wr">
              <img
                src={data.images}
                alt={data.title}
              />
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
                  <h5>Location:</h5>
                  <span>{data.price} AED / </span>
                </li>
              </ul>

              <p>{data.description}</p>
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
      id: doc.id
    };
  });
  const filter = datas.filter(data => data.slug == slug.slug );
  return {
    props: {
      data: filter[0],
      // slug:slug,
    },
  };
}
