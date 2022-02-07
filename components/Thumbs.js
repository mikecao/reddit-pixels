import { FixedSizeList as List } from 'react-window';
import { useEffect } from 'react';
import classNames from 'classnames';
import styles from './Thumbs.module.css';
import MoreButton from './MoreButton';
import useMeasure from './hooks/useMeasure';

export default function Thumbs({ items, activeIndex, onSelect, hasMore = false }) {
  const [ref, measurement] = useMeasure();

  function handleClick(e, index) {
    e.stopPropagation();
    onSelect(index);
  }

  const Row = ({ index, style }) => {
    if (index === items.length) {
      return hasMore && <MoreButton style={style} />;
    }

    const { id, thumbnail } = items[index];
    return (
      <div
        id={`thumb-${index}`}
        key={id}
        style={style}
        className={classNames(styles.thumb, { [styles.active]: index === activeIndex })}
        onClick={e => handleClick(e, index)}
      >
        <img src={thumbnail} alt="" />
      </div>
    );
  };

  useEffect(() => {
    document
      .getElementById(`thumb-${activeIndex}`)
      ?.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
  }, [activeIndex]);

  return (
    <div ref={ref} className={styles.thumbs}>
      {measurement?.height && (
        <>
          <List height={measurement.height} width={118} itemCount={items.length + 1} itemSize={100}>
            {Row}
          </List>
        </>
      )}
    </div>
  );
}
