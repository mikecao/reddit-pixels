import { useRouter } from 'next/router';
import Browse from 'components/Browse';

export default function UserBrowsePage() {
  const router = useRouter();
  const { path } = router.query;

  return <Browse category="u" path={path} />;
}
