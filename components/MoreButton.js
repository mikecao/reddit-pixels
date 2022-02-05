import { useRouter } from 'next/router';
import useStore, { load, setState } from 'lib/store';
import styles from './MoreButton.module.css';
import Loading from './Loading';

export default function MoreButton({ style }) {
  const router = useRouter();
  const { loading, after, items } = useStore();
  const [type, id] = router.query?.id || [];

  function handleClick() {
    load(type, id, { after }).then(() =>
      setState(state => {
        state.index = items.length;
      }),
    );
  }

  return (
    <div className={styles.button} style={style} onClick={handleClick}>
      {loading ? <Loading /> : 'More'}
    </div>
  );
}
