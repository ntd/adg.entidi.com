import fs from 'fs'
import path from 'path'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkRehype from 'remark-rehype'
import hljs from 'highlight.js'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'

// js-yaml does not support import yet
const yaml = require('js-yaml');


const MARKDOWN_FOLDER = path.join(process.cwd(), 'markdown')

const highlighter: string = (code: string, lang?: string) => {
  return hljs.highlight(code, { language: lang }).value
}

const fetchDataFromMarkdown = async (slug: string) => {
  const fullPath = path.join(MARKDOWN_FOLDER, `${slug}.md`)
  const contents = fs.readFileSync(fullPath, 'utf8')

  let data: { [key: string]: string } = {}
  const html = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(() => (tree) => {
      // Parse and save the initial YAML
      if ('value' in tree.children[0]) {
        data = yaml.load(tree.children[0].value as string)
      }
    })
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      content: {
        type: 'element',
        tagName: 'img',
        properties: { src: '/img/link-45deg.svg', width: 48, height: 48, alt: 'Permalink' },
      },
    })
    .use(() => (tree) => {
      visit(tree, 'element', (node, _, parent) => {
        if (parent?.tagName != 'pre' || node.tagName != 'code' || node.children[0]?.type != 'text') {
          return
        }
        const child = node.children[0]
        const lang = node.properties.className[0].substring(9)
        node.properties.className.push('hljs')
        child.type = 'raw'
        child.value = highlighter(child.value, lang)
      })
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(contents)
  // Integrate YAML data with some field
  data.slug = slug
  data.html = html.toString()
  return data
}

export const getSlugs: string[] = () => {
  const slugs: string[] = []
  fs.readdirSync(MARKDOWN_FOLDER).forEach(file => {
    slugs.push(path.basename(file, '.md'))
  })
  return slugs
}

export const dataFromSlug = async (slug: string) => {
  return await fetchDataFromMarkdown(slug)
}
