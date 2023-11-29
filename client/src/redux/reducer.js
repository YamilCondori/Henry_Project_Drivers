import { SEARCHBYNAME, GETDRIVERS, GETTEAM, FILTER, ORDER, POSTDRIVER, SEARCHBYID } from "./actionTypes"

const initialState={
    cards:[],
    teams:[],
    aux:[],
    sortOrder: {},
    filtered: false
}

const reducer=(state=initialState , { type, payload })=>{
    switch (type) {
        case SEARCHBYNAME: {
            return { ...state, cards: [...state.cards, payload], aux:[...state.aux, payload]}
        }
        case GETDRIVERS: return {...state, cards: payload, aux: payload}
        case GETTEAM: return {...state, teams: payload}
        case FILTER: {
            let filteredCards=[];
            if(payload===''){
                filteredCards = state.aux;
            } else if(payload==='API'){
                filteredCards = state.aux.filter(driver=> typeof +driver.id=== 'number')
            } else if(payload==='DB'){
                filteredCards = state.aux.filter(driver=> typeof +driver.id === 'string');
            } else {
                filteredCards = state.aux.filter(driver=> driver.teams.includes(payload));
            }

            return {...state, cards: filteredCards, filtered: payload !== '' }
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
            } else if(payload.hasFilter) {

            } else {
                sorted = state.aux
            }

            // const hasSorted = Object.values(payload).some(value=>value===true)

            // if(!hasSorted && state.filtered === false){
            //     sorted = state.aux
            // } else if(!hasSorted && state.filtered === true){

            // }

            return {...state , sortOrder:payload, cards: sorted}
        }
        case SEARCHBYID: return {...state, cards:[payload, ...state.cards]}
        case POSTDRIVER: return {...state, cards:[...state.cards , payload]}
        default: return {...state};
    }
}


export default reducer