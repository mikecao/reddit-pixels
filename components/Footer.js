import Icon from './Icon';
import Message from 'assets/message.svg';
import User from 'assets/image-user.svg';
import Reddit from 'assets/reddit.svg';
import styles from './Footer.module.css';

export default function Footer({ item }) {
  const { permalink, subreddit, author } = item;

  const links = [
    [Reddit, `/r/${subreddit}`, 'subreddit'],
    [Message, permalink, 'comments'],
    [User, `/user/${author}`, 'author'],
  ];

  return (
    <div className={styles.footer}>
      <div className={styles.links}>
        {links.map(([icon, url, title], i) => (
          <a
            key={i}
            href={`https://www.reddit.com${url}`}
            target="_blank"
            rel="noreferrer"
            title={title}
            onClick={e => e.stopPropagation()}
          >
            <Icon icon={icon} />
          </a>
        ))}
      </div>
    </div>
  );
}
