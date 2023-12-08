const { Driver, Team } = require('../db');

const postDriver = async (req, res)=>{
    try {
        const {name, surname, description, image, nationality, birthdate, teams} = req.body
        const driverCreated = await Driver.create({
            name,
            surname,
            description,
            image: image.url,
            nationality,
            birthdate
        })

        if(teams.length){
            // const teamsAux = [...teams];
            // for(let i=0; i<teams.length; i++){
            //     for(let j=i; i<teamsAux.length; j++){
            //         if(teams[i] === teamsAux[j]){
            //             return res.status(403).send({message: 'NO se pueden repetir los teams'})
            //         }
            //     }
            // }
            teams.map(async team=>{
                const selectedTeam = await Team.findOne({
                    where: {name: team}
                }); 
                selectedTeam && await driverCreated.addTeams(selectedTeam);
            })
        }

        return res.status(200).json(driverCreated);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = postDriver;