import { SEARCHBYNAME, GETDRIVERS, GETTEAM, FILTER, ORDER, POSTDRIVER, SEARCHBYID } from "./actionTypes"

const initialState={
    cards:[],
    teams:[],
    aux:[],
    sortOrder: {},
    filtered: false,
    filteredCards: [],
    soughById:{}
}

const reducer=(state=initialState , { type, payload })=>{
    switch (type) {
        case SEARCHBYNAME: {
            if(payload === 'deleted'){
                return state.filtered
                ? {...state, cards: state.filteredCards}
                : {...state, cards: state.aux}
            }
            return { ...state, cards: payload.data}
        }
        case GETDRIVERS: {
            if(payload === true) return {...state, cards:state.aux}  
            return {...state, cards: payload, aux: payload}
        }
        case GETTEAM: return {...state, teams: payload}
        case FILTER: {
            let filteredCards=[];
            if(payload===''){
                return {...state, cards: state.aux, filtered: false, filteredCards:[]}
            } else if(payload==='api_db'){
                return state.filtered
                ? {...state, cards: state.filteredCards}
                : {...state, cards: state.aux}
            } else if(payload==='API'){
                state.filtered
                ? filteredCards = state.filteredCards.filter(driver=> !isNaN(driver.id))
                : filteredCards = state.aux.filter(driver=> !isNaN(driver.id))
                return {...state, cards: filteredCards}
            } else if(payload==='DB'){
                state.filtered
                ? filteredCards = state.filteredCards.filter(driver=> isNaN(driver.id))
                : filteredCards = state.aux.filter(driver=> isNaN(driver.id));
                return {...state, cards: filteredCards}
            } else {
                filteredCards = state.aux.filter(driver=> driver.teams && driver.teams.includes(payload));
            }

            return {...state, cards: filteredCards, filtered: payload !== '', filteredCards }
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
            } else if(state.filtered) {
                sorted = [...state.filteredCards]
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