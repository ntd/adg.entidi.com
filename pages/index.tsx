import type { GetStaticProps } from 'next'
import { dataFromSlug } from '../lib/api'
import Link from 'next/link'

const HomePage = (props: { [key: string]: string }) =>
  <div className="contents">
    <div className="highlights">
      <Link href="/tutorial"><a>Tutorial</a></Link>
      <Link href="/download"><a>Download</a></Link>
      <Link href="/demo"><a className="demo">Online demo</a></Link>
    </div>
    <div dangerouslySetInnerHTML={{ __html: props.html }} />
  </div>

export const getStaticProps: GetStaticProps = async (context) => ({
  props: await dataFromSlug('index'),
})

export default HomePage
