import React from "react";
import "../estilos/paginado.css"

export default function Paginado ({dogsPerPage, allDogs, paginado}){
    const pageNumber = []

    for(let i=1; i<=Math.ceil(allDogs/dogsPerPage); i++){
        pageNumber.push(i)
    }

    return(
        <nav className="container44">
            {/*<select className="pagination">
            <option value="">Filtrar por paginas</option>
                {pageNumber &&
                 pageNumber.map(number =>(                   
                            <option className="pagination" onClick={()=>paginado(number)} key={number}>Pagina N° {number}</option>                     
                 ))
                }
            </select>*/}
            <ul className="ul">
                    <li>
                    {pageNumber && pageNumber.map((number) => (   
                    <button
                    className="but"
                    key = {number}
                    onClick={()=>paginado(number)}
                    >{number}
                    </button>
                    ))}
                    </li>
            </ul>
        </nav>
    )
}
