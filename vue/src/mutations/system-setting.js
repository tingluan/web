import * as C from "../constants/api";

const state = {
    primaryTypes: [],
    secondaryTypes: [],
    primaryDeptList:[],
    secondaryDeptList:[],
    getStandard:[]

};
const mutations = {

    [C.PRODUCT_PRIMARY_TYPE](state, {payload}){
        state.primaryTypes = payload;
    },

    [C.PRODUCT_SECONDARY_TYPE](state, {payload}){
        state.secondaryTypes = payload;
    },

    [C.SYSTEM_CONFIG_PRIMARY_DEPT_LIST](state, {payload}){
        state.primaryDeptList = payload;
    },

    [C.SYSTEM_CONFIG_SECONDARY_DEPT_LIST](state, {payload}){
        state.secondaryDeptList = payload;
    },

    [C.SYSTEM_CONFIG_STANDARD](state, {payload}){
        state.getStandard = payload;
        console.log(state.getStandard);

    },

    [C.SYSTEM_CONFIG_COMMENT_TARGET](state){

    },
    [C.SYSTEM_CONFIG_DEPT_ADDED](state){

    },
    [C.SYSTEM_CONFIG_DEPT_REMOVED](state){

    },
    [C.SYSTEMCONFIG_DELETETYPE](state){

    },
    [C.SYSTEMCONFIG_ADDTYPE](state){

    },


};

export default{
    state,
    mutations
}
