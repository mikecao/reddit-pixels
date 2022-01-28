import Head from 'next/head';
import Browse from 'components/Browse';

export default function Home() {
  return (
    <>
      <Head>
        <title>browse reddit</title>
      </Head>
      <Browse />
    </>
  );
}
