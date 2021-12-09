import type { GetStaticProps } from 'next'
import path from 'path'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { getFromMarkdown, markdownToHtml } from '../lib/api'

const Tutorial = (data: { [key: string]: string }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content="{data.description}" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div dangerouslySetInnerHTML={{ __html: data.html }} />
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

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = path.basename(import.meta.url, '.tsx')
  const data = getFromMarkdown(slug, [
    'title',
    'description',
    'content',
  ])
  return {
    props: {
      ...data,
      slug: slug,
      html: await markdownToHtml(data.content || ''),
    }
  }
}

export default Tutorial
