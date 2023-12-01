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
        const driverFromApi = (await axios(`http://localhost:5000/drivers?name.forename=${name}`)).data

        allDrivers = allDrivers.concat(driverFromApi,driversFromDb);
        if(allDrivers.length < 15){
            const allDriversFromApi = (await axios.get('http://localhost:5000/drivers')).data
            const regex = new RegExp(name, 'i');
            for (const driver of allDriversFromApi) {
                let nameComplete = `${driver.name.forename} ${driver.name.surname}` 
                if (regex.test(nameComplete)) {
                    const {id, image, nationality, teams, description, dob } = driver
                    allDrivers.push({
                        id,
                        name: nameComplete,
                        image: image.url,
                        nationality,
                        teams,
                        description,
                        birthday: dob});
                    if (allDrivers.length >= 15) break;
                }
            }
        }

        if(allDrivers.length === 0) return res.status(404).json({message : 'Driver Not Found'});

        return res.status(200).json(allDrivers);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = getDriverByName;