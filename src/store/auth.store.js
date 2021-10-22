import axios from 'axios'

export default {
    state: {
        user: {
            auth:null,
            data: {},
        }
    },
    getters:{
        user: (s) => s.user,
        isAuth: (s) => s.user.auth,
    },
    mutations: {
        setAuthStatus(state,data){
            state.user.auth=data;
        },
        setDataUser(state,data){
            state.user.data=data;
        }
    },
    actions: {
        async authenticate(ctx){
            const token = localStorage.getItem('token');
            if(!token) ctx.commit('setAuthStatus',false)
            else {
                await axios.get('http://localhost:8080/users/profile',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${token}`,
                    }
                }).then(response => {
                    ctx.commit('setAuthStatus',true)
                    ctx.commit('setDataUser',response.data);
                }).catch(error => {
                    if(error.response.status) ctx.commit('setAuthStatus',false)
                })
            }
        }
    }
}