const axios = require('axios');
const { Driver } = require('../db');
const { Op } = require("sequelize")

const getDriverByName = async (req, res)=>{
    try {
        const { name } = req.query;
        if(!name) throw Error('Please enter a Name');
        if(!isNaN(name)) throw Error('Please enter a String')

        let allDrivers = []

        const driversFromDb = await Driver.findAll({
            where: { name: {[Op.iLike]: `%${name}%`} },
            limit: 15
        });

        if(driversFromDb.length<15){
            const driversFromAPI = (await axios(`http://localhost:5000/drivers?name.forename=${name}`)).data
            const missings = 15 - driversFromDb.length;
            allDrivers = driversFromDb.concat(driversFromAPI.slice(0, missings));
        } else {
            allDrivers = driversFromDb;
        }

        if(allDrivers.length === 0) return res.status(404).send('Driver Not Found');

        return res.status(200).json(allDrivers);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = getDriverByName;