import { useRef } from 'react';
import styles from './View.module.css';
import Links from './Links';
import Header from './Header';
import Media from './Media';
import Counter from './Counter';
import { load } from 'lib/store';

export default function View({ category, url, item, items, after, loading, onChange }) {
  const { type, src } = item;
  const activeIndex = items.indexOf(item);
  const view = useRef();

  async function handleClick(e) {
    if (loading) {
      return;
    }

    if (e.clientX / view.current.clientWidth > 0.5) {
      const newItem = items[activeIndex + 1];

      if (!newItem) {
        load(category, url, { after });
      } else {
        onChange(newItem);
      }
    } else {
      onChange(activeIndex > 0 ? items[activeIndex - 1] : item);
    }
  }

  return (
    <div ref={view} className={styles.view} onClick={handleClick}>
      <Header item={item} />
      <Media type={type} src={src} />
      <Links item={item} />
      <Counter current={activeIndex + 1} total={items.length} />
    </div>
  );
}
