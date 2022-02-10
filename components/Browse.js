import { useEffect } from 'react';
import useStore, { load, reset, setState } from 'lib/store';
import View from './View';
import Thumbs from './Thumbs';
import Loading from './Loading';
import { log } from 'lib/utils';
import styles from './Browse.module.css';

export default function Browse({ category, url }) {
  const { item, items, after, loading } = useStore();
  const hasItem = items && item;

  function handleChange(item) {
    setState({ item });
  }

  useEffect(() => {
    if (category && url) {
      reset();
      load(category, url);
    }
  }, [category, url]);

  log({ item });

  return (
    <div className={styles.browse}>
      {loading && <Loading />}
      {item && (
        <>
          <View
            category={category}
            url={url}
            item={item}
            items={items}
            after={after}
            loading={loading}
            onChange={handleChange}
          />
          <Thumbs item={item} items={items} onSelect={handleChange} hasMore={Boolean(after)} />
        </>
      )}
      {!loading && !hasItem && <div className={styles.message}>nothing here.</div>}
    </div>
  );
}
