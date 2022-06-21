// import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import React, { useEffect } from "react";
import ImageUrlBuilder from'@sanity/image-url'
import Link from "next/link";
// import client from './sanityClient'
import client from "../api/auth/sanityClient";
const index = ({ data }) => {
  useEffect(() => {
    console.log(data);

    return () => {};
  }, []);
  const builder = ImageUrlBuilder(client)

  // Then we like to make a simple function like this that gives the
  // builder an image and returns the builder for you to specify additional
  // parameters:
  function urlFor(source) {
    return builder.image(source)
  }
  return (
    <section>
      <div className="container">

      <div className="row">
        {data?.map((p) => {
          return(
          <div className="col-3">
            <div className="card" style={{width: '100%'}}>
              {/* <img src={imageUrlBilder({projectId:'srwx75cy',dataset:'production'}).image(p.defaultProductVariant.images[0])} className="card-img-top" alt="..." /> */}
              <img src={urlFor(p.defaultProductVariant.images[0])} className="card-img-top" alt="..." />
              {/* <img src={urlFor(p.defaultProductVariant.images[1])} className="card-img-top" alt="..." /> */}

            
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <Link  href={`/products/${p.slug.current}`}>
                <a className="btn btn-primary">
                  Go somewhere
                </a>
                </Link>
              </div>
            </div>
          </div>)
        })}
      </div>
      </div>
    </section>
  );
};

export default index;
export async function getServerSideProps(context) {
  const query = `*[ _type == "product" ]`;
  const url = `https://srwx75cy.api.sanity.io/v2021-10-21/data/query/production?query=${query}`;
  const data = await fetch(url).then((res) => {
    return res.json();
  });
  return {
    props: {
      data: data.result,
    },
  };
}
