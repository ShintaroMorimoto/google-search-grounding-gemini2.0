import { reactRenderer } from '@hono/react-renderer';
import { Link, Script } from 'honox/server';

export default reactRenderer(({ children }) => {
  return (
    <html lang='ja'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='/gemini-color.svg' />
        <Link href='/app/style.css' rel='stylesheet' />
        <Script src='/app/client.ts' async />
      </head>
      <body>{children}</body>
    </html>
  );
});
