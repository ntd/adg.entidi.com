import type { GetStaticPaths, GetStaticProps } from 'next'
import { getSlugs, dataFromSlug } from '../lib/api'

const Page = (props: { [key: string]: string }) =>
  <div className="contents">
    <div dangerouslySetInnerHTML={{ __html: props.html }} />
  </div>

export const getStaticPaths: GetStaticPaths = async () => ({
  // Do not consider `index` and `demo` pages, handled separately
  paths: getSlugs(['index', 'demo']).map(x => ({ params: { slug: x } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps = async (context) => ({
  props: await dataFromSlug(context?.params?.slug as string)
})

export default Page
