import { useRouter } from 'next/router';

export default function useRoute() {
  const router = useRouter();
  const [category, ...path] = router.query?.params || [];

  return { category, path: path ? path.join('/') : undefined };
}
