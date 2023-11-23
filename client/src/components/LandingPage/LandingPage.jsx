import './landingPage.css'
import { useNavigate } from 'react-router-dom';

const LandingPage = () =>{
    const navigate = useNavigate();

    const redirection = () =>{
        navigate('/home')
    }

    return (
        <div className='fondo-container'>
            <div className='info-container'>
                <h1>This is a website for fans of the races</h1>
                <p>this is a web text for races fans</p>
                <button onClick={redirection} >get in</button>
            </div>
        </div>
    )
}

export default LandingPage;