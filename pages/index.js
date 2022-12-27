import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import sketch from '../sketches/sketch';
const ReactP5Wrapper = React.lazy(() => 
  import('react-p5-wrapper').then(module => ({
    default: module.ReactP5Wrapper
  }))
)

export default function Home() {
  const [SSR, setSSR] = useState(true);
  useEffect(() => setSSR(false), []);

  const isSSR = typeof window === 'undefined';

  return (
    <div className="bg-ink min-h-screen">
      <Head>
        <title>Andy Tang</title>
        <meta name="description" content="Software engineer, Stanford freshman, and stargazer. I seek to build tools which will empower others to dream." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="absolute left-0 top-0 w-screen h-screen z-0">
        {!SSR && 
        (<React.Suspense fallback={<div className="absolute left-0 top-0 w-screen h-screen" />}>
          <ReactP5Wrapper sketch={sketch} />
        </React.Suspense>)
        }
      </div>

      <div className="relative z-5">
        <h1 className="text-3xl font-bold underline text-starlight">
          Hello world!
        </h1>
      </div>
    </div>
  )
}