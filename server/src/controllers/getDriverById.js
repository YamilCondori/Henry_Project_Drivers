const { Driver, Team }  = require('../db');
const axios = require('axios')

const getDriverByid = async (req, res)=>{
    try {
        const { id } = req.params;
        if(!id) throw Error('Please put an id Driver to find')
        if(typeof +id !== 'number' && typeof id !== 'string') throw Error('invalid type of id');
        if(typeof +id === 'number'){
            let soughAPI = (await axios.get("http://localhost:5000/drivers/" + id)).data
            return res.status(201).json(soughAPI);
        } else if(typeof id === 'string'){
            const soughDB = await Driver.findByPk(id, {
                include: Team
            });
            return res.status(200).json(soughDB);
        } else{
            throw new Error('Not founded');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = getDriverByid;