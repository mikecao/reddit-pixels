import useStore from 'lib/store';
import styles from './Counter.module.css';

export default function Counter() {
  const { index, items } = useStore();

  return (
    <div className={styles.counter}>
      {index + 1} / {items.length}
    </div>
  );
}
