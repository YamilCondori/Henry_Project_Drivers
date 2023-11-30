import { SEARCHBYNAME, GETDRIVERS, GETTEAM, FILTER, ORDER, POSTDRIVER, SEARCHBYID } from "./actionTypes";
import axios from 'axios'

const endpoint='http://localhost:3001/drivers'

export const searchByName= (inputName)=>{
    return async (dispatch)=>{
        try {
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

export const getDrivers=(fromAux)=>{
    return async (dispatch)=>{
        try {
            if(fromAux){
                return dispatch({
                    type: GETDRIVERS,
                    payload: fromAux
                })
            }
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

export const filter=(value)=>{
    return async (dispatch)=>{
        try {
            return dispatch({
                type: FILTER,
                payload: value
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

export const postDriver= (videogame)=>{
    return  async(dispatch)=>{
        try {
            const { data }= await axios.post(endpoint, videogame);
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