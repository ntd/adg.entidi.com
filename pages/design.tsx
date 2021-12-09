import type { GetStaticProps } from 'next'
import { dataFromMarkdown } from '../lib/api'

const Design = (props: { [key: string]: string }) =>
  <div dangerouslySetInnerHTML={{ __html: props.html }} />

export const getStaticProps: GetStaticProps = async (context) => ({
  props: await dataFromMarkdown(import.meta.url),
})

export default Design
