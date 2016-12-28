
import Vue from "vue";
import store from "./store";
import router from "./router";
import {sync} from "vuex-router-sync";
import App from './App'

sync(store, router);


Vue.filter('basename', value =>{
    const matches =  `${value}`.match(/\/([^/]+\.apk)$/);
    return matches && matches[1] || value;
});

new Vue({
    el:'#root',
    store,
    router,
    render: h => h(App)
    
});

