import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDogs, filterCreated, orderByName, orderByPeso, getTemperamento, filterTemperamento } from "../actions"; //filterCreated
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "../estilos/home.css"

export default function Home (){

    const dispatch = useDispatch();
    const allDogs = useSelector ((state) => state.dogs)
    console.log("los doges: ", allDogs)
    const allTemperamento = useSelector((state)=>state.temperamentos)
    console.log('los temperamentos de db: ', allTemperamento)
    const [orden, setOrden]= useState('')
    //paginado
    const [currentPage, setCurrentPage] = useState(1)
    const[dogsPerPage, setDogPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog =indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    //console.log("los temps de dogs de las cards",currentDogs);
    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getTemperamento());
        dispatch(getDogs());
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
        setOrden(e.target.value);
    };



    function handleFilterCreated(e) {
        e.preventDefault(e);
        dispatch(filterCreated(e.target.value));
        setOrden(e.target.value);
      }
   
    function handleFilterByTemp(e){
        e.preventDefault(e);
        dispatch(filterTemperamento(e.target.value))
        setOrden(e.target.value);
    };
    

    function handleSortName (e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        //setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    };

    function handleSortPeso (e){
        e.preventDefault();
        dispatch(orderByPeso(e.target.value))
        setOrden(`Ordenado ${e.target.value}`)
    };

    return(
           <div>
            <SearchBar/>
        <div className="rec">
            <button
            className="recButton"
            onClick= {e=> {handleClick(e)}} >
                Recargar
            </button>
        </div>
            <nav className="nav">

            <div >
               <select className="select-css" onChange={(e) => handleFilterCreated(e)}>  
                    <option className="select-css option" tvalue="">Filtrar por Creado/Existente</option>          
                    <option className="select-css option" value='all'>Todos</option>
                    <option className="select-css option" value="created">Razas agragadas</option>
                    <option className="select-css option" value="api">Razas existentes</option>
                </select>     
            </div>

            <div >
                <select className="select-css" onChange={(e) =>handleFilterByTemp(e)}>
                <option className="select-css option" value="">Filtrar por temperamento</option>
                <option className="select-css option" value="all">Todos</option>
                {allTemperamento && allTemperamento.map((t)=>(
                        <option className="select-css option" key={t.id} value={t.name}>{t.name}</option>
                    ))}
                </select>
            </div>
                
            <div >
                <select className="select-css" onChange={e=>handleSortPeso(e)}>
                    <option className="select-css option" value="">Filtrar por peso</option>
                    <option className="select-css option" value= "men">Menor Peso</option>
                    <option className="select-css option" value= "may">Mayor Peso</option>
                </select>
            </div>
 
            <div >
                <select className="select-css" onChange={e=>handleSortName(e)}>
                    <option className="select-css option" value="" >Filtrar orden alfabetico</option>
                    <option className="select-css option" value="asc">A-Z</option>
                    <option className="select-css option" value="des">Z-A</option>
                </select>
            </div>
            <div >
                <Paginado
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado={paginado}
                />
            </div>

            
            <Link to= '/dogs'>
            <button className="button">
               <span>Crear Dog</span> 
            </button>
            </Link>
            

            </nav>       
                
                <div className="contenedor"> 
                {
                    currentDogs.map(e=>{
                        return(
                        
                        <Card className="hh" name={e.name} image={e.image} temperamento={!e.creadoEnDb ? e.temperamento : e.temperamentos.map( f=>f.name + (', '))} peso_minimo={e.peso_minimo} peso_maximo={e.peso_maximo} id={e.id} key={e.id}/>
                                         
                   ) 
                })
                } 
               </div>        
      </div>
    )

}