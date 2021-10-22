import axios from 'axios'

export default {
    state: {
        mySchemes: [],
        changeScheme: {},
        detailScheme: {},
    },
    getters:{
        mySchemes: (s) => s.mySchemes,
        changeScheme: (s) => s.changeScheme,
        detailScheme: (s) => s.detailScheme,
    },
    mutations: {
        setMySchemes(state,data){
            state.mySchemes=data;
        },
        clearMySchemes(state){
            state.mySchemes=[];
        },
        setChangeSchame(state,data){
            state.changeScheme=data;
        },
        clearChangeSchame(state){
            state.changeScheme={}
        },
        setDetailScheme(state,data){
            state.detailScheme=data;
        },
        clearDetailScheme(state){
            state.detailScheme={}
        }
    },
    actions:{
        async loadScheme(ctx,data){
            const token = localStorage.getItem('token');
            if(!token) return ctx.dispatch('authenticate');
            return await axios.get('http://localhost:8080/form/'+data.id,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`,
                }
            }).then(response => {
                return ctx.commit('setChangeSchame',response.data);
            }).catch(error => {
                if(error.response.status) return ctx.dispatch('authenticate');
            })
        },
        async detailScheme(ctx,data){
            const token = localStorage.getItem('token');
            if(!token) return ctx.dispatch('authenticate');
            return await axios.get('http://localhost:8080/form/'+data.id,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`,
                }
            }).then(response => {
                return ctx.commit('setDetailScheme',response.data);
            }).catch(error => {
                if(error.response.status) return ctx.dispatch('authenticate');
            })
        },
        async loadMySchemes(ctx){
            const token = localStorage.getItem('token');
            if(!token) return ctx.dispatch('authenticate');
            return await axios.get('http://localhost:8080/form',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`,
                }
            }).then(response => {
                return ctx.commit('setMySchemes',response.data);
            }).catch(error => {
                if(error.response.status) return ctx.dispatch('authenticate');
            })
        },
        async deleteScheme(ctx,data){
            const token = localStorage.getItem('token');
            if(!token) return ctx.dispatch('authenticate');
            return await axios.delete(`http://localhost:8080/form/${data.id}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`,
                }
            }).then(() => {
                return ctx.dispatch('loadMySchemes');
            }).catch(error => {
                if(error.response.status) return ctx.dispatch('authenticate');
            })
        },
    }
}