import React from "react";
import "../estilos/paginado.css"

export default function Paginado ({dogsPerPage, allDogs, paginado, currentPage, setCurrentPage}){
    const pageNumber = []
    console.log("la pageNumber es", pageNumber)
    let numPages = Math.ceil(allDogs/dogsPerPage)
    for(let i=1; i<= numPages; i++){
        pageNumber.push(i)
    }

    return(
        <nav className="container44">
            <ul className="ul">
                    <button className="but"
                    disabled={currentPage === 1}
                    onClick={()=>
                    setCurrentPage(currentPage === 1? 
                    currentPage:
                    currentPage - 1)}
                    >Prev.</button>
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
                    <button className="but"
                    disabled={currentPage === pageNumber.length}
                    onClick={()=> 
                    setCurrentPage(currentPage === numPages?
                    currentPage:
                    currentPage + 1)}
                    >Sig.</button>
            </ul>
        </nav>
    )
}
