import SearchBar from "../SearchBar/SearchBar";
import NavigationBar from "../NavigationBar/NavigationBar";
import CardsContainer from "../CardsContainer/CardsContainer";
import './Home.css'

const HomePage = () =>{

    return(
        <div className="container-home" >
            <NavigationBar/>
            <CardsContainer/>
        </div>
    )
}

export default HomePage;