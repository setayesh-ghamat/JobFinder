import { Html, Head, Main, NextScript } from 'next/document';
import { Helmet } from 'react-helmet';

export default function Document() {

  return (
    <Html lang="en">
      <Head>
        <Helmet>
          <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet" />
        </Helmet>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
