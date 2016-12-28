import {
    PRODUCT_STATISTIC_TOTAL,
    PRODUCT_STATISTIC_DETAIL,
    PRODUCT_PRIMARY_TYPE,
} from "../constants/api";

const state = {
    statisticList: {
        items: [],
        pageSize: 10,
        pageNo: 1,
        totalCount: 0
    },
    typeName:[],


    statisticTotal: {
        totalApp: "",
        totalComment:"",
        totalAccepted: " ",
    }
};

const mutations = {

    [PRODUCT_STATISTIC_DETAIL](state, {payload}){
        state.statisticList = payload;
    },


    [PRODUCT_PRIMARY_TYPE](state,{payload}){
        state.typeName = payload

    },

    [PRODUCT_STATISTIC_TOTAL](state,{payload}){
        state.statisticTotal = payload;
    }


};

export default{
    state,
    mutations
}
