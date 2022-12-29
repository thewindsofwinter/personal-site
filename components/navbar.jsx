import { useState, useRef } from 'react'

function NavBar(props) {
    let showLogo = props.logo;

    return (
        <div className="nav relative left-1/2 top-0 transform -translate-x-1/2 flex flex-row justify-between text-white text-2xl sm:text-3xl">
            {showLogo ?
                <img src="../header.png"></img> :
                <div></div>
            }

            <div className = "links flex flex-col sm:flex-row justify-end items-center sm:items-end gap-4 p-4 pt-2">
                {props.home ? <a className="emph" href="#">[Home]</a> : <a href="./index">[Home]</a>}
                {props.projects ? <a className="emph" href="#">[Projects]</a> : <a href="./projects">[Projects]</a>}
                {props.writing ? <a className="emph" href="#">[Writing]</a> : <a href="./writing">[Writing]</a>}
                <a href="../resume.pdf">[Resume]</a>
            </div>
        </div>
    );
}

export default NavBar;