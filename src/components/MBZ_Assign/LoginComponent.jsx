import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import { Card, CardImg, CardImgOverlay, CardTitle, CardText } from "reactstrap";
import {Redirect} from 'react-router-dom';
class LoginComponent extends Component {

    constructor(props) {
        super(props)
 
        this.state = {
            username: '',
            password: '', 
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
       
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    

    loginClicked() {
            console.log("Login clicked")
            AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                console.log(response)
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                this.props.history.push(`/List`);
                console.log(response)
             
            }).catch(() => { 
                //this.props.history.push(`/List`);
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
                console.log("Not getting any response from jwt authentication")
            })
         
       
           

    }

    render() {
        this.state.hasLoginFailed=false
        return (
            <>
             <Card className=" bg-dark text-white border-0">
        <CardImg
          alt="..."
         
          src={require('../../images/mc.jpg')}
        ></CardImg>
        <CardImgOverlay className=" d-flex align-items-top">
          <div>
          <h1>Login</h1>
                <div className="container">
                   
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                   
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            
          </div>
        </CardImgOverlay>
      </Card>
            
            </>
        )
    }
}

export default LoginComponent