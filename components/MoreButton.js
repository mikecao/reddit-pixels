import Loading from 'components/Loading';
import useStore, { load } from 'lib/store';
import styles from './MoreButton.module.css';

export default function MoreButton({ category, path, style }) {
  const { loading, after } = useStore();

  function handleClick() {
    load(category, path, { after });
  }

  return (
    <div className={styles.button} style={style} onClick={handleClick}>
      {loading ? <Loading /> : 'More'}
    </div>
  );
}
