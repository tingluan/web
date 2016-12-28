<template>
    <div class='page-wrapper'>
        <loading-indicator :showing='pageLoading'></loading-indicator>
        <header className="page-header">
            <div class="logo">
                应用内测平台
            </div>

            <div class='user' v-if='isLogin'>
                <span>{{currentUser.name}}</span>
            </div>

            <a v-if='isLogin' :href="logoutURL" class="logout"><i class="anticon anticon-logout"></i></a>
        </header>

        <div class="page-content-wrapper" v-if='isLogin'>
            <div class="sidebar pull-left">
                <el-menu :default-active="$route.path" :default-openeds='["contents","statistics", "settings"]'
                         :router="true">
                    <el-submenu index='contents'>
                        <span slot='title'>内容管理</span>
                        <el-menu-item index='/product-management'>产品管理</el-menu-item>
                        <el-menu-item index='/comments-management'>评论管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index='statistics'>
                        <span slot='title'>数据统计</span>
                        <el-menu-item index='/product-statistics'>产品统计</el-menu-item>
                        <el-menu-item index='/dept-kpi'>部门考核</el-menu-item>
                    </el-submenu>
                    <el-submenu index='settings' v-if='isSystemAdmin'>
                        <span slot='title'>系统设置</span>
                        <el-menu-item index='/system-settings'>系统该设置</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
            <div class="page-content">
                <router-view></router-view>
            </div>
        </div>

        <login-form v-if='!isLogin' />
    </div>
</template>

<script>
    import Vue from 'vue'
    import Element from 'element-ui'
    import {mapState, mapActions} from 'vuex'
    import LoadingIndicator from './components/LoadingIndicator'
    import LoginForm from './components/LoginForm'
    import utils from './utils/misc'

    Vue.use(Element);

    export default {

        name: 'App',

        data(){
            return {
                logoutURL: `${window.config.context}/user/logout`,
            }
        },

        beforeMount(){
            this.getCurrentUser();
        },

        components: {
            LoadingIndicator,
            LoginForm
        },


        methods: mapActions(['getCurrentUser']),

        computed: mapState({
            pageLoading: ({root}) => root.pageLoading,
            currentUser: ({root}) => root.currentUser,
            isLogin(){
                return this.currentUser.name && this.currentUser.role;
            },
            isSystemAdmin(){
                return utils.isSystemAdmin();
            }
        })
    };




</script>


<style lang="less">
    @import "./layouts/css/index";
    @import "../node_modules/element-ui/lib/theme-default/index.css";

    header {
        min-width: @body-width;
        padding-left: 30px;
        height: @header-height;
        background-color: @header-color;
        position: relative;
        overflow: hidden;

        .logo {
            background: transparent url('./layouts/img/logo.png') 0 center no-repeat;
            padding-left: 40px;
            margin-right: 50px;
            font-size: 16px;
            float: left;
            line-height: @header-height;
            height: 100%;
            color: #fff;

        }

        .user {
            position: absolute;
            background: transparent url("./layouts/img/avatar.png") left center no-repeat;
            top: 0;
            right: 90px;
            padding-left: 35px;
            span {
                text-align: center;
                color: #fff;
                line-height: @header-height;
            }
        }

        .logout {
            position: absolute;
            right: 0;
            top: 0;
            font-size: 16px;
            color: #BDDDFF;
            width: 72px;
            height: @header-height;
            background-color: #0489ca;
            padding: 24px 28px;

            &:hover {
                color: #fff;
                background-color: #028fd5;
            }
        }

    }

    .page-content-wrapper {
        min-width: 1280px;
        position: absolute;
        top: 64px;
        left: 0;
        right: 0;
        bottom: 0;

        .sidebar {
            width: 240px;
            border-right: 1px solid #d2e4f1;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            height: 100%;
        }

        .page-content {
            position: absolute;
            left: 240px;
            right: 0;
            top: 0;
            padding: 20px;
        }
    }
</style>


