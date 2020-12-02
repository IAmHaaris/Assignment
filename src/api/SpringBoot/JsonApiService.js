import axios from 'axios'

class HelloWorldService {

    executeJsonApiService() {
        
        return axios.get('http://localhost:8080/callnow');
    }

   
}

export default new HelloWorldService()