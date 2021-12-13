import { Parent } from 'unist-util-visit'
import { unified } from 'unified'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings, { Options as AutolinkOptions } from 'rehype-autolink-headings'
import { Element } from 'hast'

const autolinkHeaders = () => {
  const autolinkOpts: AutolinkOptions = {
    content: <Element> {
      type: 'element',
      tagName: 'img',
      properties: { src: '/img/link-45deg.svg', width: 48, height: 48, alt: 'Permalink' },
      children: [],
    },
  }
  const slugger = rehypeSlug() as Function
  const autolinker = rehypeAutolinkHeadings(autolinkOpts) as Function
  return (tree: Parent) => {
    slugger(tree)
    autolinker(tree)
  }
}

export default autolinkHeaders
