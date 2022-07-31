import React from "react";
import {Link} from "react-router-dom";
import "../estilos/landingPage.css";


export default function LandingPage(){
    return(
        
        <div>
            <h1>Bienvenidos</h1>
            <Link to = '/home'>
                <button>Ingresar</button>
            </Link>
        </div>
       
    )
}