const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const {Dog, Temperamento} = require ('../db')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async ()=>{
    const firstReq = await axios.get('https://api.thedogapi.com/v1/breeds');
    const Info = await firstReq.data.map(e=> {
        return{
            id: e.id,
            name: e.name,
            vida_minimo: e.life_span.split(" - ")[0] && e.life_span.split(" - ")[0],

            vida_maximo: e.life_span.split(" - ")[1] && 
            e.life_span.split(" - ")[1].split(" ")[0],

            altura_minima: e.height.metric.split(" - ")[0] && e.height.metric.split(" - ")[0],
            altura_maxima: e.height.metric.split(" - ")[1] && e.height.metric.split(" - ")[1],

            peso_minimo :  e.weight.metric.split(" - ")[0] !== "NaN"
            ? e.weight.metric.split(" - ")[0]
            : 6,

            peso_maximo :  e.weight.metric.split("-")[1] && e.weight.metric.split("-")[1],

            image: e.image.url,
            temperamento: e.temperament ? e.temperament: "Unknown"
        }
    })
    return Info;
}

    ////////
    /*const getDbInfo= async()=>{
    return await Dog.findAll({
        include:[{
            model: Temperamento,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }]       
    });
    
    }*/
    const getDbInfo = async () => {
        try{
            const doges =await Dog.findAll({
                include: [{
                    model: Temperamento,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }]   
            });
            const info = doges.map((e)=>{
                let temp = e.temperamentos.map((e)=>e.name);
                let aux = temp.join(", ");
                //console.log(aux)
                return{
                    id: e.id,
                    name: e.name,
                    vida_minimo: e.vida_minimo,
                    vida_maximo: e.vida_maximo,
                    altura_minima: e.altura_minima,
                    altura_maxima: e.altura_maxima,
                    peso_minimo :  e.peso_minimo,   
                    peso_maximo : e.peso_maximo,
                    image: e.image,
                    temperamento: aux,//e.temperamentos.map((t)=>t.name + ", "),
                    creadoEnDb: true,
            
                }
            })
            return info;
        }catch (error){
            console.log("el error en getDbInfo es: ", error)
        }
    }
//concateno lo que viene de base de dato con lo de api
    const getAllDog = async()=>{
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const infoTotal = [...apiInfo, ...dbInfo]
    return infoTotal
}


router.get("/dogs/:id", async (req, res) => {
    try {
      let dogBd = [];
      const id = req.params.id;
      if (typeof id === "string" && id.length > 6) {
        const dog2 = await getDbInfo()//dogBd = await Dog.findAll({ where:  {id:id}, include: Temperamento});

      }
      if (dogBd.length) {
        res.send(dogBd);
      } else {
        const dogsTotal = await getAllDog();
        let dogId = dogsTotal.filter((el) => el.id == id);
        if (dogId) {
          res.send(dogId);
        } else {
          res.send("Dog no encontrado!");
        }
      }
    } catch (error) {
      console.log("el error de get id es: ", error);
    }
  });
  
    ///////
    ///////get id
    /*
    const getId= async(id) =>{
       try{
        if(typeof id=== 'string' && id.length > 4){
        const db = await Dog.findByPk(id, {include: Temperamento})
        return{
        id: db.id,
        name: db.name,
        vida_minimo: db.vida_minimo,
        vida_maximo: db.vida_maximo,
        altura_minima: db.altura_minima,
        altura_maxima: db.altura_maxima,
        peso_minimo :  db.peso_minimo,   
        peso_maximo : db.peso_maximo,
        image: db.image,
        temperamento: db.temperamentos.map((t)=>t.name + ", "),
        creadoEnDb: true,

    }
    }
     const dogA = await axios.get(`https://api.thedogapi.com/v1/breeds`)
     const dogB = await dogA.data.map(e=>{
         return{
            id: e.id,
            name: e.name,
            vida_minimo: e.life_span.split(" - ")[0] && e.life_span.split(" - ")[0],
            vida_maximo: e.life_span.split(" - ")[1] && e.life_span.split(" - ")[1].split(" ")[0],
            altura_minima: e.height.metric.split(" - ")[0] && e.height.metric.split(" - ")[0],
            altura_maxima: e.height.metric.split(" - ")[1] && e.height.metric.split(" - ")[1],
            peso_minimo :  e.weight.metric.split(" - ")[0] !== "NaN"
            ? e.weight.metric.split(" - ")[0] : 6,   
            peso_maximo : e.weight.metric.split("-")[1] && e.weight.metric.split("-")[1],
            image: e.image.url,
            temperamento: e.temperament,
            
         }
        })
        return dogB
    }catch(error){console.log(error)}
    }


    router.get('/dogs/:id', async (req,res)=>{
        const id = req.params.id;
        try{
        if(id){
            const dogIdTotal = await getId(id)
            let dogId = dogIdTotal.filter((e)=>e.id==id);
            dogId ?
            res.status(200).json(dogId) : 
            res.status(404).send('Dog no encontrado')
        }
    }catch (error){console.log("El error del get Id es: ", error)}
    })
    */
////////


/////// ruta get x raza 

router.get('/dogs', async (req,res) =>{
    const name = req.query.name
    let dogTotal = await getAllDog();
    if(name){
        let dogName = dogTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        console.log("el asdasd: ", dogName)
        dogName.length ?
        res.status(200).send(dogName) :
        res.status(404).send('Dog no encontrado');
    } else{
        res.status(200).send(dogTotal)
    }
})
////



///// ruta get temperamentos

    router.get('/temperaments', async (req,res)=>{
        const tempApi = await axios.get('https://api.thedogapi.com/v1/breeds')
        const temp = tempApi.data.map(e=>e.temperament)
        const tempEach = temp.toString().split(",");
        tempEach.forEach(e=>{
            let i=e.trim()
            Temperamento.findOrCreate({
                where: {name:i}
            })
        })
        const allTemp = await Temperamento.findAll();
        res.send(allTemp)
    })

    /////ruta post
    router.post('/dogs', async (req,res) =>{
    let {
        name,
        vida_minimo,
        vida_maximo,
        altura_minima,
        altura_maxima,
        peso_minimo,
        peso_maximo,
        image, 
        temperamento
    } = req.body;
    
    try{
    let dogCreated = await Dog.create({
        name,
        vida_minimo,
        vida_maximo,
        altura_minima,
        altura_maxima,
        peso_minimo,
        peso_maximo,
        image,
    })

let tempDb = await Temperamento.findAll({ where: { name : temperamento } })
dogCreated.addTemperamento(tempDb)
    
    return res.send('dog creado exitosamente')}
        catch (error){
            console.log("el error del post fue: ", error)
        }
});

    

module.exports = router;
