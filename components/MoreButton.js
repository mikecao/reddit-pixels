import useRoute from 'components/hooks/useRoute';
import Loading from 'components/Loading';
import useStore, { load } from 'lib/store';
import styles from './MoreButton.module.css';

export default function MoreButton({ style }) {
  const { loading, after } = useStore();
  const { category, path } = useRoute();

  function handleClick() {
    load(category, path, { after });
  }

  return (
    <div className={styles.button} style={style} onClick={handleClick}>
      {loading ? <Loading /> : 'More'}
    </div>
  );
}
