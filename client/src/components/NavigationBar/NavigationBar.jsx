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
    birthday: { active: false, asc: false, desc: false }
  })

  const handleFilter = optionFilter => {
    dispatch(filter(optionFilter));
  };

  const handleSort = (option) => {
    // if(event.target.name==='alphabetic'){
    //   setOrder((prevState)=>{
    //     if(!prevState.AtoZ){
    //       return {...prevState, AtoZ: true, birthdayAsc:false , birthdayDesc:false}
    //     } else if(!prevState.ZtoA){
    //       return {...prevState, ZtoA: true}
    //     } else {
    //       return {AtoZ: false , ZtoA: false, birthdayAsc: false , birthdayDesc: false  }
    //     }
    //   })
    // } else if (event.target.name==='birthday'){
    //   setOrder((prevState)=>{
    //     if(!prevState.birthdayAsc){
    //       return {...prevState, birthdayAsc: true, AtoZ:false, ZtoA:false }
    //     } else if(!prevState.birthdayDesc){
    //       return {...prevState, birthdayDesc: true}
    //     } else {
    //       return {AtoZ: false , ZtoA: false,birthdayAsc: false , birthdayDesc: false }
    //     }
    //   })
    // }
    setOrderOptions(prevState => {
      const newOptions = { ...prevState };

      // console.log(option, 'aca');s
      if(option === 'alphabetic'){
        if(prevState.alphabetic.asc){
          newOptions.alphabetic.desc = !prevState.alphabetic.desc
        }
        newOptions.alphabetic.asc = !prevState.alphabetic.asc
        newOptions.alphabetic.active = !prevState.alphabetic.desc ? false : true
      }

      return newOptions;
    });
  };

  useEffect(()=>{
    // dispatch(orderBy(toggleOrder))
    console.log(orderOptions.alphabetic);
  },[orderOptions])

  return (
    <div className='container' >
      <button name='alphabetic' onClick={() => handleSort('alphabetic')} >
        {orderOptions.alphabetic.active ? (orderOptions.alphabetic.asc ? 'A-Z' : 'Z-A') : 'Alphabetic'}
      </button>
      <button name='birthday' onClick={() => handleSort('birthday')}>
        {orderOptions.birthday.active ? (orderOptions.birthday.asc ? 'Birthday Asc' : 'Birthday Desc') : 'Sort by Birthday'}
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