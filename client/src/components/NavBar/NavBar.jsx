import './NavBar.css'
import { Link } from 'react-router-dom';

const NavBar = () =>{
    return (
        <nav className='container-navbar'>
            <h2>EMPRESA GENERICA</h2>
            <Link to='/home' key='home-button'><button>HOME</button></Link>
            <Link to='/contact' key='contact-button'><button>CONTACT</button></Link>
            <Link to='/createdriver' key='create-button'><button>CREATE DRIVER</button></Link>
        </nav>
    )
}

export default NavBar;