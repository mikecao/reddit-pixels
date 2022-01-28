import styles from './Media.module.css';

export default function Media({ type, src }) {
  return (
    <div className={styles.media}>
      {type === 'video' && <video src={src} autoPlay loop playsInline />}
      {type === 'image' && <img src={src} alt="" />}
      {type === 'embed' && src}
    </div>
  );
}
