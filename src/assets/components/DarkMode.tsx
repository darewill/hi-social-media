import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import '../css/DarkMode.css'

export default function DarkMode() {
    const DarkHandler = () =>{
        document.querySelector('body')?.classList.toggle('darkmode');
    };
  return (
    <div className='dark-mode-icon'>
        <FontAwesomeIcon icon={faLightbulb} onClick={DarkHandler} />
    </div>
  )
}
