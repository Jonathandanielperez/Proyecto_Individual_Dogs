import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getClean } from "../actions";
import { useEffect } from "react";
import "../estilos/detail.css"

export default function Detail(props) {
    console.log('las props son: ', props)
    const dispatch= useDispatch()

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id));
        dispatch(getClean());
    },[dispatch])

const myDog= useSelector ((state)=>state.detail)
console.log('myDog: ', myDog)

return(
   
    <div className="div2">
    
     {myDog ? 
       <div key={myDog.map(e=>e.id)}>
            <h3 className="h3">Raza: {myDog.map(e=>e.name)}</h3>
            <img src={myDog.map(e=>e.image)} alt="imagen dog" className="img2" />
             <div className="div22">                                
               <ul> 
                <li>Vive minimo: {!myDog.map(e=>e.creadoEnDb) ? myDog.map(e=>e.vida_minimo) : myDog.map(e=>e.vida_minimo)} year</li>
                <li>Vive maximo: {!myDog.map(e=>e.creadoEnDb) ? myDog.map(e=>e.vida_maximo) : myDog.map(e=>e.vida_maximo) } year</li>
                <li>Atura minima: {myDog.map(e=>e.altura_minima)} Cm.</li>
                <li>Atura maxima: {myDog.map(e=>e.altura_maxima)} Cm.</li>
                <li>Peso minimo: {myDog.map(e=>e.peso_minimo)} Kg.</li>
                <li>Peso maximo: {myDog.map(e=>e.peso_maximo)} Kg.</li>
                <li>Temperamento:  
                    {myDog.map(e=>!e.creadoEnDb)
                    ? myDog.map(e=>e.temperamento)
                    : myDog.map(e=>e.temperamentos.map(el=>el.name))}
                </li>
                    <li>Numero de raza: {myDog.map(e=>e.id)}</li>
                </ul>
            </div>
    </div> : <p>Cargando...</p>}
    <Link to= '/home'>
        <button className="button3"><span className="button2 span">Volver a inicio</span></button>
    </Link>
</div>

)
}
