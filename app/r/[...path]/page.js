import Browse from 'components/Browse';

export default async function RedditBrowsePage({ params }) {
  const { path } = await params;

  return <Browse category="r" path={path.join('/')} />;
}
