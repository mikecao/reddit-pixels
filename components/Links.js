import Icon from './Icon';
import Message from 'assets/message.svg';
import User from 'assets/image-user.svg';
import Reddit from 'assets/reddit.svg';
import Image from 'assets/image.svg';
import styles from './Links.module.css';

export default function Links({ item }) {
  const { permalink, subreddit, author, url } = item;

  const links = [
    [Message, `https://www.reddit.com/r/${permalink}`, 'comments'],
    [Reddit, `https://www.reddit.com/r/${subreddit}`, 'subreddit'],
    [User, `https://www.reddit.com/user/${author}`, 'poster'],
    [Image, url, 'media'],
  ];

  return (
    <div className={styles.links}>
      {links.map(([icon, url, title], i) => (
        <a
          key={i}
          href={url}
          target="_blank"
          rel="noreferrer"
          onClick={e => e.stopPropagation()}
          alt=""
        >
          <Icon icon={icon} />
          <div className={styles.title}>{title}</div>
        </a>
      ))}
    </div>
  );
}
