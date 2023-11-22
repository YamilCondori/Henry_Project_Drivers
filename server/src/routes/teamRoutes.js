const teamRoutes = require('express').Router();
const axios = require('axios')
const { Team, conn } = require('../db');

teamRoutes.get('/', async (req, res)=>{
    let transaction

    try {
        transaction = await conn.transaction();
        const allTeams = await Team.findAll();

        if(!allTeams.length){
            const teams = {}
            const driversFromApi = (await axios.get("http://localhost:5000/drivers")).data

            //no se usa un map, porque por su naturaleza, no espera a que se completen las funcioens asyncronicas
            for (const driver of driversFromApi) {
                if (driver.teams) {
                    const teamNames = driver.teams.split(',');
                    for (const teamName of teamNames) {
                        const name = teamName.trim();
                        if (!teams[name]) {
                            teams[name] = name;
                            const newTeam = await Team.create({ name: name });
                            allTeams.push(newTeam.toJSON());
                        }
                    }
                }
            }
        }
        
        await transaction.commit();
        return res.status(200).json(allTeams);
    } catch (error) {
        await transaction.rollback();
        return res.status(500).send(error.message);
    }
} )

module.exports= teamRoutes;