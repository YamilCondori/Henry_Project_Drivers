import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import './DetailCard.css'
import Card from "../Card/Card"
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
            <div className="carnet">
                <div className="tools-carnet">
                    <div className="red box-detail"><span className="circle"></span></div>
                    <div className="yellow box-detail"><span className="circle"></span></div>
                    <div className="green box-detail"><span className="circle"></span></div>
                </div>
                <img src={searched.image} alt="" />
            </div>
        </div>
    )
}

export default DetailCard