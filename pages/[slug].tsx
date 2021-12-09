import type { GetStaticPaths, GetStaticProps } from 'next'
import { MARKDOWN_FOLDER, dataFromMarkdown } from '../lib/api'
import fs from 'fs'
import path from 'path'

const Page = (props: { [key: string]: string }) =>
  <div dangerouslySetInnerHTML={{ __html: props.html }} />

export const getStaticPaths: GetStaticPaths = async () => {
  // Enumerate markdown files, whitelisting their names as valid slugs
  const paths: any[] = []
  fs.readdirSync(MARKDOWN_FOLDER).forEach(file => {
    const route = { slug: path.basename(file, '.md') }
    paths.push({ params: route })
  })
  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => ({
  props: await dataFromMarkdown(context?.params?.slug as string)
})

export default Page
