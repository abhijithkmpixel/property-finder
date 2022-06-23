import React from 'react'
import Head from 'next/head'

const HeadTag = ({title,meta}) => {
  return (
    <>

      <Head>
        <title>{title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
        <meta property="og:title" content={title} />
        <meta property="description" content={meta} />

        <link rel="icon" type="image/x-icon" href="/logo.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.css" />
        {/* <link rel="stylesheet" href="/styles/globals.css" />
        <link rel="stylesheet" href="/styles/app.min.css" /> */}

      </Head>
    </>
  )
}

export default HeadTag