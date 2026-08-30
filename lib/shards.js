import fs from 'fs'
import path from 'path'

const shardsDirectory = path.join(process.cwd(), 'content', 'shards')

export function getShardSlugs() {
  if (!fs.existsSync(shardsDirectory)) {
    return []
  }

  return fs
    .readdirSync(shardsDirectory)
    .filter((file) => file.endsWith('.txt'))
    .map((file) => file.replace(/\.txt$/, ''))
}

function parseMetaLine(line) {
  const match = line.trim().match(/^~\s+(\S+)\s+(\S+)\s+\[([^\]]*)\]\s*$/)
  if (!match) return null

  return {
    date: match[1].replace(/-/g, ' '),
    version: match[2],
    thanks: match[3].trim(),
  }
}

function parseBody(rawBody) {
  const lines = rawBody.replace(/^\n+/, '').replace(/\n+$/, '').split(/\r?\n/)
  const blocks = []
  let textLines = []
  let quoteLines = []

  const flushText = () => {
    if (textLines.length === 0) return

    let paragraphLines = []
    const flushParagraph = () => {
      if (paragraphLines.length === 0) return
      const content = paragraphLines.join(' ').replace(/\s+/g, ' ').trim()
      if (content) {
        blocks.push({ type: 'text', content })
      }
      paragraphLines = []
    }

    for (const line of textLines) {
      if (line.trim() === '') {
        flushParagraph()
      } else {
        paragraphLines.push(line.trim())
      }
    }
    flushParagraph()
    textLines = []
  }

  const flushQuote = () => {
    if (quoteLines.length === 0) return
    blocks.push({ type: 'quote', parts: quoteLines })
    quoteLines = []
  }

  for (const line of lines) {
    if (line.startsWith('>-')) {
      flushText()
      quoteLines.push({ type: 'byline', content: line.replace(/^>-\s?/, '') })
    } else if (line.startsWith('>')) {
      flushText()
      quoteLines.push({ type: 'text', content: line.replace(/^>\s?/, '') })
    } else {
      flushQuote()
      textLines.push(line)
    }
  }

  flushText()
  flushQuote()
  return blocks
}

export function getShard(slug) {
  const fullPath = path.join(shardsDirectory, `${slug}.txt`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const lines = fileContents.split(/\r?\n/)
  const title = lines[0] ?? ''

  let bodyStart = 1
  let meta = null
  if (lines[1] && lines[1].trim().startsWith('~')) {
    meta = parseMetaLine(lines[1])
    if (meta) {
      bodyStart = 2
    }
  }

  const body = lines.slice(bodyStart).join('\n')
  const blocks = parseBody(body)

  return { slug, title, meta, body, blocks }
}

export function getAllShards() {
  return getShardSlugs().map((slug) => {
    const { title } = getShard(slug)
    return { slug, title }
  })
}
