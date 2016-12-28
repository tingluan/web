import * as C from "../constants/api";
import Api, {createAction} from "../utils/api";
import {CLEAR_APP_VERSION} from "../constants/actions";

export default {
    
    getCommentList: createAction(C.COMMENT_LIST, Api.getCommentList),
    
    updateCommentStatus: createAction(C.COMMENT_STATUS_UPDATED, Api.updateCommentStatus, ({commentId, status, topFlag}) =>({commentId, status, topFlag})),
    
    getAppNameList:createAction(C.PRODUCT_APP_NAMES_LIST, Api.getAppNameList),
    
    queryAppVersions: createAction(C.PRODUCT_APP_VERSIONS, Api.queryAppVersions),
    
    clearAppVersions: createAction(CLEAR_APP_VERSION),
    
}
