import React, {Component} from 'react';
import traveller_logo  from '../assets/images/LaiTravel.png';

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={traveller_logo} className="App-logo" alt="logo" />
                <p className="title">
                    Travel Planner
                </p>
            </header>
        );
    }
}
export default Header;
