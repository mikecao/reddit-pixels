import Link from 'next/link';
import Icon from './Icon';
import Dots from 'assets/dots.svg';
import styles from './Welcome.module.css';

const links = ['/r/all', '/r/pics', '/r/awww', '/r/art'];

export default function Welcome() {
  return (
    <div className={styles.welcome}>
      <h1>
        <Icon icon={Dots} label="reddit pixels" />
      </h1>
      <h3>just the pixels</h3>
      <p>
        enter a <b>/r/subreddit</b> in the url
        <br />
        or try one of these subreddits
      </p>
      <ul>
        {links.map(href => (
          <li key={href}>
            <Link href={href}>{href}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
