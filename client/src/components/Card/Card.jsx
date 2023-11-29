import './card.css'

const Card=({props, showAll})=>{
    const { id, image , name, teams, description } = props


    return(
        <>
        {showAll ? (
            <div key={id+"showAll"} className={"cardBox"}>
                <p>{id}</p>
                <h3 className='title'>{name}</h3>
                {image ? <img src={image} alt="" /> : <p>No image available</p>}
                <div>{description}</div>
            </div>
        )
        :   (<div key={id} className={"cardBox"}>
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
                    {image ? <img src={image} alt="" /> : <p>No image available</p>}
                    <p>{teams}</p>
                </div>
            </div>  )      
        }
        </>
    )

}

export default Card;