import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import {Navbar,Button,FormGroup,Form,Nav} from 'reactstrap'
import {FormControl} from 'react-bootstrap'
import { withRouter } from 'react-router';

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedIn);
        

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                   
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
               
            </header>
        )
    }
}

export default withRouter (HeaderComponent) 