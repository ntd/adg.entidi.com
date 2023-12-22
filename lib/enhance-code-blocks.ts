import { u } from 'unist-builder'
import hljs from 'highlight.js'
import { Parent } from 'unist'
import { visit } from 'unist-util-visit'
import { Element, Properties } from 'hast'


const highlightCode = (code: string, lang: string) =>
  hljs.highlight(code, { language: lang }).value as string

const enhanceCodeBlocks = () =>
  (tree: Parent) => {
    visit(tree, 'element', (node: Element, index: number, parent: Element) => {
      if (parent?.tagName != 'pre' || node.tagName != 'code' || node.children[0]?.type != 'text') {
        return
      }
      // Ensure the `className` array is present
      if (! node.properties?.className) {
        node.properties = <Properties> { 'className': [], }
      }
      const classes = node.properties.className as string[]
      const language = classes[0]?.substring(9) ?? 'plaintext'
      // Add the `hljs` class to <code>
      classes.push('hljs')
      // Replace the text node with a raw node
      node.children[0] = u('raw', highlightCode(node.children[0].value, language))
    })
  }

export default enhanceCodeBlocks
