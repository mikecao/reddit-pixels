import styles from './Counter.module.css';

export default function Counter({ current, total }) {
  return (
    <div className={styles.counter}>
      {current} / {total}
    </div>
  );
}
