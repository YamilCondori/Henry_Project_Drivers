import { useState } from "react"
import './SearchBar.css'
import { useDispatch } from "react-redux";
import { getDrivers, searchByName } from "../../redux/actions";

const SearchBar = ({from}) =>{
    const [ name , setName ] = useState('')
    const dispatch= useDispatch();

    const handleClick=()=>{
        from 
        ? dispatch(searchByName(name.toLocaleLowerCase(), from))
        : dispatch(searchByName(name.toLocaleLowerCase()))
    }

    const handleChange=(event)=>{
        setName(event.target.value);
        event.target.value==='' && dispatch(searchByName('deleted'))
    }

    return(
        <nav>
            <input className="input-searchBar" type="search" onChange={handleChange} value={name} placeholder="Buscar Corredor"/>
            <button onClick={handleClick} >Buscar</button>
        </nav>
    )
}

export default SearchBar;