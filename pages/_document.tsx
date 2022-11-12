import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Boda de Cris y Fran</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7F9867" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <meta name="apple-mobile-web-app-status-bar" content="7F9867" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
