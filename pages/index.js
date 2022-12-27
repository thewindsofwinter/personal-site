import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Head>
        <title>Andy Tang</title>
        <meta name="description" content="Software engineer, Stanford freshman, and stargazer. I seek to build tools which will empower others to dream." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <h1 className="text-3xl font-bold underline text-white">
        Hello world!
      </h1>
    </div>
  )
}
