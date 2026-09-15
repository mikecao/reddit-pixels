import 'styles/globals.css';

export const metadata = {
  title: 'reddit pixels',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
