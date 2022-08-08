import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="og:type" content="website" />
        <link rel="icon" href="/png.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css"
        />
           <link rel="preload" href="https://cardconnect.com/iframe.html" as="document"/>
        </Head>
        <body className="pixel-dashboard">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
