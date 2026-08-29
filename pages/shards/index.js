import Head from 'next/head'
import Link from 'next/link'
import { getAllShards } from '../../lib/shards'

export default function ShardsIndex({ shards }) {
  return (
    <div className="bg-ink text-starlight min-h-screen font-['DIN-Mono']">
      <Head>
        <title>Shards | Andy Tang</title>
      </Head>

      <main className="max-w-[768px] mx-auto px-5 py-16 min-h-screen flex flex-col justify-center">
        <h1 className="text-center text-3xl mb-10">Shards</h1>
        <ul className="text-center space-y-4 list-none p-0 m-0">
          {shards.map((shard) => (
            <li key={shard.slug}>
              <Link href={`/shards/${shard.slug}`}>{shard.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const shards = getAllShards()
  return { props: { shards } }
}
