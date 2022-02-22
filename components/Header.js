import Link from 'next/link';
import styles from './Header.module.css';

export default function Header({ item }) {
  const { title, subreddit, author } = item;
  const subLink = subreddit ? `/r/${subreddit}` : undefined;
  const userLink = `/u/${author}`;

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <div>{title}</div>
      </div>
      <div className={styles.links}>
        {author !== '[deleted]' ? (
          <Link href={userLink}>
            <a>{userLink}</a>
          </Link>
        ) : (
          userLink
        )}
        {subLink && (
          <Link href={subLink}>
            <a>{subLink}</a>
          </Link>
        )}
      </div>
    </div>
  );
}
