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
    ratingAsc: false,
    ratingDesc:false
  })

  const handleFilter = optionFilter => {
    dispatch(filter(optionFilter));
  };

  const handeSort = (event) => {
    if(event.target.name==='alphabetic'){
      setOrder((prevState)=>{
        if(!prevState.AtoZ){
          return {...prevState, AtoZ: true, ratingAsc:false , ratingDesc:false}
        } else if(!prevState.ZtoA){
          return {...prevState, ZtoA: true}
        } else {
          return {AtoZ: false , ZtoA: false, ratingAsc: false , ratingDesc: false  }
        }
      })
    } else if (event.target.name==='rating'){
      setOrder((prevState)=>{
        if(!prevState.ratingAsc){
          return {...prevState, ratingAsc: true, AtoZ:false, ZtoA:false }
        } else if(!prevState.ratingDesc){
          return {...prevState, ratingDesc: true}
        } else {
          return {AtoZ: false , ZtoA: false,ratingAsc: false , ratingDesc: false }
        }
      })
    }
  };

  const handleRatingSort = () => {
    // dispatch(sortByRating());
  };

  useEffect(()=>{
    dispatch(orderBy(toggleOrder))
  },[toggleOrder])

  return (
    <div className='container' >
      <button name='alphabetic' onClick={handeSort}>Sort A-Z</button>
      <button name='rating' onClick={handeSort}>Sort by Rating</button>
      <div>
        <span>Filter by teams:</span>
        <select onChange={(event)=>handleFilter(event.target.value)}>
            <option value="">All Videogames</option>
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