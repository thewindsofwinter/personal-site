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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="absolute left-0 top-0 w-screen h-screen z-0">
        <Canvas
          shadows={false}
          camera={{
            position: [0, 0, 1],
          }}
        >

          <Stars size={0.003} multiplier={2.5} number={4000} />
          <Stars size={0.005} multiplier={2.5} number={2500} />
          <Stars size={0.008} multiplier={2.5} number={1000} />
          <Stars size={0.012} multiplier={1} number={400} />
          <Stars size={0.03} multiplier={1} number={100} />
        </Canvas>
      </div>

      <div className="wrapper relative z-5">
        <div className="header table-cell align-middle w-screen h-screen">
          <table className="m-auto text-white">
            <tbody>
              <tr>
                <th colspan="4" class="logo"><img src="../header.png"></img></th>
              </tr>
              <tr>
                <th class="surname">A</th>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th class="surname">N</th>
                <td class="spacing"></td>
                <td>GitHub</td>
                <td>Email</td>
              </tr>
              <tr>
                <th class="surname">G</th>
                <td class="spacing"></td>
                <td class="spacing">Discord</td>
                <td class="spacing">LinkedIn</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}