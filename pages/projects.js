import StarField from '../components/starfield'
import NavBar from '../components/navbar'
import ProjectList from '../components/project'
import Head from 'next/head'
import { useEffect, useState } from 'react'

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
  }
  

export default function Projects() {
  let width = useWindowSize().width;

  return (
    <div className="bg-ink min-h-screen">
      <Head>
        <title>Projects | Andy Tang</title>
        <meta name="description" content="Software engineer, Stanford freshman, and stargazer. I seek to build tools that empower others to dream." />
      </Head>

      <StarField rate={0} />

      <div className = "wrapper relative w-full min-h-screen z-5 flex flex-col">
        <NavBar logo={true} projects={true} />

        <ProjectList small={width != undefined && (width < 512 || (width > 800 && width < 1080))} />
      </div>
    </div>
  )
}