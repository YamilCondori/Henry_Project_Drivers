import { SEARCHBYNAME, GETDRIVERS, GETTEAM, FILTER, ORDER, POSTDRIVER, SEARCHBYID } from "./actionTypes";
import axios from 'axios'

const endpoint='http://localhost:3001/drivers'

export const searchByName= (inputName, from)=>{
    return async (dispatch)=>{
        try {
            if(from === 'cards'){
                return dispatch({
                    type: SEARCHBYNAME,
                    payload: {from, inputName}
                })
            }
            if(inputName ==='deleted'){
                return dispatch({
                    type: SEARCHBYNAME,
                    payload: 'deleted'
                })
            }
            if(!inputName) throw Error('Ingrese un nombre porfavor');
            const { data } = await axios.get(`${endpoint}/name?name=${inputName}`)

            if(!data) throw Error('Algo salio mal')
            return dispatch({
                type: SEARCHBYNAME,
                payload: {
                    data,
                    name: inputName
                }
            })
        }
        catch (error) {
            return error.message
        }
    }
}

export const getDrivers=()=>{
    return async (dispatch)=>{
        try {
            const { data }= await axios.get(endpoint);
            if(!data) throw Error('Algo salio mal')

            return dispatch({
                type: GETDRIVERS,
                payload: data
            })
        } catch (error) {
            return error.message
        }
    }
}

export const getTeams=()=>{
    const endpoint='http://localhost:3001/teams'
    return async (dispatch)=>{
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: GETTEAM,
                payload: data
            })
        } catch (error) {
            return error.message
        }
    }
}

export const filter=(value, filterActives)=>{
    return async (dispatch)=>{
        try {
            return dispatch({
                type: FILTER,
                payload: {
                    value,
                    filterActives
                }
            })
        } catch (error) {
            return error.message
        }
    }
}

export const orderBy=(instructions)=>{
    return async (dispatch)=>{
        try {
            return dispatch({
                type: ORDER,
                payload: instructions
            })
        } catch (error) {
            return error.message
        }
    }
}

export const postDriver= (driver)=>{
    return  async(dispatch)=>{
        try {
            const { data }= await axios.post(endpoint, driver);
            if(!data) throw Error('algo paso')

            return dispatch({
                type: POSTDRIVER,
                payload: data
            })
        } catch (error) {
            return error.message
        }
    }
}

export const searchById = (id)=>{
    return async(dispatch)=>{
        try {
            const { data } = await axios.get(endpoint+"/"+id);

            return dispatch({
                type: SEARCHBYID,
                payload: data
            })
        } catch (error) {
            return error.message
        }
    }
}