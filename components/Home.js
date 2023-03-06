import Link from 'next/link';
import Icon from './Icon';
import Dots from 'assets/dots.svg';
import styles from './Home.module.css';

const links = ['/r/pics', '/r/art', '/r/comics', '/r/awww'];

export default function Home() {
  return (
    <div className={styles.welcome}>
      <h3>
        <Icon icon={Dots} label="reddit pixels" />
      </h3>
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
      <p>
        <a href="/list">more subreddits →</a>
      </p>
      <p>
        <a href="/list/nsfw">nsfw subreddits →</a>
      </p>
    </div>
  );
}
