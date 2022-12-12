import Head from 'next/head'

export function DocumentHead() {
  return (
    <Head>
      <title>Hangry NextJS</title>
      <meta
        name="description"
        content="Get the latest food available on Hangry NextJS!"
      />
      {/* TODO: add favicon.ico */}
      <link rel="icon" href="/img/chicken-royle-small.png" />

      {/* Web Manifest & polyfills */}
      <link rel="manifest" href="/manifest.json" />

      <meta name="theme-color" content="#09cbd2" />
      <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
      <link
        rel="apple-touch-icon"
        sizes="75x75"
        href="/img/chicken-royle-small.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="200x200"
        href="/img/chicken-royle-medium.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="512x512"
        href="/img/chicken-royle-large.png"
      />
    </Head>
  )
}
