import { useState, useRef } from 'react'
import StarField from '../components/starfield'
import NavBar from '../components/navbar'
import Head from 'next/head'

export default function Projects() {

  return (
    <div className="bg-ink min-h-screen">
      <Head>
        <title>Writing | Andy Tang</title>
        <meta name="description" content="Software engineer, Stanford freshman, and stargazer. I seek to build tools that empower others to dream." />
      </Head>

      <StarField rate={0} />

      <div className = "wrapper relative w-full h-screen z-5 flex flex-col">
        <NavBar logo={true} writing={true} />
      </div>
    </div>
  )
}