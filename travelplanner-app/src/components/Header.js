import React from 'react';
import traveller_logo  from '../assets/images/LaiTravel.png';

import { LogoutOutlined } from '@ant-design/icons';

function Header(props) {
    const { isLoggedIn, handleLogout } = props;
    return (
        <header className="App-header">
            <img src={traveller_logo} className="App-logo" alt="logo" />
            <span className="App-title">Travel Planner</span>
            {
                isLoggedIn ?
                    <LogoutOutlined className='logout' onClick={handleLogout}/>
                    :
                    null
            }
        </header>
    );
}
export default Header;
