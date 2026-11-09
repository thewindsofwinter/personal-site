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
  const match = line.trim().match(/^~\s+(\S+)\s+(\S+)(?:\s+\[([^\]]*)\])?\s*$/)
  if (!match) return null

  return {
    date: match[1].replace(/-/g, ' '),
    version: match[2],
    thanks: (match[3] || '').trim(),
  }
}

function extractFootnotes(rawBody) {
  const lines = rawBody.split(/\r?\n/)
  const footnotes = []
  const bodyLines = []

  for (const line of lines) {
    const match = line.match(/^\[\^([^\]]+)\]\s+(.*)$/)
    if (match) {
      footnotes.push({ id: match[1], content: match[2] })
    } else {
      bodyLines.push(line)
    }
  }

  return { footnotes, body: bodyLines.join('\n') }
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

    const parts = []
    let textBuf = []

    const flushQuoteText = () => {
      if (textBuf.length === 0) return
      const content = textBuf.join(' ').replace(/\s+/g, ' ').trim()
      if (content) {
        parts.push({ type: 'text', content })
      }
      textBuf = []
    }

    for (const part of quoteLines) {
      if (part.type === 'byline') {
        flushQuoteText()
        parts.push(part)
      } else {
        textBuf.push(part.content)
      }
    }
    flushQuoteText()

    blocks.push({ type: 'quote', parts })
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

  const rawBody = lines.slice(bodyStart).join('\n')
  const { footnotes, body } = extractFootnotes(rawBody)
  const blocks = parseBody(body)

  return { slug, title, meta, body, blocks, footnotes }
}

export function getAllShards() {
  return getShardSlugs().map((slug) => {
    const { title } = getShard(slug)
    return { slug, title }
  })
}
