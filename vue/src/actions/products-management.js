import * as C from "../constants/api";
import Api, {createAction} from "../utils/api";

export default {
    
    getAppList: createAction(C.PRODUCT_APP_LIST, Api.getAppList),
    
    getProductPrimaryType: createAction(C.PRODUCT_PRIMARY_TYPE, Api.getProductPrimaryType),
    
    getSecondaryType: createAction(C.PRODUCT_SECONDARY_TYPE, Api.getSecondaryType),
    
    addApp: createAction(C.PRODUCT_ADDED, Api.addApp),
    
    updateApp: createAction(C.PRODUCT_UPDATED, Api.updateApp),
    
    deleteApp: createAction(C.PRODUCT_DELETED, Api.deleteApp, ({appId})=>({appId}) ),
    
    copyApp: createAction(C.PRODUCT_COPIED, Api.copyApp),
}
