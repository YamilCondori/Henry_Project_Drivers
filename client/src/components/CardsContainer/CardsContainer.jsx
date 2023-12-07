import { useSelector } from "react-redux"
import Card from "../Card/Card";
import { useState } from "react";
import './CardsContainer.css'
import { Link } from "react-router-dom"


const CardsContainer=()=>{
    const cards = useSelector(state=> state.cards);
    const [currentPage , setCurrentPage] = useState(1);
    const [driversPerPage] = useState(9);

    const indexOfLastdriver= currentPage* driversPerPage;
    const indexOfFirstdriver = indexOfLastdriver - driversPerPage;
    const currentDrivers= cards?.slice(indexOfFirstdriver,indexOfLastdriver);

    const previousPage=()=>{
        setCurrentPage(prevPage=>prevPage-1);
    }
    const nextPage=()=>{
        setCurrentPage(prevPage=>prevPage+1);
    }

    return(
        <div className='cardsContainer' >
            <div className="buttonsContainer">
                <button onClick={previousPage} disabled={currentPage===1}> {"<"} </button>
                    <div className="centerCards" >
                        { currentDrivers?.map(driver => {
                            return (
                                <Link to={`/home/detailpage/${driver.id}`} key={driver.id+"-Link"} className={`cards-link`}>
                                    <Card  key={driver.id+"-card"} props={driver}/>
                                </Link>
                            )
                        })}
                    </div>
                <button onClick={nextPage} disabled={indexOfLastdriver>=cards.length}>{">"}</button>
            </div>
        </div>
    )
}

export default CardsContainer