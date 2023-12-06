import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NavigationBar.css'
import { filter, orderBy} from '../../redux/actions';
import SearchBar from '../SearchBar/SearchBar';

const NavigationBar = () => {
  const dispatch = useDispatch();
  const teams = useSelector(state => state.teams);
  const [orderOptions, setOrderOptions] = useState({
    alphabetic: { active: false, asc: false , desc: false},
    birthdate: { active: false, asc: false, desc: false }
  })

  const handleFilter = (optionFilter) => {
    dispatch(filter(optionFilter));
  };

  const handleSort = (option) => {
    setOrderOptions(prevState => {
      const newOptions = { ...prevState };
      const disabled = { active: false, asc: false , desc: false}
      
      if(option === 'alphabetic'){
        newOptions.birthdate = disabled
        if(prevState.alphabetic.desc){
          newOptions.alphabetic = disabled
        } else if(!prevState.alphabetic.asc) {
          newOptions.alphabetic = { active: true, asc: true , desc: false}
        } else if(!prevState.alphabetic.desc){
          newOptions.alphabetic = { active: true, asc: false , desc: true};
        }
      }

      if(option === 'birthdate'){
        newOptions.alphabetic = disabled
        if(prevState.birthdate.desc){
          newOptions.birthdate = disabled
        } else if(!prevState.birthdate.asc) {
          newOptions.birthdate = { active: true, asc: true , desc: false}
        } else if(!prevState.birthdate.desc){
          newOptions.birthdate = { active: true, asc: false , desc: true};
        }
      }

      return newOptions;
    });
  };

  useEffect(()=>{
    dispatch(orderBy(orderOptions))
  },[orderOptions])

  return (
    <div className='container' >
      <button name='alphabetic' onClick={() => handleSort('alphabetic')} >
        {orderOptions.alphabetic.active ? (orderOptions.alphabetic.asc ? 'A-Z' : 'Z-A') : 'Alphabetic'}
      </button>
      <button name='birthdate' onClick={() => handleSort('birthdate')}>
        {orderOptions.birthdate.active ? (orderOptions.birthdate.asc ? 'birthdate Asc' : 'birthdate Desc') : 'Sort by birthdate'}
      </button>
      <div>
        <select onChange={(event)=>handleFilter(event.target.value)}>
            <option value="">All Teams</option>
            {teams.map(teams => (
                <option value={teams.name} key={teams.name}>{teams.name}</option>
            ))}
        </select>
      </div>
      <div>
        <select onChange={(event)=>handleFilter(event.target.value)}>
            <option value="api_db">All</option>
            <option value="API">API</option>
            <option value="DB">DataBase</option>
        </select>
      </div>
      <SearchBar/>
    </div>
  );
};

export default NavigationBar;