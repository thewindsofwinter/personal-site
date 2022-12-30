import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../public/fullhead.png'

function NavBar(props) {
    let showLogo = props.logo;

    return (
        <div className="nav relative left-1/2 top-0 transform -translate-x-1/2 flex lg:flex-row lg:justify-between flex-col items-center text-white text-2xl sm:text-3xl">
            {showLogo ?
                <div className="h-12 m-4">
                    <Link href="/">
                        <Image className="w-full h-full" src={Header} alt="Header with 'Andy Tang' written in white DIN Mono, with a stylized T as telescope in orange superimposed atop the 'A'" />
                    </Link>
                </div> 
                
                : <div></div>
            }

            <div className = "links flex flex-col sm:flex-row justify-end sm:items-center items-center sm:items-end gap-4 m-4 mt-8">
                {props.home ? <Link className="emph" href="#">[Home]</Link> : <Link href="/">[Home]</Link>}
                {props.projects ? <Link className="emph" href="#">[Projects]</Link> : <Link href="/projects">[Projects]</Link>}
                <Link href="/resume.pdf">[Resume]</Link>
            </div>
        </div>
    );
}

export default NavBar;