import { useState } from 'react'
import Head from 'next/head'
import { getShard, getShardSlugs } from '../../lib/shards'

function linkLabel(href) {
  return href.replace(/^https?:\/\//i, '')
}

function RichText({ text }) {
  const parts = text.split(/(\{[^}]+\})/g)

  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^\{([^}]+)\}$/)
        if (!match) {
          return <span key={index}>{part}</span>
        }

        const href = match[1]
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-[#E34234] opacity-100 underline underline-offset-2"
          >
            {linkLabel(href)}
          </a>
        )
      })}
    </>
  )
}

function MetaByline({ meta }) {
  const [open, setOpen] = useState(false)
  const summary = `${meta.version}, written on ${meta.date}`
  const canExpand = Boolean(meta.thanks)

  if (!canExpand) {
    return <p className="shard-meta">{summary}</p>
  }

  return (
    <button
      type="button"
      className="shard-meta shard-meta-toggle"
      aria-expanded={open}
      onClick={() => setOpen((value) => !value)}
    >
      <span>{summary}</span>
      {open ? (
        <span className="shard-meta-thanks">
          thanks to {meta.thanks} for helpful feedback on this work
        </span>
      ) : null}
    </button>
  )
}

export default function ShardPage({ title, meta, blocks }) {
  return (
    <div className="bg-ink text-starlight min-h-screen font-['DIN-Mono']">
      <Head>
        <title>{title}</title>
      </Head>

      <main className="max-w-[768px] mx-auto px-5 py-16 min-h-screen flex flex-col justify-center text-justify">
        <h1 className="text-3xl mb-2 text-left">{title}</h1>
        {meta ? <MetaByline meta={meta} /> : null}
        {blocks.length > 0 ? (
          <div className={`text-lg leading-relaxed space-y-6 ${meta ? 'mt-8' : ''}`}>
            {blocks.map((block, index) =>
              block.type === 'quote' ? (
                <blockquote
                  key={index}
                  className="shard-quote border-l-2 border-starlight/40 pl-4 text-starlight/80 italic space-y-2"
                >
                  {block.parts.map((part, partIndex) =>
                    part.type === 'byline' ? (
                      <footer key={partIndex} className="shard-byline">
                        <RichText text={part.content} />
                      </footer>
                    ) : (
                      <p key={partIndex} className="text-justify whitespace-pre-wrap m-0">
                        <RichText text={part.content} />
                      </p>
                    )
                  )}
                </blockquote>
              ) : (
                <p key={index} className="m-0">
                  <RichText text={block.content} />
                </p>
              )
            )}
          </div>
        ) : null}
      </main>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = getShardSlugs().map((name) => ({
    params: { name },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const shard = getShard(params.name)
  return {
    props: {
      title: shard.title,
      meta: shard.meta,
      blocks: shard.blocks,
    },
  }
}
