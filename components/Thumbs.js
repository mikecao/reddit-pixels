import { useEffect, useRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import classNames from 'classnames';
import styles from './Thumbs.module.css';
import MoreButton from './MoreButton';
import useMeasure from './hooks/useMeasure';

const blank = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

export default function Thumbs({ item, items, onSelect, hasMore = false }) {
  const [ref, measurement] = useMeasure();
  const activeIndex = items.indexOf(item);
  const listRef = useRef();

  function handleClick(e, index) {
    e.stopPropagation();
    onSelect(items[index]);
  }

  const Row = ({ index, style }) => {
    if (index === items.length) {
      return hasMore && <MoreButton style={style} />;
    }

    const { thumbnail } = items[index];
    return (
      <div
        id={`thumb-${index}`}
        style={style}
        className={classNames(styles.thumb, { [styles.active]: index === activeIndex })}
        onClick={e => handleClick(e, index)}
      >
        <img src={thumbnail || blank} alt="" />
      </div>
    );
  };

  useEffect(() => {
    const el = document.getElementById(`thumb-${activeIndex}`);

    if (el) {
      el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
    } else if (listRef.current) {
      listRef.current.scrollToItem(activeIndex, 'center');
    }
  }, [activeIndex]);

  return (
    <div ref={ref} className={styles.thumbs}>
      {measurement?.height && (
        <List
          ref={listRef}
          height={measurement.height}
          width={118}
          itemCount={items.length + 1}
          itemSize={100}
          overscanCount={5}
        >
          {Row}
        </List>
      )}
    </div>
  );
}
