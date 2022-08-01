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
                        /*<li className="number"  key={number}>
                        <button onClick={()=>paginado(number)}>{number}</button>
                        </li>*/                      
                            <option className=".select-css" onClick={()=>paginado(number)} key={number}>Pagina N° {number}</option>                     
                 ))
                }
            </select>
        </nav>
    )
}
  {/*.select-css:focus
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222; 
    outline: none;*/
}