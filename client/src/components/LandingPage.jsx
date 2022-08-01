import React from "react";
import {Link} from "react-router-dom";
import "../estilos/landingPage.css";


export default function LandingPage(){
    return(
        
        <div className="div">
            <div className="contenedor">
            <h1 className="text">Encuentre su raza favorita con tan solo un click</h1>
            </div>
            <Link to = '/home'>
                <button className="button5"><span className="button5 span">Ingresar</span></button>
            </Link>
        </div>
       
    )
}