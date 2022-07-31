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
       <div key={myDog.id}>
            <h3 className="h3">Raza: {myDog.name}</h3>
            {/*<img src={myDog.map(e=>e.image)} alt="imagen dog" height="200px" weight="200px" />*/}
             <div className="div">                                
            
               <ul> 
                <li>Vive minimo: {!myDog.creadoEnDb ? myDog.vida_minimo : myDog.vida_minimo} year</li>
                <li>Vive maximo: {!myDog.creadoEnDb ? myDog.vida_maximo : myDog.vida_maximo } year</li>
                <li>Atura minima: {myDog.altura_minima} Cm.</li>
                <li>Atura maxima: {myDog.altura_maxima} Cm.</li>
                <li>Peso minimo: {myDog.peso_minimo} Kg.</li>
                <li>Peso maximo: {myDog.peso_maximo} Kg.</li>
              
                <li>Temperamento: 
                    {!myDog.creadoEnDb
                    ? myDog.temperamento
                    : myDog.temperamento}
                </li>
                    
                    <li>Numero de raza: {myDog.id}</li>
                </ul>

            {/*    */}
                
            
            </div>

    </div> : <p>Cargando...</p>}


    <Link to= '/home'>
        <button className="button3"><span className="button2 span">Volver a inicio</span></button>
    </Link>
</div>

)
}{/*.map(t=>t.name + ', ')
myDog.map(e=>{e.id, e.name, e.image, e.temperamento, e.altura, e.peso})<h4>Temperamento: {!myDog.map(ee=>ee.creadoEnDb) ? myDog.map(ea=>ea.temperamento) + ' ' : myDog.map(e=>e.temperamentos).map(el=>el.name + (' '))}</h4>,  myDog.map(e=>e.creadoEnDb) ? myDog.map(f=>f.temperamento) : myDog.map(g=>g.temperamentos) */}