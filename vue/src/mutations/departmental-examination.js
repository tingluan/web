/**
 * Created by tingtinghe on 2016/11/22.
 */
import * as C from "../constants/api";


const state = {
    deptInfoList: {
        items: [],
        pageSize: 10,
        pageNo: 1,
        totalCount: 0
    },
    redHonourList:[],

    blackHonourList:[],

    commentList:{
        userCount: " ",
        commentUserCount: " ",
        totalComment: " ",
        acceptedCount: " "
    },

    dataList:[]
};
const mutations = {

    [C.DEPT_INFO_STATISTIC_LIST](state, {payload}){
        state.deptInfoList = payload;
        console.log(state.deptInfoList)
    },

    [C.DEPT_INFO_STATISTIC_RED_HONOUR](state, {payload}){

        state.redHonourList = payload;
        console.log(state.redHonourList)
    },

    [C.DEPT_INFO_STATISTIC_BLACK_HONOUR](state, {payload}){

        state.blackHonourList = payload;
        console.log(state.blackHonourList)
    },

    [C.DEPT_INFO_STATISTIC_COMMON](state, {payload}){

        state.commentList = payload;
        console.log(state.blackHonourList)
    },

    [C.DEPT_INFO_STATISTIC_DATA_LIST](state, {payload}){
        state.dataList = payload;
        console.log('state.dataList', state.dataList);
        /*state.dataList = payload.map(item=>{
            return item.fromDate +'——'+item.endDate
            }
        );*/
    },


};

export default{
    state,
    mutations
}
