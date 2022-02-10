import { useRouter } from 'next/router';

export default function useRoute() {
  const router = useRouter();
  const [category, ...url] = router.query?.params || [];

  return { category, url };
}
