import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import JsonListComponent from './JsonListComponent.jsx'
 
class Landing extends Component {
    render() {
        return (
            <div className="Landing">
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/List" component={JsonListComponent}/>
                            
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                           
                            
                            <Route component={ErrorComponent}/>
                        </Switch>
                        
                    </>
                </Router>
               
            </div>
        )
    }
}

export default Landing