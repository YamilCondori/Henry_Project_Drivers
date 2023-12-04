import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import './DetailCard.css'
import { useEffect } from "react"
import { searchById } from "../../redux/actions"

const DetailCard = () =>{
    const { id } = useParams();
    const dispatch = useDispatch();
    const searched = useSelector(state => state.soughById)

    useEffect(()=>{
        dispatch(searchById(id))
    }, [])

    return(
        <div className="fond-body">
            {console.log(searched)}
            <div className="carnet">
                <div className="tools-carnet">
                    <div className="red box-detail"><span className="circle"></span></div>
                    <div className="yellow box-detail"><span className="circle"></span></div>
                    <div className="green box-detail"><span className="circle"></span></div>
                    <h3>{searched.driverRef.toUpperCase()}</h3>
                </div>
                <img src={searched.image} alt="" />
                <div className="text-carnet">
                    <h5>NAME COMPLETE:</h5>
                    <p>{searched.name}</p>
                    <div className="line" />
                    <h5>NATIONALITY:</h5>
                    <p>{searched.nationality}</p>
                    <div className="line" />
                    <h5>TEAMS:</h5>
                    <p>{searched.teams}</p>
                    <div className="line" />
                    <h5>BIRTHDATE:</h5>
                    <p>{searched.birthdate}</p>
                    <div className="line" />
                    <h5>DESCRIPTION:</h5>
                    <p>{searched.description}</p>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default DetailCard