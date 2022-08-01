import React from "react";
import "../estilos/paginado.css"

export default function Paginado ({dogsPerPage, allDogs, paginado}){
    const pageNumber = []

    for(let i=1; i<=Math.ceil(allDogs/dogsPerPage); i++){
        pageNumber.push(i)
    }

    return(
        <nav>
            <select className="select-css">
            <option value="">Filtrar por paginas</option>
                {pageNumber &&
                 pageNumber.map(number =>(                   
                            <option className=".select-css" onClick={()=>paginado(number)} key={number}>Pagina N° {number}</option>                     
                 ))
                }
            </select>
        </nav>
    )
}
