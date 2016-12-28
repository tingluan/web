/**
 * Created by tingtinghe on 2016/11/23.
 */
import * as C from "../constants/api";
import Api, {createAction} from "../utils/api";

export default {
    getProductPrimaryType: createAction(C.PRODUCT_PRIMARY_TYPE, Api.getProductPrimaryType),

    getSecondaryType: createAction(C.PRODUCT_SECONDARY_TYPE, Api.getSecondaryType),

    getCommentTarget:createAction(C.SYSTEM_CONFIG_COMMENT_TARGET, Api.getCommentTarget),

    getPrimaryDeptList:createAction(C.SYSTEM_CONFIG_PRIMARY_DEPT_LIST, Api.getPrimaryDeptList),

    getSecondaryDeptList:createAction(C.SYSTEM_CONFIG_SECONDARY_DEPT_LIST, Api.getSecondaryDeptList),


    addDepartment:createAction(C.SYSTEM_CONFIG_DEPT_ADDED, Api.addDepartment),

    deleteDepartment:createAction(C.SYSTEM_CONFIG_DEPT_REMOVED, Api.deleteDepartment),

    deleteType:createAction(C.SYSTEMCONFIG_DELETETYPE, Api.DeleteType),

    addType:createAction(C.SYSTEMCONFIG_ADDTYPE, Api.AddType),

    getStandard: createAction(C.SYSTEM_CONFIG_STANDARD, Api.getStandard),


}
