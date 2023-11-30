import { SEARCHBYNAME, GETDRIVERS, GETTEAM, FILTER, ORDER, POSTDRIVER, SEARCHBYID } from "./actionTypes"

const initialState={
    cards:[],
    teams:[],
    aux:[],
    sortOrder: {},
    filtered: false,
    filteredCards: []
}

const reducer=(state=initialState , { type, payload })=>{
    switch (type) {
        case SEARCHBYNAME: {
            return { ...state, cards: payload}
        }
        case GETDRIVERS: return {...state, cards: payload, aux: payload}
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
                ? filteredCards = state.filteredCards.filter(driver=> typeof +driver.id=== 'number')
                : filteredCards = state.aux.filter(driver=> typeof +driver.id=== 'number')
                return {...state, cards: filteredCards}
            } else if(payload==='DB'){
                state.filtered
                ? filteredCards = state.filteredCards.filter(driver=> typeof +driver.id=== 'string')
                : filteredCards = state.aux.filter(driver=> typeof +driver.id === 'string');
                return {...state, cards: filteredCards}
            } else {
                filteredCards = state.aux.filter(driver=> driver.teams.includes(payload));
            }

            return {...state, cards: filteredCards, filtered: payload !== '', filteredCards }
        }
        case ORDER: {
            let sorted=[];
            if(payload.AtoZ && !payload.ZtoA){
                sorted = [...state.cards].sort((a,b)=> a.name.localeCompare(b.name));
            } else if(payload.AtoZ && payload.ZtoA){
                sorted = [...state.cards].sort((a,b)=> b.name.localeCompare(a.name));
            } else if(payload.birthdayAsc && !payload.birthdayDesc){
                sorted = [...state.cards].sort((a,b)=>{
                    return Number(b.birthday.replace(/-/g,'')) - Number(a.birthday.replace(/-/g,''))
                });
            } else if(payload.birthdayAsc && payload.birthdayDesc){
                sorted = [...state.cards].sort((a,b)=>{
                    return Number(a.birthday.replace(/-/g,'')) - Number(b.birthday.replace(/-/g,''))
                });
            } else if(state.filtered){
                sorted = state.filteredCards
            } else {
                sorted = state.aux
            }

            return {...state , sortOrder: payload, cards: sorted}
        }
        case SEARCHBYID: return {...state, cards:[payload, ...state.cards]}
        case POSTDRIVER: return {...state, cards:[...state.cards , payload]}
        default: return {...state};
    }
}


export default reducer