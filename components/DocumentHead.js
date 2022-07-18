import { Head, Html, Main } from 'next/document'
import React from 'react'
const DocumentHead = () => {
  return (
    <Html>
    <Head>
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
        
        <link rel="stylesheet" href="/styles/globals.css" />
        <link rel="stylesheet" href="/styles/app.min.css" />
    </Head>
 
  </Html>
  )
}

export default DocumentHead