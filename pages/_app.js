import Head from 'next/head'

import '../styles/style.css'
import '../styles/spinner.css'
import 'react-toastify/dist/ReactToastify.css'

function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }

      body {
        font-family: 'Open Sans', sans-serif;
      }

      /* App fit Height */
      html,
      body,
      #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }

      #__next {
        flex: 1;
      }

      /* ./App fit Height */
    `}</style>
  )
}

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <link rel="shortcut icon" href="/assets/logo-ico-icq.png" />
        <link rel="apple-touch-icon" href="/assets/logo-ico-icq.png" />
        <meta name="theme-color" content="#7BC47F" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
