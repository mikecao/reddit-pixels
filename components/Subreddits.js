import styles from './Subreddits.module.css';

export default function Subreddits({ list }) {
  const renderItems = ({ category, items }, all = []) => {
    const parts = [];
    return (
      <div key={category} className={styles.category}>
        <header>{category}</header>
        <ul>
          {items.map(item => {
            if (typeof item === 'string') {
              parts.push(item);
              all.push(item);
              return (
                <li key={item}>
                  <a href={item}>{item}</a>
                </li>
              );
            } else if (typeof item === 'object') {
              return renderItems(item, all);
            }
          })}
          <p>
            <a
              href={`/r/${(parts.length ? parts : all)
                .map(part => part.replace('/r/', ''))
                .join('+')}`}
            >
              combined →
            </a>
          </p>
        </ul>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <a href="/">← home</a>
      {list.map(item => renderItems(item))}
    </div>
  );
}
