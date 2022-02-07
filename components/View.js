import { useRef } from 'react';
import styles from './View.module.css';
import Links from './Links';
import Header from './Header';
import Media from './Media';
import Counter from './Counter';

export default function View({ item, onChange }) {
  const { type, src } = item;
  const view = useRef();

  function handleClick(e) {
    onChange(e.clientX / view.current.clientWidth > 0.5 ? 1 : -1);
  }

  return (
    <div ref={view} className={styles.view} onClick={handleClick}>
      <Header item={item} />
      <Media type={type} src={src} />
      <Links item={item} />
      <Counter />
    </div>
  );
}
