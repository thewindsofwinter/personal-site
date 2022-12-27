import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  
  const stars = (canvas) => {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 150, 75);
  };
  
  return (
    <div className="bg-ink min-h-screen">
      <canvas className="absolute top-0 left-0 w-screen h-screen" onLoad={() => { stars(document.getElementsByTagName("canvas")[0]); }}>
      </canvas>
      <Head>
        <title>Andy Tang</title>
        <meta name="description" content="Software engineer, Stanford freshman, and stargazer. I seek to build tools which will empower others to dream." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <h1 className="text-3xl font-bold underline text-starlight">
        Hello world!
      </h1>
    </div>
  )
}
