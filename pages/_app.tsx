import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Adg = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{pageProps.title}</title>
        <meta name="description" content="{pageProps.description}" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        <li><Link href="/"><a>Home</a></Link></li>
        <li><Link href="/tutorial"><a>Tutorial</a></Link></li>
      </ul>
      <main className={styles.main}>
        <Component {...pageProps}/>
      </main>
      <footer className={styles.footer}>
        Developed by
        <a href="https://www.entidi.com">
          <Image src="/entidi.svg" alt="eNTiDi logo" width={16} height={16} />
          &nbsp;eNTiDi software
        </a>
      </footer>
    </div>
  )
}

export default Adg
