import React from "react";
import Head from "next/head";

const HeadTag = ({ title, meta }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={title} />
        <meta property="description" content={meta} />

        <link rel="icon" type="image/x-icon" href="/png.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.css"
        />
        {/* <link rel="stylesheet" href="https://unpkg.com/css-pro-layout@1.1.0/dist/css/css-pro-layout.css" /> */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* <link rel="stylesheet" href="/styles/globals.css" />
        <link rel="stylesheet" href="/styles/app.min.css" /> */}
      </Head>
    </>
  );
};

export default HeadTag;
