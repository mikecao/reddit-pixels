import styles from './Thumbs.module.css';

export default function Thumbs({ items, onSelect, hasMore = false, onLoad }) {
  function handleClick(e, index) {
    e.stopPropagation();
    onSelect(index);
  }

  return (
    <div className={styles.thumbs}>
      {items.map((item, i) => {
        const { id, thumbnail, url } = item.data;
        const src = thumbnail?.startsWith('http') ? thumbnail : url;

        return (
          <div key={id} className={styles.thumb} onClick={e => handleClick(e, i)}>
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
