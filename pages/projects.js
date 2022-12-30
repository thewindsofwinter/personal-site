import StarField from '../components/starfield'
import NavBar from '../components/navbar'
import Project from '../components/project'
import Head from 'next/head'

export default function Projects() {

  return (
    <div className="bg-ink min-h-screen">
      <Head>
        <title>Projects | Andy Tang</title>
        <meta name="description" content="Software engineer, Stanford freshman, and stargazer. I seek to build tools that empower others to dream." />
      </Head>

      <StarField rate={0} />

      <div className = "wrapper relative w-full min-h-screen z-5 flex flex-col">
        <NavBar logo={true} projects={true} />

        <div className="flex-grow splash flex flex-row flex-wrap justify-center items-center w-4/5 mx-auto mt-8 text-white">
            <Project project="ANIMA" />
            <Project project="USNCO" />
            <Project project="JHMC" />
            <Project project="Multi24" />
            <Project project="Azimuth" />
            <Project project="Fortune-ate" />
        </div>
      </div>
    </div>
  )
}