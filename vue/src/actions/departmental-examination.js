/**
 * Created by tingtinghe on 2016/11/22.
 */
import * as C from "../constants/api";
import Api, {createAction} from "../utils/api";


export default {

    getDeptInfoList: createAction(C.DEPT_INFO_STATISTIC_LIST, Api.getDeptInfoList),

    getCommonList: createAction(C.DEPT_INFO_STATISTIC_COMMON, Api.getCommonList),

    getExportData:createAction(C.DEPT_INFO_STATISTIC_EXPORT, Api.getExportData),

    getRedHonourList: createAction(C.DEPT_INFO_STATISTIC_RED_HONOUR, Api.getRedHonourList),

    getBlackHonourList: createAction(C.DEPT_INFO_STATISTIC_BLACK_HONOUR, Api.getBlackHonourList),

    getDataList: createAction(C.DEPT_INFO_STATISTIC_DATA_LIST, Api.getDateList),


}
