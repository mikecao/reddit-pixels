import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useStore, { load, reset } from 'lib/store';
import styles from './Browse.module.css';
import View from './View';
import Thumbs from './Thumbs';
import Loading from "./Loading";

export default function Browse() {
  const [index, setIndex] = useState(0);
  const { items, after } = useStore();
  const router = useRouter();
  const [type, id] = router.query?.id || [];
  const item = items[index]?.data;

  function handleThumbClick(value) {
    setIndex(value);
  }

  function handleLoadMore() {
    load(type, id, { after });
  }

  function handleChange(i) {
    if (index + i >= 0 && index + i < items.length) {
      setIndex(state => state + i);
    }
  }

  useEffect(() => {
    if (type && id) {
      reset();
      load(type, id).then(() => setIndex(0));
    }
  }, [type, id]);

  if (!items || !item) {
    return <Loading />;
  }

  console.log({ items, item });

  return (
    <div className={styles.browse}>
      <View item={item} count={`${index + 1} / ${items.length}`} onChange={handleChange} />
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
