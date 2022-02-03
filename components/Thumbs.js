import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './Thumbs.module.css';

export default function Thumbs({ items, activeIndex, onSelect, hasMore = false, onLoad }) {
  const thumbs = useRef();

  function handleClick(e, index) {
    e.stopPropagation();
    onSelect(index);
  }

  useEffect(() => {
    document
      .getElementById(`thumb-${activeIndex}`)
      .scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
  }, [activeIndex]);

  return (
    <div ref={thumbs} className={styles.thumbs}>
      {items.map((item, index) => {
        const { id, thumbnail, url } = item.data;
        const src = thumbnail?.startsWith('http') ? thumbnail : url;

        return (
          <div
            id={`thumb-${index}`}
            key={id}
            className={classNames(styles.thumb, { [styles.active]: index === activeIndex })}
            onClick={e => handleClick(e, index)}
          >
            <img src={src} alt="" />
          </div>
        );
      })}
      {hasMore && (
        <div className={styles.button} onClick={onLoad}>
          More
        </div>
      )}
    </div>
  );
}
