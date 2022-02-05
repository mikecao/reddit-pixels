import Head from 'next/head';
import Browse from 'components/Browse';
import Welcome from 'components/Welcome';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [type, id] = router.query?.id || [];
  const browse = Boolean(type && id);

  return (
    <>
      <Head>
        <title>reddit pixels</title>
      </Head>
      {browse ? <Browse type={type} id={id} /> : <Welcome />}
    </>
  );
}
