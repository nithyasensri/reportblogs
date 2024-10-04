import React from 'react';
import { Link } from 'react-router-dom'
import banner from '../assets/glasso-banner-1.jpg'
const Header = () => {
    return (
        <div className='header'>
            <div className='banner'>
                <img src={banner} />
                <nav className='menu'>
                    <Link to="/" style={{ margin: "10px", "Color": '#fff' }}>Home</Link>
                    <Link to="/addform" style={{ margin: "10px", "Color": '#fff' }}>AddUser</Link>
                    <Link to="/users" style={{ marginLeft: "10px", "Color": '#fff' }}>UsersList</Link>
                </nav>
            </div>


        </div>
    );
};

export default Header;