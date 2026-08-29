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

export default function ShardPage({ title, blocks }) {
  return (
    <div className="bg-ink text-starlight min-h-screen font-['DIN-Mono']">
      <Head>
        <title>{title}</title>
      </Head>

      <main className="max-w-[768px] mx-auto px-5 py-16 min-h-screen flex flex-col justify-center text-justify">
        <h1 className="text-3xl mb-8 text-left">{title}</h1>
        {blocks.length > 0 ? (
          <div className="text-lg leading-relaxed space-y-6">
            {blocks.map((block, index) =>
              block.type === 'quote' ? (
                <blockquote
                  key={index}
                  className="border-l-2 border-starlight/40 pl-4 text-starlight/80 italic space-y-2"
                >
                  {block.parts.map((part, partIndex) =>
                    part.type === 'byline' ? (
                      <footer
                        key={partIndex}
                        className="block text-right not-italic text-starlight/70"
                      >
                        — <RichText text={part.content} />
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
      blocks: shard.blocks,
    },
  }
}
