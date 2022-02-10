import Head from 'next/head';
import { useRouter } from 'next/router';
import Browse from 'components/Browse';
import Welcome from 'components/Welcome';
import useRoute from 'components/hooks/useRoute';

export default function Home() {
  const router = useRouter();
  const { category, path } = useRoute();

  if (!router.isReady) {
    return null;
  }

  const browse = Boolean(category && path);

  return (
    <>
      <Head>
        <title>reddit pixels</title>
      </Head>
      {!browse && <Welcome />}
      {browse && <Browse category={category} path={path.join('/')} />}
    </>
  );
}
