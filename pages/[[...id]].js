import Head from 'next/head';
import Browse from 'components/Browse';

export default function Home() {
  return (
    <>
      <Head>
        <title>reddit pixels</title>
      </Head>
      <Browse />
    </>
  );
}
