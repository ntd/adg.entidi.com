import fs from 'fs'
import path from 'path'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkRehype from 'remark-rehype'
import hljs from 'highlight.js'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings, { Options as AutolinkOptions } from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
import { visit, Parent } from 'unist-util-visit'
import { VFile } from 'vfile'
import { ElementContent } from 'hast'

// js-yaml does not support import yet
const yaml = require('js-yaml')


const AUTOLINK_OPTIONS: AutolinkOptions = {
  content: <ElementContent> {
    type: 'element',
    tagName: 'img',
    properties: { src: '/img/link-45deg.svg', width: 48, height: 48, alt: 'Permalink' },
    children: [],
  },
}
const MARKDOWN_FOLDER = path.join(process.cwd(), 'markdown')


const parseYAML = () =>
  (tree: Parent, file: VFile) => {
    const node: { [key: string]: any } = tree.children[0]
    if ('value' in node) {
      file.data = yaml.load(node.value)
    }
  }

const highlightCode = (code: string, lang: string) =>
  hljs.highlight(code, { language: lang }).value as string

const enhanceCodeBlocks = () =>
  (tree: Parent) => {
    visit(tree, 'element', (node: Parent, index: number, parent: Parent) => {
      if (parent?.tagName != 'pre' || node.tagName != 'code' || node.children[0]?.type != 'text') {
        return
      }
      const child = node.children[0]
      const lang = node.properties.className[0].substring(9)
      node.properties.className.push('hljs')
      child.type = 'raw'
      child.value = highlightCode(child.value, lang)
    })
  }

const fetchDataFromMarkdown = async (slug: string) => {
  const file = path.join(MARKDOWN_FOLDER, `${slug}.md`)

  const html = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, [ 'yaml' ])
    .use(parseYAML)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, AUTOLINK_OPTIONS)
    .use(enhanceCodeBlocks)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(fs.readFileSync(file, 'utf8'))

  // Integrate YAML data with `slug` and `html`
  return {
    ...html.data,
    slug: slug,
    html: html.toString(),
  }
}

export const getSlugs = () => {
  const slugs: Array<string> = []
  fs.readdirSync(MARKDOWN_FOLDER).forEach(file => {
    slugs.push(path.basename(file, '.md'))
  })
  return slugs
}

export const dataFromSlug = async (slug: string) => {
  return await fetchDataFromMarkdown(slug)
}
