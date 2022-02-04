import { useRef } from 'react';
import { getMedia } from 'lib/parse';
import styles from './View.module.css';
import Footer from './Footer';
import Header from './Header';
import Media from './Media';

export default function View({ item, count, onChange }) {
  const { type, src } = getMedia(item);
  const view = useRef();

  function handleClick(e) {
    onChange(e.clientX / view.current.clientWidth > 0.5 ? 1 : -1);
  }

  return (
    <div ref={view} className={styles.view} onClick={handleClick}>
      <Header item={item} />
      <Media type={type} src={src} />
      <Footer item={item} />
      <div className={styles.count}>{count}</div>
    </div>
  );
}
