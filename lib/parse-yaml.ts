import { Parent } from 'unist-util-visit'
import { VFile } from 'vfile'
import { YAML } from 'mdast'

// js-yaml does not support import yet
const yaml = require('js-yaml')


const parseYAML = () =>
  (tree: Parent, file: VFile) => {
    const node = tree.children[0] as YAML
    file.data = yaml.load(node.value)
  }

export default parseYAML
