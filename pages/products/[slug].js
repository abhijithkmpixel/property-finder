import React, { useEffect } from "react";
import ImageUrlBuilder from'@sanity/image-url'
import client from "../api/auth/sanityClient";

const index = ({ data }) => {
  useEffect(() => {
    console.log(data);

    return () => {};
  }, []);
  const builder = ImageUrlBuilder(client)

  function urlFor(source) {
    return builder.image(source)
  }
  return(

  <section>
      <div className="container">

      <div className="row">
        {/* {data?.map((p) => {
          return( */}
          <div className="col-12">
            <div className="card" style={{width: '100%'}}>
              <img src={urlFor(data.defaultProductVariant.images[0])} className="card-img-top" alt="..." />

              <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
   
              </div>
            </div>
          </div>
    
      </div>
      </div>
    </section>
  )
};

export default index;
export async function getServerSideProps(context) {
  const query = `*[slug.current=="${context?.query?.slug}"]`;
  const url = `https://srwx75cy.api.sanity.io/v2021-10-21/data/query/production?query=${query}`;
  const data = await fetch(url).then((res) => {
    return res.json();
  });
  // console.log(data);
  return {
    props: {
      data: data.result[0],
      // data: null,
    },
  };
}
