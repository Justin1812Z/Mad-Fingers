import './Navbar.css';
import { NavLink } from 'react-router-dom';

function Navbar() {

    return (
        <div className="navbar">
            <h1>Mad Fingers</h1>
            <ul>
                <li><NavLink to="/"><button>home</button></NavLink></li>
                <li><NavLink to="/game"><button>game</button></NavLink></li>
                <li><NavLink to="/testing"><button>testing</button></NavLink></li>
            </ul>
        </div>
    )
}

export default Navbar;