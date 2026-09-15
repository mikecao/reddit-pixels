import Browse from 'components/Browse';

export default function UserBrowsePage({ params }) {
  return <Browse category="u" path={params.path.join('/')} />;
}
