import axios from 'axios';


export function getDogs(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/dogs");   
        return dispatch({
        type: 'GET_DOGS',
        payload: json.data
    })
  }
}


export function getTemperamento(){
  return  function (dispatch){
      axios.get ("http://localhost:3001/temperaments").then((temp)=>dispatch({
          type: "GET_TEMPERAMENTO",
          payload: temp.data
  })); 
  };
}


export function filterTemperamento(payload){
  return {
      type: "FILTER_TEMPERAMENTO",
      payload
  }
}

export function filterCreated(payload){ 
  return {    
      type: "FILTER_CREATED",
      payload
  }
}

export function orderByName(payload){
  return{
      type: 'ORDER_BY_NAME',
      payload
  }
}

export function orderByPeso(payload){
  return{
      type: 'ORDER_BY_PESO',
      payload
  }
}

export function getDetail(id){
  return async function (dispatch){
      try{
          var json = await axios.get(`http://localhost:3001/dogs/${id}`);
          return dispatch ({
              type: "GET_DETAIL",
              payload: json.data
      })
      }catch(error){
          console.log("El error es : ",error)
      }
  }
}

export function postDog (payload){
  return async function (dispatch){
      const info = await axios.post("http://localhost:3001/dogs", payload);
      console.log(info)
      return info;
  }
}


export function getNameDog(name){
    return async function(dispatch){
        try{
            var json = await axios.get ("http://localhost:3001/dogs?name=" + name);    
            console.log(json.data)       
            return dispatch ({ type:'GET_NAME', payload: json.data });
        } catch (e){
            console.log("el error: ", e)
            alert('Dog no encontrado')
        }
    }
}

export function getClean(){
  return{
    type: "GET_CLEAN",
    payload: []
  }
}