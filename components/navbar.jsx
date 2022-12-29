import { useState, useRef } from 'react'

function NavBar(props) {
    let showLogo = props.logo;

    return (
        <div className="nav relative left-1/2 top-0 transform -translate-x-1/2 flex flex-row justify-between text-white text-2xl sm:text-3xl">
            {showLogo ?
                <div className="h-12 m-4"><img className="h-full" src="../fullhead.png"></img></div> :
                <div></div>
            }

            <div className = "links flex flex-col sm:flex-row justify-end sm:items-center items-center sm:items-end gap-4 m-4 mt-8">
                {props.home ? <a className="emph" href="#">[Home]</a> : <a href="/">[Home]</a>}
                {props.projects ? <a className="emph" href="#">[Projects]</a> : <a href="/projects">[Projects]</a>}
                {props.writing ? <a className="emph" href="#">[Writing]</a> : <a href="/writing">[Writing]</a>}
                <a href="../resume.pdf">[Resume]</a>
            </div>
        </div>
    );
}

export default NavBar;