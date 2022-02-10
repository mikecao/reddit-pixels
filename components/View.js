import { useRef, useEffect } from 'react';
import styles from './View.module.css';
import Links from './Links';
import Header from './Header';
import Media from './Media';
import Counter from './Counter';
import { load } from 'lib/store';

export default function View({ category, path, item, items, after, loading, onChange }) {
  const { type, src } = item;
  const activeIndex = items.indexOf(item);
  const nextItem = items[activeIndex + 1];
  const view = useRef();

  useEffect(() => {
    if (nextItem && nextItem.type === 'image') {
      new Image().src = nextItem.src;
    }
  }, [nextItem]);

  async function handleClick(e) {
    if (loading) {
      return;
    }

    if (e.clientX / view.current.clientWidth > 0.5) {
      if (!nextItem) {
        load(category, path, { after });
      } else {
        onChange(nextItem);
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
