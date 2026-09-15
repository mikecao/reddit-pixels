import Link from 'next/link';
import styles from './Subreddits.module.css';

export default function Subreddits({ list }) {
  const renderItems = ({ category, items }, all = [], keyPrefix = category) => {
    const parts = [];
    return (
      <div key={keyPrefix} className={styles.category}>
        <header>{category}</header>
        <ul>
          {items.map((item, index) => {
            const itemKey = `${keyPrefix}-${index}`;

            if (typeof item === 'string') {
              parts.push(item);
              all.push(item);
              return (
                <li key={`${itemKey}-${item}`}>
                  <Link href={item}>{item}</Link>
                </li>
              );
            } else if (typeof item === 'object') {
              return renderItems(item, all, itemKey);
            }

            return null;
          })}
          <p>
            <Link
              href={`/r/${(parts.length ? parts : all)
                .map(part => part.toLowerCase().replace('/r/', ''))
                .sort()
                .join('+')}`}
            >
              combined →
            </Link>
          </p>
        </ul>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Link href="/">← home</Link>
      {list.map(item => renderItems(item))}
    </div>
  );
}
