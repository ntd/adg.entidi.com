import fs from 'fs'
import path from 'path'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
// js-yaml does not support import yet
const yaml = require('js-yaml');


export const MARKDOWN_FOLDER = path.join(process.cwd(), 'markdown')

const fetchDataFromMarkdown = async (slug: string) => {
  const fullPath = path.join(MARKDOWN_FOLDER, `${slug}.md`)
  const contents = fs.readFileSync(fullPath, 'utf8')

  let data: { [key: string]: string } = {}
  const html = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(() => (tree) => {
      if ('value' in tree.children[0]) {
        data = yaml.load(tree.children[0].value as string)
      }
    })
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(contents)
  // Integrate YAML data with some field
  data.slug = slug
  data.html = html.toString()
  return data
}

export const dataFromSlug = async (slug: string) => {
  return await fetchDataFromMarkdown(slug)
}
