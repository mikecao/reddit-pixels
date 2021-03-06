import { useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import Links from './Links';
import Header from './Header';
import Media from './Media';
import Counter from './Counter';
import { load } from 'lib/store';
import styles from './View.module.css';

export default function View({ category, path, item, items, after, loading, onChange }) {
  const { type, src } = item;
  const activeIndex = items.indexOf(item);
  const nextItem = items[activeIndex + 1];
  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
  });

  useEffect(() => {
    if (nextItem && nextItem.type === 'image') {
      new Image().src = nextItem.src;
    }
  }, [nextItem]);

  async function handlePrevious() {
    if (loading) {
      return;
    }

    onChange(activeIndex > 0 ? items[activeIndex - 1] : item);
  }

  async function handleNext() {
    if (loading) {
      return;
    }

    if (nextItem) {
      onChange(nextItem);
    } else if (after) {
      load(category, path, { after });
    }
  }

  return (
    <div {...handlers} className={styles.view}>
      <Header item={item} />
      <Media type={type} src={src} />
      <Links item={item} />
      <Counter current={activeIndex + 1} total={items.length} />
      <div className={styles.left} onClick={handlePrevious} />
      <div className={styles.right} onClick={handleNext} />
    </div>
  );
}
