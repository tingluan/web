import {SHOW_PAGE_LOADING, HIDE_PAGE_LOADING, GET_CURRENT_USER} from "../constants/actions";
import * as C from "../constants/api";

const state = {
    pageLoading: false,
    currentUser: {},
    
};
const mutations = {
    
    [C.USER_LOGIN](state, {payload:{role,name}}){
        state.currentUser.role = role;
        state.currentUser.name = name;
    },
    
    [SHOW_PAGE_LOADING](state){
        state.pageLoading = true;
    },
    
    [HIDE_PAGE_LOADING](state){
        state.pageLoading = false;
    },
    
    [GET_CURRENT_USER](state){
        let user = state.currentUser;
        if (user.name && user.role) {
            state.currentUser = user;
        } else {
            user = window.config && window.config.currentUser;
            user && ( state.currentUser = user);
        }
    }
    
};

export default{
    state,
    mutations
}
