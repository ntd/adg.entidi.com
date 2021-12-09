import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export const getFromMarkdown = (slug: string, fields: Array<string> = []) => {
  const fullPath = path.join(process.cwd(), 'markdown', `${slug}.md`)
  const gm: { [key: string]: any } = matter(fs.readFileSync(fullPath, 'utf8'))

  // Ensure only the minimal needed data is exposed
  const items: { [key: string]: any } = {}
  fields.forEach((field) => {
    if (field in gm) {
      items[field] = gm[field]
    } else if (field in gm.data) {
      items[field] = gm.data[field]
    }
  })
  return items
}

export const markdownToHtml = async (markdown: string) => {
  const html = await remark().use(remarkHtml).process(markdown)
  return html.toString()
}
