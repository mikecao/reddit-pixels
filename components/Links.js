import { useState } from 'react';
import Icon from './Icon';
import Message from 'assets/message.svg';
import User from 'assets/image-user.svg';
import Reddit from 'assets/reddit.svg';
import Image from 'assets/image.svg';
import Plus from 'assets/plus.svg';
import styles from './Links.module.css';
import classNames from 'classnames';

export default function Links({ item }) {
  const [show, setShow] = useState(true);
  const { permalink, subreddit, author, url } = item;

  const links = [
    [Message, `https://www.reddit.com/${permalink}`, 'comments'],
    [Reddit, `https://www.reddit.com/r/${subreddit}`, 'subreddit'],
    [User, `https://www.reddit.com/user/${author}`, 'poster'],
    [Image, url, 'media'],
  ];

  function handleClick(e) {
    e.stopPropagation();
  }

  function handleShow(e) {
    e.preventDefault();
    e.stopPropagation();

    setShow(state => !state);
  }

  return (
    <div className={styles.links}>
      {show &&
        links.map(([icon, url, title], i) => (
          <a key={i} href={url} target="_blank" rel="noreferrer" onClick={handleClick}>
            <Icon icon={icon} />
            <div className={styles.title}>{title}</div>
          </a>
        ))}
      <a className={classNames(styles.button, { [styles.show]: show })} onClick={handleShow}>
        <Icon icon={Plus} />
      </a>
    </div>
  );
}
