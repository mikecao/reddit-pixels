import styles from './Icon.module.css';

export default function Icon({ icon: Component, label }) {
  return (
    <div className={styles.icon}>
      <Component />
      {label && <div className={styles.label}>{label}</div>}
    </div>
  );
}
