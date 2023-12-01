import NavigationBar from "../NavigationBar/NavigationBar";
import CardsContainer from "../CardsContainer/CardsContainer";
import './Home.css'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDrivers, getTeams } from "../../redux/actions";

const HomePage = () =>{

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDrivers());
        dispatch(getTeams());
    },[])


    return(
        <div className="container-home" >
            <NavigationBar/>
            <CardsContainer/>
        </div>
    )
}

export default HomePage;