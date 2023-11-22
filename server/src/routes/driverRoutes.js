const driverRoutes = require('express').Router();

const getDrivers = require('../controllers/getDrivers');
const getDriverByid = require('../controllers/getDriverById');
const getDriverByName = require('../controllers/getDriverByName');
const postDriver = require('../controllers/postDriver');

driverRoutes.get('/', async (req, res)=>{
    await getDrivers(req, res);
});

driverRoutes.get('/name', async (req, res)=>{
    await getDriverByName(req, res);
})

driverRoutes.get('/:id', async (req, res)=>{
    await getDriverByid(req, res);
});

driverRoutes.post('/', async (req, res)=>{
    await postDriver(req, res);
})

module.exports = driverRoutes;