const { Driver, Team } = require('../db');
const axios = require('axios');

const getDrivers = async (req, res)=>{
    try {
        const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg'
        let driversFromDb = await Driver.findAll({
            include: Team,
        })

        driversFromDb = driversFromDb.map(({id, name, surname, image, Teams})=>{
            return {
                id,
                name: `${name} ${surname}`,
                image: image,
                teams: Teams.map(team=> team.name).join(', ')
            }
        })
        //arreglo de objetos
        //donde cada objeto es un driver con su informacion
        //Si no tiene imagen, debera colocarse una por defecto
        const driversFromApi = (await axios.get("http://localhost:5000/drivers")).data
            
        //Aplicar iterador para controlar los Driver que no tengan una imagen
        const allDriversInfo = driversFromApi.map(({id, name, image, teams,})=>{
            return {
                id,
                name: `${name.forename} ${name.surname}`,
                image: image.url || defaultImage,
                teams
            }
        })

        return res.status(200).json(driversFromDb.concat(allDriversInfo))
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = getDrivers;