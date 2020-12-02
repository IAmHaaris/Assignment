import React, { useState,Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import JsonApiService from '../../api/SpringBoot/JsonApiService'
import TodoDataService from '../../api/SpringBoot/JsonApiService'
class JsonListComponent extends Component {
    
    constructor(props) {
        
        console.log('constructor')
        super(props)
        
        this.state = {
            message: null,
            value: '',
            details:[],
            search:null,
            filteredData:[]
        }
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }
    componentDidMount(){
        
        console.log('componentDIDUnmount')
        
        JsonApiService.executeJsonApiService()
        .then(response=>{
            console.log(response)
            this.setState({details:response.data})
            this.setState({filteredData:response.data})
             
        })
      
    }
    
    searchSpace=(event)=>{
        let keyword = event.target.value;
        
        this.setState({search:keyword})
        
      }
    
    handleSuccessfulResponse(response) {
        console.log(response)
        this.setState({ welcomeMessage: response.data.message })
    }
    handleError(error) {

        console.log(error.response)

        let errorMessage = '';

        if (error.message)
            errorMessage += error.message

        if (error.response && error.response.data) {
            errorMessage += error.response.data.message
        }

        this.setState({ welcomeMessage: errorMessage })
    }
    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
            .then(
                response => {
                    console.log(response);
                    //this.setState({ todos: response.data })
                    console.log(this.state.todos.userId)
                }
            )
    }
    render(){
        const jsonResponseBody = this.state.filteredData.filter((data)=>{
            if(this.state.search == null)
           
                return data
        
            else if(data.title.toLowerCase().includes(this.state.search.toLowerCase())){
                return data
            }
          }).map(data=>{
            return(
                <tbody>
                {
                   
                       <tr>
                           <td>{data.userId}</td>
                           <td>{data.id}</td>
                           <td>{data.title}</td>
                           <td>{data.body}</td>
                       </tr>
                    
                
               }
               
            </tbody>
            
            )
          })
         return(
             <div>
                 <h3>List of Posts</h3>
                 Filter Data as per Title:<input type="text" placeholder="Enter item "  onChange={(e)=>this.searchSpace(e)} />
                
                 <table className="table">
                     <thead className="tableHeader">
                         <tr>
                             <th>No</th>
                             <th>UserId</th>
                             <th>Title</th>
                             <th>Description</th>
                         </tr>
                     </thead>
                     {jsonResponseBody}
                 </table>
             </div>
         )
    }
}

export default JsonListComponent