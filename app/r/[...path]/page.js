import Browse from 'components/Browse';

export default function RedditBrowsePage({ params }) {
  return <Browse category="r" path={params.path.join('/')} />;
}
