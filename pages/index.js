import StarField from '../components/starfield'
import NavBar from '../components/navbar'
import Head from 'next/head'
import Image from 'next/image'
import Title from '../public/header.png'

export default function Home() {

  return (
    <div className="bg-ink min-h-screen">
      <Head>
        <title>Home | Andy Tang</title>
        <meta name="description" content="Software engineer, Stanford freshman, and stargazer. I seek to build tools that empower others to dream." />
      </Head>
      
      <StarField rate={1} />

      <div className = "wrapper relative w-full h-screen z-5 flex flex-col">
        <NavBar logo={false} home={true} />

        <div className="flex-grow splash flex flex-col justify-center items-center w-full text-white">
          <div className="mx-auto sm:flex sm:flex-row sm:items-stretch sm:gap-6 sm:justify-center table-cell align-middle max-w-6xl">
            <div className="table pb-8 sm:pb-0 sm:pr-8 sm:border-r-8">
              <div className="table-cell align-middle">
                <div className="text-center sm:text-right m-auto">
                  <h1 className="title text-5xl sm:text-5xl md:text-6xl l:text-7xl xl:text-8xl pb-2">The sky is <span className="emph">vast</span></h1>
                  <h3 className="subtitle text-2xl sm:text-2xl md:text-3xl l:text-4xl xl:text-5xl">Stay awhile and <span className="emph">wonder</span></h3>
                </div>
              </div>
            </div>

            <div className="table mx-auto pt-8 border-t-8 sm:p-0 sm:border-t-0">
              <table>
                <tbody>
                  <tr>
                    <th colSpan="4" className="header"><Image src={Title} alt="Large 'ANDY' in white DIN Mono, with 'T' stylized as telescope superimposed over the 'A'" /></th>
                  </tr>
                  <tr>
                    <th className="surname">A</th>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th className="surname">N</th>
                    <td className="spacing"></td>
                    <td className="logo">
                      <a target="_blank" href="https://github.com/thewindsofwinter" rel="noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-b icon-tabler icon-tabler-brand-github" width="80%" height="80%" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
                        </svg>
                      </a>
                    </td>
                    <td className="logo">
                      <a href="mailto:andyyt2@stanford.edu">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-b icon-tabler icon-tabler-mail" width="80%" height="80%" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                          <polyline points="3 7 12 13 21 7"></polyline>
                        </svg>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th className="surname">G</th>
                    <td className="spacing"></td>
                    <td className="logo">                  
                      <a target="_blank" href="weixin://dl/chat?andyytang" rel="noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-t icon-tabler icon-tabler-brand-wechat" width="80%" height="80%" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M16.5 10c3.038 0 5.5 2.015 5.5 4.5c0 1.397 -.778 2.645 -1.999 3.47l-.001 2.03l-1.964 -1.178a6.649 6.649 0 0 1 -1.536 .178c-3.038 0 -5.5 -2.015 -5.5 -4.5s2.462 -4.5 5.5 -4.5z"></path>
                          <path d="M11.197 15.698c-.69 .196 -1.43 .302 -2.197 .302a8.008 8.008 0 0 1 -2.612 -.432l-2.388 1.432v-2.801c-1.237 -1.082 -2 -2.564 -2 -4.199c0 -3.314 3.134 -6 7 -6c3.782 0 6.863 2.57 6.996 5.785l.004 .233"></path>
                          <path d="M10 8h.01"></path>
                          <path d="M7 8h.01"></path>
                          <path d="M15 14h.01"></path>
                          <path d="M18 14h.01"></path>
                        </svg>
                      </a>
                    </td>
                    <td className="logo">
                      <a target="_blank" href="https://linkedin.com/in/andyytang" rel="noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-t icon-tabler icon-tabler-brand-linkedin" width="80%" height="80%" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                          <line x1="8" y1="11" x2="8" y2="16"></line>
                          <line x1="8" y1="8" x2="8" y2="8.01"></line>
                          <line x1="12" y1="16" x2="12" y2="11"></line>
                          <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
                        </svg>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}