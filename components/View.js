import { getMedia } from 'lib/parse';
import styles from './View.module.css';
import Footer from './Footer';
import Header from './Header';
import Media from './Media';

export default function View({ item, count }) {
  const { type, src } = getMedia(item);

  console.log({ type, src });

  return (
    <div className={styles.view}>
      <Header item={item} />
      <Media type={type} src={src} />
      <Footer item={item} />
      <div className={styles.count}>{count}</div>
    </div>
  );
}
