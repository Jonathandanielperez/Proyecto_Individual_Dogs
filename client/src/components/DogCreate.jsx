import React, {  useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperamento } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "../estilos/form.css"

export function validar(input){
    let errors = {};
    if(!input.name){
        errors.name = "Ingrese un nombre";
    }
    else if (/^\s*$/.test(input.name)){ // /^\s*$/.test
       errors.name = "Campo obligatorio "
    } else if(!/^([a-zA-Z]+)(\s[a-zA-Z]+)*$/.test(input.name)) {
        errors.name= 'Solo se admiten texto'
      }

    if (/^\s*$/.test(input.altura_minima)){
        errors.altura_minima= "Campo obligatorio "
    }
    else if(!/(?=.*[0-9])/.test(input.altura_minima)){// /(?=.*[0-9])/.test  /^[1-9]\d*(\.\d+)?$/
        errors.altura_minima= "Solo se admiten numeros"
    } 

    if (/^\s*$/.test(input.altura_maxima)){
        errors.altura_maxima= "Campo obligatorio "
    }
    else if(!/(?=.*[0-9])/.test(input.altura_maxima)){
        errors.altura_maxima = 'Solo se admiten numeros';
    }
    if(input.altura_maxima <= input.altura_minima){
        errors.altura_minima = 'Altura minima no puede ser mayor altura maxima';
    }

    if (/^\s*$/.test(input.peso_minimo)){
        errors.peso_minimo= "Campo obligatorio "
    }
    else if(!/(?=.*[0-9])/.test(input.peso_minimo)){
        errors.peso_minimo = 'Solo se admiten numeros';
    }

    if (/^\s*$/.test(input.peso_maximo)){
        errors.peso_maximo= "Campo obligatorio "
    }
    else if(!/(?=.*[0-9])/.test(input.peso_maximo)){
        errors.peso_maximo = 'Solo se admiten numeros';
    }

    if(input.peso_maximo <= input.peso_minimo){
        errors.peso_minimo = 'Peso minimo no puede ser mayor peso maxima';
    }

    if (/^\s*$/.test(input.vida_minimo)){
        errors.vida_minimo= "Campo obligatorio "
    }
    else if(!/(?=.*[0-9])/.test(input.vida_minimo)){
        errors.vida_minimo = 'Solo se admiten numeros';
    }

    if (/^\s*$/.test(input.vida_maximo)){
        errors.vida_maximo= "Campo obligatorio "
    }
    else if(!/(?=.*[0-9])/.test(input.vida_maximo)){
    errors.vida_maximo = 'Solo se admiten numeros';
    }

    if(input.vida_maximo <= input.vida_minimo){
        errors.vida_minimo = 'Vida minima no puede ser mayor vida maxima';
    }

    if (/^\s*$/.test(input.image)){
        errors.image= "Campo obligatorio "
    }
    else if (input.image && !/[a-z0-9-.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|^[\]`]+)?$/.test(input.image) ){
        errors.image = 'Debe ser una url o ser vacio';
    }

    if (input.temperamento.length <= 2){
        errors.temperamento = "El perro no puede tener más de tres temperamentos";
    }

    return errors
}


export default function Crear(){
    const dispatch= useDispatch()
    const history = useHistory()
    const temp= useSelector((state)=> state.temperamentos)
    //console.log("El temp de dogCreate es: ", temp)
    const [errors, setErrors]= useState({});
    const [input, setInput] = useState({
        name: "",
        vida_minimo: "",
        vida_maximo: "",
        altura_minima: "",
        altura_maxima: "",
        peso_minimo: "",
        peso_maximo: "",
        image: "",
        temperamento: []
    });

    function handleSubmit (e){
        e.preventDefault();

        if(
            input.name !== "" &&
            input.vida_minimo !== "" &&
            input.vida_maximo > input.vida_minimo &&
            input.altura_minima !== "" &&
            input.altura_maxima > input.altura_minima &&
            input.peso_minimo !== "" &&
            input.peso_maximo > input.peso_minimo &&
            input.temperamento.length != 0 
        )
        {
        dispatch(postDog(input));
        alert('Dog registrado!!!');     
        setInput({
            name: "",
            vida_minimo: "",
            vida_maximo: "",
            altura_minima: "",
            altura_maxima: "",
            peso_minimo: "",
            peso_maximo: "",
            image: "",
            temperamento: []
        })
        history.push('/home') 
    }else{ 
        alert('elementos requeridos')}
    }

   
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        //console.log(input);

        setErrors(
            validar({
            ...input,
            [e.target.name]: e.target.name,
    })
    );
    }

    function handleSelect(e){
        if (input.temperamento.length === 3){
            alert("el perro no puede tener mas de 3 temperamentos")
        }else if(input.temperamento.length < 3){
        setInput({
            ...input,
            temperamento:[...input.temperamento,e.target.value],
        })
        }
    }

    function handleDelete(e){
        setInput({
            ...input,
            temperamento: input.temperamento.filter((el)=> el !==e),
        });
    }

    useEffect(() => {
        dispatch(getTemperamento());
    },[dispatch]);

    return (
        <div className="div3">
            <Link to="/home">
                <button className="button4"><span className="button4 span">Volver</span></button>
            </Link>

            <h1 className="lavel">Agregar nueva saza!!!</h1>

            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label className="lavel">Nombre: </label>
                    <input
                    type="text"
                    value={input.name}
                    name="name"
                    id="name"
                    onChange={(e)=>handleChange(e)} 
                    className="inputTerm"          
                    />
                    {errors.name && (<p className="danger">{errors.name}</p>)}
                </div>
                <div>
                    <label className="lavel">Vida minima: </label>
                    <input
                    type="number"
                    value={input.vida_minimo}
                    name="vida_minimo"
                    id="vida_minimo"
                    onChange={(e)=>handleChange(e)}
                    className="inputTerm"
                    />
                     {errors.vida_minimo && (<p className="danger">{errors.vida_minimo}</p>)}
                </div> 
                <div>
                    <label className="lavel">Vida maxima: </label>
                    <input
                    type="number"
                    value={input.vida_maximo}
                    name="vida_maximo"
                    id="vida_maximo"
                    onChange={(e)=>handleChange(e)}
                    className="inputTerm"
                    />
                    {errors.vida_maximo && (<p className="danger">{errors.vida_maximo}</p>)}
                </div> 
                <div>
                    <label className="lavel">Atura minima: </label>
                    <input
                    type="number"
                    value={input.altura_minima}
                    name="altura_minima"
                    id="altura_minima"
                    onChange={(e)=>handleChange(e)}
                    className="inputTerm"
                    />
                    {errors.altura_minima && <p className="danger">{errors.altura_minima}</p>}
                </div>        
                <div>
                    <label className="lavel">Atura maxima: </label>
                    <input
                    type="number"
                    value={input.altura_maxima}
                    name="altura_maxima"
                    id="altura_maxima"
                    onChange={(e)=>handleChange(e)}
                    className="inputTerm"
                    />
                    {errors.altura_maxima && 
                    <p className="danger">{errors.altura_maxima}</p>}
                </div>    
                <div>
                    <label className="lavel">Peso minimo: </label>
                    <input
                    type="number"
                    value={input.peso_minimo}
                    name="peso_minimo"
                    id="peso_minimo"
                    onChange={(e)=>handleChange(e)}
                    className="inputTerm"
                    />
                    {errors.peso_minimo && <p className="danger">{errors.peso_minimo}</p>}
                </div>
                <div>
                    <label className="lavel">Peso maximo: </label>
                    <input
                    type="number"
                    value={input.peso_maximo}
                    name="peso_maximo"
                    id="peso_maximo"
                    onChange={(e)=>handleChange(e)}
                    className="inputTerm"
                    />
                    {errors.peso_maximo && <p className="danger">{errors.peso_maximo}</p>}
                </div>
                <div>
                    <label className="lavel">Imagen: </label>
                    <input
                    type="text"
                    value={input.image}
                    name="image"
                    id="image"
                    onChange={(e)=>handleChange(e)}
                    className="inputTerm"
                    />
                    {/*errors.img && (
                        <p className="dreanger">{errors.img}</p>
                    )*/}
                </div>
                <div className="li">
                <select className="select-css2" onChange={(e)=>handleSelect(e)}>
                     <option value="">elige temperamentos</option>
                    {temp.map((t)=>(
                        <option  className="select-css2 option" value={t.name} key={t.id}>{t.name}</option>
                    ))}
                </select>
                <ul>
                    <li>
                    {input.temperamento.map((el) => (   
                    <button className="select-css2 option"
                    key = {el.id}
                    onClick={()=>handleDelete(el)}
                    >{el}
                    </button>
                    ))}
                    </li>
                    </ul>
                </div>
                <button className="button4" type="submit"><span className="button4 span">Agregar raza</span></button>
            </form>   
            {/*<div>
            {errors.name && <p className="dranger">{errors.name}</p>}
            {errors.vida_minimo && (<p className="dranger">{errors.vida_minimo}</p>)}
            {errors.vida_maximo && (<p className="dranger">{errors.vida_maximo}</p>)}
            {errors.altura_minima && <p className="dranger">{errors.altura_minima}</p>}
            {errors.altura_maxima && <p className="dranger">{errors.altura_maxima}</p>}
            {errors.peso_minimo && <p className="dranger">{errors.peso_minimo}</p>}
                    {errors.peso_maximo && <p className="dranger">{errors.peso_maximo}</p>}
                    </div> */}      
        </div> 
    )
}



