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
                <th colspan="4" class="header"><img src="../header.png"></img></th>
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
                <td class="logo">
                  <a target="_blank" href="https://github.com/thewindsofwinter">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-github" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
                    </svg>
                  </a>
                </td>
                <td class="logo">Email</td>
              </tr>
              <tr>
                <th class="surname">G</th>
                <td class="spacing"></td>
                <td class="logo">Discord</td>
                <td class="logo">LinkedIn</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}