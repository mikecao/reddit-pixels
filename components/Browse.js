import { useEffect } from 'react';
import useStore, { load, reset, setState } from 'lib/store';
import styles from './Browse.module.css';
import View from './View';
import Thumbs from './Thumbs';
import Loading from './Loading';
import { log } from 'lib/utils';

export default function Browse({ type, id }) {
  const { index, items, after, loading } = useStore();
  const item = items[index];
  const hasItem = items && item;

  function handleThumbClick(index) {
    setState({ index });
  }

  function handleChange(i) {
    if (index + i >= 0 && index + i < items.length) {
      setState(state => {
        state.index += i;
      });
    }
  }

  useEffect(() => {
    if (type && id) {
      reset();
      load(type, id);
    }
  }, [type, id]);

  log({ item });

  return (
    <div className={styles.browse}>
      {loading && <Loading />}
      {hasItem && (
        <>
          <View item={item} count={`${index + 1} / ${items.length}`} onChange={handleChange} />
          <Thumbs
            items={items}
            activeIndex={index}
            onSelect={handleThumbClick}
            hasMore={Boolean(after)}
          />
        </>
      )}
    </div>
  );
}
