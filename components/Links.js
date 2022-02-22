import { useState } from 'react';
import classNames from 'classnames';
import Icon from './Icon';
import { getExtension } from 'lib/utils';
import Message from 'assets/message.svg';
import User from 'assets/image-user.svg';
import Reddit from 'assets/reddit.svg';
import Image from 'assets/image.svg';
import Plus from 'assets/plus.svg';
import Expand from 'assets/expand.svg';
import Compress from 'assets/compress.svg';
import styles from './Links.module.css';

export default function Links({ item }) {
  const [show, setShow] = useState(true);
  const [fullscreen, setFullscreen] = useState(!!document.fullscreenElement);
  const { id, permalink, subreddit, author, src } = item;

  const links = [
    [Message, `https://www.reddit.com/${permalink}`, 'comments'],
    [Reddit, `https://www.reddit.com/r/${subreddit}`, 'subreddit'],
    [User, `https://www.reddit.com/user/${author}`, 'user'],
    [Image, src, 'media'],
  ];

  function handleClick(e) {
    e.stopPropagation();
  }

  function handleShow(e) {
    e.preventDefault();
    e.stopPropagation();

    setShow(state => !state);
  }

  function handleFullscreen(e) {
    e.preventDefault();

    if (fullscreen) {
      document.exitFullscreen();
      setFullscreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    }
  }

  return (
    <div className={styles.links}>
      {show &&
        links.map(([icon, url, title], i) => (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noreferrer"
            onClick={handleClick}
            download={`${id}${getExtension(url)}`}
          >
            <Icon icon={icon} />
            <div className={styles.title}>{title}</div>
          </a>
        ))}
      <a className={classNames(styles.button, { [styles.show]: show })} onClick={handleShow}>
        <Icon icon={Plus} />
      </a>
      {show && (
        <div className={styles.options}>
          {document.fullscreenEnabled && (
            <a onClick={handleFullscreen}>
              <Icon icon={fullscreen ? Compress : Expand} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
