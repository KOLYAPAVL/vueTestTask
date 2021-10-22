import axios from 'axios'

export class Schemes{

    static async create(data){
        const token = localStorage.getItem('token');
        if(token) return await axios.post('http://localhost:8080/form',{
            schema: data,
        },{
            useCredentails:true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,
            }
        }).then(response => {
            if('id' in response.data){
                return {success:true,id:response.data.id}
            }
            return {success:false}
        }).catch(() => {
            return {success:false}
        })
    }

    static async save(id,data){
        const token = localStorage.getItem('token');
        if(token) return await axios.post('http://localhost:8080/form/'+id,{
            schema: data,
        },{
            useCredentails:true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,
            }
        }).then(() => {
            return {success:true}
        }).catch(() => {
            return {success:false}
        })
    }
}