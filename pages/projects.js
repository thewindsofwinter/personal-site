import { useState, useRef } from 'react'
import StarField from '../components/starfield'
import NavBar from '../components/navbar'
import Head from 'next/head'

export default function Projects() {

  return (
    <div className="bg-ink min-h-screen">
      <Head>
        <title>Projects | Andy Tang</title>
        <meta name="description" content="Software engineer, Stanford freshman, and stargazer. I seek to build tools that empower others to dream." />
      </Head>

      <StarField rate={0} />

      <div className = "wrapper relative w-screen h-screen z-5 flex flex-col">
        <NavBar logo={true} projects={true} />

        <div className="flex-grow splash flex flex-row flex-wrap justify-center items-center w-4/5 m-auto text-white">
            <a href="https://github.com/thewindsofwinter/anima">
                <div className="relative w-72 h-96">
                    <img className="absolute rounded-2xl z-0" src="../2mo_neural.png"></img>
                    <div className="absolute bottom-0 w-full h-2/3 bg-gray-800 text-white z-5 p-4 rounded-b-2xl">
                        <h3 className="text-3xl border-b-2">ANIMA</h3>
                        <p className="mt-4">I developed a novel graph-based algorithm to quantify the extent of astrogliosis
                            (brain scarring) in images of immunostained mouse brain slices, improving accuracy and accelerating
                            data analysis by 98%. Analysis results were published in PNAS 119<em>(51)</em>, DOI: 10.1073/pnas.2021265118.</p>
                    </div>
                </div>
            </a>
        </div>
      </div>
    </div>
  )
}