import * as C from "../constants/api";
import {CLEAR_APP_VERSION} from "../constants/actions";

const state = {
    commentList: {
        items: [],
        pageSize: 10,
        pageNo: 1,
        totalCount: 0
    },
    
    appNames: [],
    
    appVersions: [],
};
const mutations = {
    
    [C.COMMENT_LIST](state, {payload}){
        state.commentList = payload;
    },
    
    [C.PRODUCT_APP_NAMES_LIST](state, {payload}){
        state.appNames = payload;
    },
    
    [C.PRODUCT_APP_VERSIONS](state, {payload}){
        state.appVersions = payload;
    },
    
    [CLEAR_APP_VERSION](state){
        state.appVersions = [];
    },
    
    [C.COMMENT_STATUS_UPDATED](state, {meta:{commentId, status, topFlag}}){
        state.commentList.items = state.commentList.items.map(comment => {
            if (comment.commentId === commentId) {
                comment.status = status;
                comment.topFlag = topFlag;
            }
            return comment;
        });
        
    },
};

export default{
    state,
    mutations
}
