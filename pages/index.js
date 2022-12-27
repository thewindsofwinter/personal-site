import Head from 'next/head'
import Image from 'next/image'
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketches/sketch';

export default function Home() {
  
  return (
    <div className="bg-ink min-h-screen">
      <Head>
        <title>Andy Tang</title>
        <meta name="description" content="Software engineer, Stanford freshman, and stargazer. I seek to build tools which will empower others to dream." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <P5Wrapper sketch={sketch} className="absolute left-0 top-0 w-screen h-screen"></P5Wrapper>
      <h1 className="text-3xl font-bold underline text-starlight">
        Hello world!
      </h1>
    </div>
  )
}