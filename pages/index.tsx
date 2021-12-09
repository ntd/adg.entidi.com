import type { GetStaticProps } from 'next'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { dataFromMarkdown } from '../lib/api'

const Home = (props: { [key: string]: string }) =>
  <div>
    <div className={styles.grid}>
      <Link href="/tutorial">
        <a className={styles.card}><h2>Tutorial &rarr;</h2></a>
      </Link>
      <Link href="/download">
        <a className={styles.card}><h2>Download &rarr;</h2></a>
      </Link>
      <a href="https://track.entidi.com/tag/adg/" className={styles.card}>
        <h2>Bug tracker &rarr;</h2>
      </a>
    </div>
    <div dangerouslySetInnerHTML={{ __html: props.html }} />
  </div>

export const getStaticProps: GetStaticProps = async (context) => ({
  props: await dataFromMarkdown(import.meta.url),
})

export default Home
