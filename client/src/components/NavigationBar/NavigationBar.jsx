import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NavigationBar.css'
import { filter, orderBy} from '../../redux/actions';
import SearchBar from '../SearchBar/SearchBar';

const NavigationBar = () => {
  const dispatch = useDispatch();
  const teams = useSelector(state => state.teams);
  const [toggleOrder, setOrder] = useState({
    AtoZ: false,
    ZtoA: false,
    birthdayAsc: false,
    birthdayDesc:false
  })

  const handleFilter = optionFilter => {
    dispatch(filter(optionFilter));
  };

  const handleSort = (event) => {
    if(event.target.name==='alphabetic'){
      setOrder((prevState)=>{
        if(!prevState.AtoZ){
          return {...prevState, AtoZ: true, birthdayAsc:false , birthdayDesc:false}
        } else if(!prevState.ZtoA){
          return {...prevState, ZtoA: true}
        } else {
          return {AtoZ: false , ZtoA: false, birthdayAsc: false , birthdayDesc: false  }
        }
      })
    } else if (event.target.name==='birthday'){
      setOrder((prevState)=>{
        if(!prevState.birthdayAsc){
          return {...prevState, birthdayAsc: true, AtoZ:false, ZtoA:false }
        } else if(!prevState.birthdayDesc){
          return {...prevState, birthdayDesc: true}
        } else {
          return {AtoZ: false , ZtoA: false,birthdayAsc: false , birthdayDesc: false }
        }
      })
    }
  };

  useEffect(()=>{
    dispatch(orderBy(toggleOrder))
  },[toggleOrder])

  return (
    <div className='container' >
      <button name='alphabetic' onClick={handleSort}>Sort A-Z</button>
      <button name='birthday' onClick={handleSort}>Sort by Bithday</button>
      <div>
        <span>Filter by teams:</span>
        <select onChange={(event)=>handleFilter(event.target.value)}>
            <option value="">All Teams</option>
            {teams.map(teams => (
                <option value={teams.name} key={teams.name}>{teams.name}</option>
            ))}
        </select>
      </div>
      <div>
        <span>Filter by Origin:</span>
        <select onChange={(event)=>handleFilter(event.target.value)}>
            <option value="">All</option>
            <option value="API">API</option>
            <option value="DB">DataBase</option>
        </select>
      </div>
      <SearchBar/>
    </div>
  );
};

export default NavigationBar;