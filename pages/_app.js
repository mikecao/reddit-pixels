import { MDXProvider } from '@mdx-js/react';
import Head from 'next/head';
import 'styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <MDXProvider>
      <Head>
        <title>reddit pixels</title>
      </Head>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
