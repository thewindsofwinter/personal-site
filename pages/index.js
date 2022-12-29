import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Stars from '../components/stars'
import Head from 'next/head'

export default function Home() {

  return (
    <div className="bg-ink min-h-screen">
      <Head>
        <title>Andy Tang</title>
        <meta name="description" content="Software engineer, Stanford freshman, and stargazer. I seek to build tools that empower others to dream." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="absolute left-0 top-0 w-screen h-screen z-0">
        <Canvas
          shadows={false}
          camera={{
            position: [0, 0, 1],
          }}
        >
          
          <Stars size={0.003} multiplier={2} number={5000} />
          <Stars size={0.006} multiplier={2} number={2000} />
          <Stars size={0.01} multiplier={1} number={500} />
        </Canvas>
      </div>

      <div className="relative z-5">
        <h1 className="text-3xl font-bold underline text-starlight">
          Hello world!
        </h1>
      </div>
    </div>
  )
}