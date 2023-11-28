import { useState } from "react"
import './SearchBar.css'

const SearchBar = () =>{
    const [ name , setName ] = useState('')
    // const dispatch= useDispatch();

    const handleClick=()=>{
        // dispatch(searchByName(name))
        console.log(name);
    }
    const handleChange=(event)=>{
        setName(event.target.value);
    }

    return(
        <nav>
            <input className="input-searchBar" type="search" onChange={handleChange} value={name} placeholder="Buscar Corredor"/>
            <button onClick={handleClick} >Buscar</button>
        </nav>
    )
}

export default SearchBar;