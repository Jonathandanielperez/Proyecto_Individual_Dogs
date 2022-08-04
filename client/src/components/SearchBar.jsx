import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDog } from "../actions";
import "../estilos/search.css"

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameDog(name))
        setName("")
    }

    return (
        <div className="search">
            
            <input
            className="searchTerm"
            onChange={(e) => handleInputChange(e)}
            value= {name}
            type= "text"
            placeholder="Buscar..."
            />

            <button 
                 className="searchButton"
                 onClick={(e) =>
                 handleSubmit(e)} 
                 type="submit">
                    Buscar
            </button>
        </div>
        
    )
}