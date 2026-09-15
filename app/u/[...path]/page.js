import Browse from 'components/Browse';

export default async function UserBrowsePage({ params }) {
  const { path } = await params;

  return <Browse category="u" path={path.join('/')} />;
}
