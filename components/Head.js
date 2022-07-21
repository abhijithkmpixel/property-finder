import React from "react";
import Head from "next/head";

const HeadTag = ({ title, meta, image, keyword }) => {
  function getUrl() {
    if (typeof window !== "undefined") {
      return <><meta property="twitter:url" content="https://buyers.safqat.com/" /><meta name="og:url" content={window?.location?.href} /></>;
    }
  }
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="og:type" content="website" />
        <meta name="description" content={meta} />
        <meta name="image" content={image ? image : "/share.jpg"} />
        <meta name="og:title" content={title} />
        <meta name="keywords" content={keyword} />
        {getUrl()}
        <meta name="og:description" content={meta} />
        <meta name="og:image" content={image ? image : "/share.jpg"} />

        <meta name="theme-color" content="#ffffff" />

        <meta property="twitter:card" content={title} />
        <meta name="twitter:title" content={title}/>
        <meta
          name="twitter:description"
          content={meta}
        />
        <meta name="twitter:image" content={image ? image : "/share.jpg"} />

        {/* <link rel="icon" type="image/x-icon" href="/png.png" /> */}
        <link rel="icon" href="/png.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.css"
        />
        {/* <link rel="stylesheet" href="https://unpkg.com/css-pro-layout@1.1.0/dist/css/css-pro-layout.css" /> */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css"
        />
           <link rel="preload" href="https://cardconnect.com/iframe.html" as="document"/>
        {/* <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        /> */}

        <link rel="stylesheet" href="/styles/globals.css" />
        <link rel="stylesheet" href="/styles/app.min.css" />
      </Head>
    </>
  );
};

export default HeadTag;
