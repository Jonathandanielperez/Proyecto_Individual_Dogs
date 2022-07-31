
const initialState = {
    dogs: [],
    allDogs: [],
    temperamentos: [],
    detail: []
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
            case 'GET_TEMPERAMENTO':
                return {
                    ...state,
                temperamentos: action.payload
                }

           /*case "FILTER_DOG_BY_TEMPERAMENTO":
                
                let tempFiltered =
                  action.payload === "all" ?
                    state.allDogs : 
                    state.allDogs.filter(e=>{return e.temperamento?.split(" , ").includes(action.payload)})
                        // e.temperamento.map(f => f.name).includes(action.payload));
                return {
                  ...state,
                    dogs: tempFiltered,
                };*/

                case "FILTER_TEMPERAMENTO":
            const allDogs2 = state.allDogs;
            const temperamentsFilter = action.payload === "all" ?
            allDogs2 : allDogs2.filter(e => {
                return !e.creadoEnDb ? e.temperamento?.includes(action.payload) : e.temperamentos?.includes(action.payload);
            })
            
            return {
                ...state,
                dogs: temperamentsFilter
            }

                /* case 'FILTER_CREATED':               
                const createdFilter = action.payload === 'created' ? 
                state.allDogs.filter(el => el.creadoEnDb) : 
                state.allDogs.filter(el => !el.creadoEnDb)


                return {
                        ...state,
                        dogs: action.payload === 'all' ? state.allDogs : createdFilter
                    }*/

                case 'FILTER_CREATED': 
                    const allDogsC = state.allDogs             
                    const createdFilter = action.payload === "created" ? 
                    allDogsC.filter(el => el.creadoEnDb) : 
                    allDogsC.filter(el => !el.creadoEnDb)
                    return {
                        ...state,
                        dogs: action.payload === "all" ? allDogsC : createdFilter
                    };
    

                case 'ORDER_BY_NAME':
                    let sortedArr = action.payload === 'asc' ? 
                    state.dogs.sort(function (a,b){
                        if (a.name > b.name){
                            return 1;
                        }
                        if (b.name > a.name){
                            return -1;
                        }
                        return 0;
                    }) :
                    state.dogs.sort(function (a,b){
                        if (a.name > b.name){
                            return -1;
                        }
                        if (b.name > a.name){
                            return 1;
                        }
                        return 0;
                    })
                    return {
                        ...state,
                        dogs: sortedArr
                    }


                    case 'ORDER_BY_PESO':

                       let sortPeso = action.payload === "may" ?
                       state.dogs.sort(function(a,b){
                        return b.peso_minimo - a.peso_minimo;
                       }) :
                       state.dogs.sort(function(a,b){
                        return a.peso_minimo - b.peso_minimo;
                       })
                       return{
                        ...state,
                        dogs: sortPeso
                       }
                       

                        /*let sortedArr2 = action.payload === 'men' ? 
                        state.dogs.sort(function (a,b){
                            if (a.peso > b.peso){
                                return 1;
                            }
                            if (b.peso > a.peso){
                                return -1;
                            }
                            return 0;
                        }) :
                        state.dogs.sort(function (a,b){
                            if (a.peso > b.peso){
                                return -1;
                            }
                            if (b.peso > a.peso){
                                return 1;
                            }
                            return 0;
                        })
                        return {
                            ...state,
                            dogs: sortedArr2
                        }  */

                        



                        case "GET_DETAIL":
                            return{
                                ...state,
                                detail: action.payload
                            } 
                            
                            case 'POST_DOG':
                                return{
                                    ...state,
                                }

                        case 'GET_NAME':
                            return{
                                ...state,
                                dogs: action.payload
                                } 
                        case "GET_CLEAN":
                            return{
                                ...state,
                                detail: action.payload
                            }
            default:
                return state;
    }
}

export default rootReducer;