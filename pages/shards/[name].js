import Head from 'next/head'
import { getShard, getShardSlugs } from '../../lib/shards'

export default function ShardPage({ title, blocks }) {
  return (
    <div className="bg-ink text-starlight min-h-screen font-['DIN-Mono']">
      <Head>
        <title>{title}</title>
      </Head>

      <main className="max-w-[768px] mx-auto px-5 py-16 min-h-screen flex flex-col justify-center text-center">
        <h1 className="text-3xl mb-8">{title}</h1>
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
                        — {part.content}
                      </footer>
                    ) : (
                      <p key={partIndex} className="text-left whitespace-pre-wrap m-0">
                        {part.content}
                      </p>
                    )
                  )}
                </blockquote>
              ) : (
                <p key={index} className="m-0">
                  {block.content}
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
