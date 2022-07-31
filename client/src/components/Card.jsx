import React from "react";
import { Link } from "react-router-dom";
import "../estilos/card.css"

export default function Card({name, temperamento, peso_minimo, peso_maximo, creadoEnDb, image, id}) {
    
    return (
        <div key={id} className="card">           

            <img src={image} alt="imagen dog not found" className="img" />
            <h3 className="hh">Raza: {name}</h3>
            <h5 className="hh">Peso minimo: {peso_minimo} Kg.</h5>
            <h5 className="hh">Peso Maximo: {peso_maximo} Kg.</h5>
            <h5 className="hh">Temperamentos: {temperamento}</h5>
           
            <Link to={`/detail/${id}`}>
            <button className="button2"> <span className="button2 span">Mas detalles...</span></button>
            </Link>
            
        </div>
    )
}