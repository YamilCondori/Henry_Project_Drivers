import './card.css'
import defaultImage from '../../assets/driverdefault.jpg'

const Card=({props})=>{
    const { id, image , name, teams} = props


    return(
        <>
            <div key={id} className={"cardBox"}>
                <div className="tools">
                    <div className="circle">
                    <span className="red box"></span>
                    </div>
                    <div className="circle">
                    <span className="yellow box"></span>
                    </div>
                    <div className="circle">
                    <span className="green box"></span>
                    </div>
                </div>
                <div className='card__content'>
                    <h3 className={"title"}>{name}</h3>
                    {image ? <img src={image} alt="" /> : <img src={defaultImage} />}
                    <p>{teams}</p>
                </div>
            </div>
        </>
    )

}

export default Card;