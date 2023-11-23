const { Driver } = require('../db');
const axios = require('axios');

const getDrivers = async (req, res)=>{
    try {
        const driversFromDb = await Driver.findAll()

        //arreglo de objetos
        //donde cada objeto es un driver con su informacion
        //Si no tiene imagen, debera colocarse una por defecto
        if(driversFromDb.length < 20) {
            const driversFromApi = (await axios.get("http://localhost:5000/drivers")).data

            //Aplicar iterador para controlar los Driver que no tengan una imagen

            return res.status(201).json(driversFromApi.slice(0, 20));
        }

        return res.status(200).json(driversFromDb)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = getDrivers;