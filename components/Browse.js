import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useStore, { load, reset } from 'lib/store';
import styles from './Browse.module.css';
import View from './View';
import Thumbs from './Thumbs';

export default function Browse() {
  const [index, setIndex] = useState(0);
  const { items, after } = useStore();
  const router = useRouter();
  const [type, sub] = router.query?.id || [];
  const item = items[index]?.data;

  function handleClick(e) {
    const i = e.clientX / document.body.clientWidth > 0.5 ? 1 : -1;

    if (index + i >= 0 && index + i < items.length) {
      setIndex(state => state + i);
    }
  }

  function handleThumbClick(value) {
    setIndex(value);
  }

  function handleLoadMore() {
    load(type, sub, { after });
  }

  useEffect(() => {
    if (type && sub) {
      reset();
      load(type, sub);
    }
  }, [type, sub]);

  if (!items || !item) {
    return 'loading...';
  }

  console.log({ items, item });

  return (
    <div className={styles.browse} onClick={handleClick}>
      <View item={item} count={`${index + 1} / ${items.length}`} />
      <Thumbs
        items={items}
        activeIndex={index}
        onSelect={handleThumbClick}
        hasMore={Boolean(after)}
        onLoad={handleLoadMore}
      />
    </div>
  );
}
