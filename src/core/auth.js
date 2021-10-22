import axios from 'axios'

export class Authentication{

    static async login(username,password){
        return await axios.post('http://localhost:8080/auth/login',{
            username: username,
            password: password,
        },{
            useCredentails:true,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if('access_token' in response.data){
                return this.tokenSave(response.data.access_token);
            }
            return {auth:false}
        }).catch(error => {
            if(error.response.status==401){
                return {auth:false}
            }
        })
    } 

    static logout(){
        localStorage.removeItem('token');
        return {logout:true}
    }
    
    static tokenSave(token){
        localStorage.setItem('token',token);
        return {auth:true}
    }

    static async signup(username,password){
        await axios.post('http://localhost:8080/auth/signup',{
            username: username,
            password: password,
        },{
            useCredentails:true,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            return response.data;
        })
    }
}