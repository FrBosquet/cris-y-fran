import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Boda de Cris y Fran</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="icon" href="/favicon-white.png" media="(prefers-color-scheme:dark)"/>
        <link rel="icon" href="/favicon.png" media="(prefers-color-scheme:light)"/>
        <meta name="theme-color" content="#7F9867" />
        <meta name="apple-mobile-web-app-status-bar" content="7F9867" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
