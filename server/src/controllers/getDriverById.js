const { Driver, Team }  = require('../db');
const axios = require('axios')

const getDriverByid = async (req, res)=>{
    try {
        const { id } = req.params;
        if(!id) throw Error('Please put an id Driver to find')
        if(typeof +id !== 'number' && typeof id !== 'string') throw Error('invalid type of id');
        if(!isNaN(id)){
            let {name, number, image, dob, nationality, teams, description, driverRef} = (await axios.get("http://localhost:5000/drivers/" + id)).data
            return res.status(201).json({
                id: +id,
                name: `${name.forename} ${name.surname}`,
                number,
                image: image.url,
                birthdate: dob,
                nationality,
                teams,
                description,
                driverRef
            });
        } else if(isNaN(id)){
            const soughDB = await Driver.findByPk(id, {
                include: Team
            });
            const { name, surname, number, image, birthdate, nationality, Teams, description} = soughDB
            const responseName = `${name} ${surname}`;
            const teamsString = Teams.map(team =>{
                return team.name
            })
            return res.status(200).json({ name: responseName, number, image, birthdate, nationality, teams: teamsString.join(', '), description});
        } else{
            throw new Error('Not founded');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = getDriverByid;