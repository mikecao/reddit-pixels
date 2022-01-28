import styles from './Icon.module.css';

export default function Icon({ icon: Component }) {
  return (
    <div className={styles.icon}>
      <Component />
    </div>
  );
}
