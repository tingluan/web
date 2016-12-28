import * as C from "../constants/api";

const state = {
    appList: {
        items: [],
        pageSize: 10,
        pageNo: 1,
        totalCount: 0
    },
    
    primaryTypes: [],
    
    secondaryTypes: [],
};
const mutations = {
    
    [C.PRODUCT_APP_LIST](state, {payload}){
        state.appList = payload;
    },
    
    [C.PRODUCT_PRIMARY_TYPE](state, {payload}){
       state.primaryTypes = payload.map( item =>{
           item.id = `${item.id}`;
           return item;
       })
    },
    
    [C.PRODUCT_SECONDARY_TYPE](state, {payload}){
        state.secondaryTypes = payload.map( item =>{
            item.id = `${item.id}`;
            return item;
        })
    },
    
    [C.PRODUCT_ADDED](state){
        
    },
    
    [C.PRODUCT_COPIED](state){
        
    },
    
    [C.PRODUCT_DELETED](state, {meta:{appId}}){
        state.appList.items = state.appList.items.filter(item => {
            return item.appId !== appId
        });
    },
    
    [C.PRODUCT_UPDATED](state){
        
    },
};

export default{
    state,
    mutations
}
