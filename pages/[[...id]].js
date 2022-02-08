import Head from 'next/head';
import Browse from 'components/Browse';
import Welcome from 'components/Welcome';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  if (!router.isReady) {
    return null;
  }

  const [type, ...id] = router.query?.id || [];
  const browse = Boolean(type && id);

  return (
    <>
      <Head>
        <title>reddit pixels</title>
      </Head>
      {!browse && <Welcome />}
      {browse && <Browse type={type} id={id.join('/')} />}
    </>
  );
}
