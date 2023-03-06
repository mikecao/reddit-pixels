import { useRouter } from 'next/router';
import Browse from 'components/Browse';

export default function RedditBrowsePage() {
  const router = useRouter();
  const { path } = router.query;

  return <Browse category="r" path={path} />;
}
