import fs from 'fs'
import path from 'path'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import parseYAML from './parse-yaml'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import { Element } from 'hast'
import rehypeAutolinkHeadings, { Options as AutolinkOptions } from 'rehype-autolink-headings'
import enhanceCodeBlocks from './enhance-code-blocks'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypeStringify from 'rehype-stringify'


const MARKDOWN_FOLDER = path.join(process.cwd(), 'markdown')


const fetchDataFromMarkdown = async (slug: string) => {
  const file = path.join(MARKDOWN_FOLDER, `${slug}.md`)
  const autolinkOpts: AutolinkOptions = {
    content: <Element> {
      type: 'element',
      tagName: 'img',
      properties: { src: '/img/link-45deg.svg', width: 48, height: 48, alt: 'Permalink' },
      children: [],
    },
  }

  const html = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(parseYAML)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, autolinkOpts)
    .use(enhanceCodeBlocks)
    .use(rehypePresetMinify)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(fs.readFileSync(file, 'utf8'))

  // Integrate YAML data with `slug` and `html`
  return {
    ...html.data,
    slug: slug,
    html: html.toString(),
  }
}

export const getSlugs = (except: Array<string> = []) => {
  const slugs: Array<string> = []
  fs.readdirSync(MARKDOWN_FOLDER).forEach(file => {
    slugs.push(path.basename(file, '.md'))
  })
  return slugs.filter(slug => !except.includes(slug))
}

export const dataFromSlug = async (slug: string) => {
  return await fetchDataFromMarkdown(slug)
}
