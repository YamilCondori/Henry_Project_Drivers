import './card.css'

const Card=({props, showAll})=>{
    const { id, image,background_image , name, genres, platforms,rating, released,description } = props


    return(
        <>
        {showAll ? (
            <div key={id+"showAll"} className={"cardBox"}>
                <p>{id}</p>
                <h3 className={styles.title}>{name}</h3>
                {genres?.map(elm=> {
                    return <li key={elm.id+"-CardAPI"}>
                        {elm.name}
                    </li>
                    })}
                {background_image ? <img src={background_image} alt="" /> : <p>No image available</p>}
                {platforms?.map(elm=>{
                    return(<li key={elm.platform.id +"-Plarforms"} >
                        {elm.platform.name}
                    </li>)
                })}
                <p>{released}</p>
                <p>{rating}</p>
                <div>{description}</div>
            </div>
        )
        :   (<div key={id} className={"cardBox"}>
                <h3 className={"title"}>{name}</h3>
                {genres?.map(elm=> {
                    return <li key={elm.name+"-CardDB"}>
                        {elm.name}
                    </li>
                    })}
                {image ? <img src={image} alt="" /> : <p>No image available</p>}
            </div>  )      
        }
        </>
    )

}

export default Card;