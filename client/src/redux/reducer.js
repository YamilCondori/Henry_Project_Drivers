import { SEARCHBYNAME, GETDRIVERS, GETTEAM, FILTER, ORDER, POSTDRIVER, SEARCHBYID } from "./actionTypes"

const initialState={
    cards:[],
    teams:[],
    aux:[],
    sortOrder: {},
    filtered: {},
    filtersCombined:[],
    filteredTeams: [],
    filteredOrigin:[],
    soughById:{}
}

const reducer=(state=initialState , { type, payload })=>{
    switch (type) {
        case SEARCHBYNAME: {
            if(payload === 'deleted'){
                if(state.filtersCombined.length){
                    return { ...state, cards: state.filtersCombined}
                } else if(state.filtered.teams) {
                    return {...state, cards: state.filteredTeams}
                } else if(state.filtered.origin){
                    return {...state, cards: state.filteredOrigin}
                } else{
                    return {...state, cards: state.aux}
                }
            } else if(payload.from==='cards'){
                const regex = new RegExp(payload.inputName, 'i');
                const result = [...state.cards].filter(driver=> regex.test(driver.name))
                return {...state, cards: result}
            }
            return { ...state, cards: payload.data}
        }
        case GETDRIVERS: {
            if(payload === true) return {...state, cards:state.aux}  
            return {...state, cards: payload, aux: payload}
        }
        case GETTEAM: return {...state, teams: payload}
        case FILTER: {
            const { teams , origin  } = payload.filterActives;
            const {value} = payload
            let result = [];
            let filteredTeams=[];
            let filteredOrigin=[];
            let filtersCombined=[]
            if(value===''){
                return origin 
                ? {...state, cards: state.filteredOrigin, filtered: payload.filterActives}                
                : {...state, cards: state.aux, filtered: payload.filterActives}
            } else if(value==='api_db'){
                return teams
                ? {...state, cards: state.filteredTeams, filtered: payload.filterActives}
                : {...state, cards: state.aux, filtered: payload.filterActives}
            } else if(value==='API'){
                if(teams){
                    result = [...state.filteredTeams].filter(driver=> !isNaN(driver.id));
                    filteredTeams = state.filteredTeams
                    filteredOrigin = state.aux.filter(driver=> !isNaN(driver.id))
                } else{
                    result = state.aux.filter(driver=> !isNaN(driver.id))
                    return {...state, cards: result, filtered: payload.filterActives, filteredOrigin: result}
                }
            } else if(value==='DB'){
                if(teams){
                    result = [...state.filteredTeams].filter(driver=> isNaN(driver.id))
                    filteredTeams = state.filteredTeams
                    filteredOrigin = state.aux.filter(driver=> isNaN(driver.id));
                } else {
                    result = state.aux.filter(driver=> isNaN(driver.id));
                    return {...state, cards: result, filtered: payload.filterActives, filteredOrigin: result}
                }
            } else {
                if(origin){
                    result = state.filteredOrigin.filter(driver=> driver.teams && driver.teams.includes(value))
                    filteredTeams = state.aux.filter(driver=> driver.teams && driver.teams.includes(value));
                    filteredOrigin = state.filteredOrigin
                } else {
                    result = state.aux.filter(driver=> driver.teams && driver.teams.includes(value));
                    return {...state, cards: result, filtered: payload.filterActives, filteredTeams: result}
                } 
            }

            filtersCombined = teams && origin ? result : []

            return {...state, cards: result, filtered: payload.filterActives, filteredTeams, filteredOrigin, filtersCombined: filtersCombined}
        }
        case ORDER: {
            let sorted=[];
            const {alphabetic, birthdate } = payload
            if(alphabetic.active){
                if(alphabetic.asc){
                    sorted = [...state.cards].sort((a,b)=> a.name.localeCompare(b.name));
                } else if(alphabetic.desc){
                    sorted = [...state.cards].sort((a,b)=> b.name.localeCompare(a.name));
                }
            } else if(birthdate.active){
                if(birthdate.asc){
                    sorted = [...state.cards].sort((a,b)=>{
                        return Number(b.birthdate.replace(/-/g,'')) - Number(a.birthdate.replace(/-/g,''))
                    });
                } else if (birthdate.desc){
                    sorted = [...state.cards].sort((a,b)=>{
                        return Number(a.birthdate.replace(/-/g,'')) - Number(b.birthdate.replace(/-/g,''))
                    });
                }
            } else if(state.filtered.teams && state.filtered.origin) {
                sorted = [...state.filtersCombined]
            } else if(state.filtered.teams){
                sorted = [...state.filteredTeams]
            } else if (state.filtered.origin){
                sorted = [...state.filteredOrigin]
            } else{
                sorted = [...state.aux]
            }

            return {...state , sortOrder: payload, cards: sorted}
        }
        case SEARCHBYID: return {...state, soughById: payload}
        case POSTDRIVER: return {...state, cards:[...state.cards , payload]}
        default: return {...state};
    }
}


export default reducer