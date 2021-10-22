<template>
    <div class='login'>
        <div class="login-form">
            <div class="login-logo-wrapper">
                <div class="login-logo"></div>
            </div>
            <div class="alert alert-error" v-if="error.length > 0">
                {{error}}
            </div>
            <div class="login-title">Вход</div>
            <Input @keyup="error.username=false" :config="{label:'Логин',type:'text',placeholder:'',error:error.username}" @changeValue="function(a){username=a}"></Input>
            <Input @keyup="error.password=false" :config="{label:'Пароль',type:'password',placeholder:'',error:error.password}" @changeValue="function(a){password=a}"></Input>
            <div class="login-button">
                <button class="button button-cover" @click="login">Войти</button>
            </div>
        </div>
    </div>
</template>
<script>
import {Authentication} from '../core/auth.js';
import Mixin from '../mixins/login.mixin';

export default {
    name: 'Login',
    mixins: [Mixin],
    data: () => ({
        username: "",
        password: "",
        showPassword: false,
        error: {
            username: false,
            password: false,
        },
    }),
    methods:{
        async login(){
            let valid = true;
            if(this.username.length==0){
                this.error.username=true;
                valid=false;
            }
            if(this.password.length==0){
                this.error.password=true;
                valid=false;
            }

            if(!valid){return false;}

            const a = await Authentication.login(this.username,this.password);
            if(a.auth){
                this.$store.dispatch('authenticate');
            }
            else this.error.username,this.error.password=true;
        }
    }
}
</script>