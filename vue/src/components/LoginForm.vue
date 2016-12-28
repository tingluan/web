<template>
    <div class="login-section">
        <el-form :model="user" label-width="80px" :rules="rules" ref='form'>
            <el-form-item label="用户名" prop='account'>
                <el-input placeholder="请输入用户名" v-model="user.account" />
            </el-form-item>
            <el-form-item label="密码" prop='password'>
                <el-input placeholder="请输入密码" v-model="user.password" type="password"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.native="doLogin(user)">登入</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {mapActions } from 'vuex'
    export default{

        name:'LoginForm',

        data(){
            return{
                user:{
                    account:'',
                    password: '',
                },

                rules:{
                    "account":[{required:true, message:"用户名不可以为空", trigger:"change"}],
                    "password":[{required:true, message:"密码不可以为空", trigger:"change"}],
                }
            }
        },

        methods:{
            doLogin(user){
                this.$refs.form.validate( valid => {
                    if(valid){
                        this.showPageLoading();
                        this.login(user).then( res =>{
                            this.hidePageLoading();
                            this.$router.push({path: this.$route.path || '/' })
                        })
                    }
                })
            },


            ...mapActions(["login", 'showPageLoading', 'hidePageLoading'])

        }
    }

</script>


<style lang='less' scoped>
    .login-section{
        width:400px;
        margin:30px  auto;

    }

    .el-button{
        width:100%;
    }
</style>
