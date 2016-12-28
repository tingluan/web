import "es6-promise";
import "whatwg-fetch";
import {Message} from "element-ui";
import qs from "querystring";
import isEmpty from "lodash.isempty";
import * as C from "../constants/api";

const METHODS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
};

const request = (url, params, method = METHODS.GET, jsonType = false) => {
    var options = {
        headers: {
            'Content-Type': jsonType ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded'
        },
        method: method,
        credentials: 'include'
    };
    if (method !== METHODS.GET && !isEmpty(params)) {
        options.body = jsonType ? JSON.stringify(params) : qs.stringify(params)
    } else if (method === METHODS.GET && !isEmpty(params)) {
        const newParams = ( ~url.lastIndexOf('?') ? '&': '?' )  + qs.stringify(params);
        url += newParams ;

    }
    return fetch(url, options).then(checkRespStatus);
};

const post = (url, params) => request(url, params, METHODS.POST, true);

// check resp status
const checkRespStatus = (respPromise) => {
    if (respPromise.status !== 200) {
        return Promise.reject('Server error occurred');
    }
    return respPromise.json().then(resp => {
        return new Promise((resolve, reject) => {
            if (resp && resp.code == C.CODE_SUCCESS) {
                resolve(resp.data);
            } else if (resp && resp.code == C.CODE_NOT_LOGIN) {
                // 页面超时，重新刷新页面
                window.location.reload();
            } else {
                resp.msg && Message({message: resp.msg, type: 'warning', showClose: true});
                reject(resp);
            }
        });
    });
};


export const createAction = (type, payloadCreator, metaCreator) => {
    const identity = (...args) => args[0];
    const isFunc = (fn) => typeof(fn) === 'function';
    const isPromise = obj => typeof(obj) === 'object' && isFunc(obj.then);
    const finalPayloadCreator = isFunc(payloadCreator) ? payloadCreator : identity;

    return ({commit, dispatch}, ...args) => {
        const payload = finalPayloadCreator(...args);
        const action = {type, payload};

        if (isFunc(metaCreator)) {
            action.meta = metaCreator(...args);
        }

        if (isPromise(payload)) {
            return payload.then(result => {
                commit(type, Object.assign(action, {payload: result}));
                return result;
            }).catch(error => {
                commit(type, Object.assign(action, {error: true, msg: error.msg}));
                return error;
            });
        }

        return commit(type, Object.assign(action, {payload}));
    };
};


export default {

    login: params => post(C.USER_LOGIN, params),

    getAppList: params => request(C.PRODUCT_APP_LIST, params),

    getProductPrimaryType: params => request(C.PRODUCT_PRIMARY_TYPE, params),

    getSecondaryType: params => request(C.PRODUCT_SECONDARY_TYPE, params),

    addApp: params => post(C.PRODUCT_ADDED, params),

    updateApp: params => post(C.PRODUCT_UPDATED, params),

    deleteApp: params => post(C.PRODUCT_DELETED, params),

    copyApp: params => post(C.PRODUCT_COPIED, params),

    //exportCommentsForApp: params => post(C.PRODUCT_COMMENTS_EXPORTED, params),


    getCommentList: params => request(C.COMMENT_LIST, params),
    getAppNameList: params => request(C.PRODUCT_APP_NAMES_LIST, params),
    queryAppVersions: params => request(C.PRODUCT_APP_VERSIONS, params),
    updateCommentStatus: params => post(C.COMMENT_STATUS_UPDATED, params),

    //获取所有产品的统计结果
    getTotalStatistic: params => request(C.PRODUCT_STATISTIC_TOTAL, params),
    getDetailStatistic:params =>request(C.PRODUCT_STATISTIC_DETAIL,params),


    //部门信息统计情况

    getDeptInfoList: params => request(C.DEPT_INFO_STATISTIC_LIST, params),
    getCommonList: params => request(C.DEPT_INFO_STATISTIC_COMMON, params),
    getExportData: params => request(C.DEPT_INFO_STATISTIC_EXPORT, params),
    getRedHonourList: params => request(C.DEPT_INFO_STATISTIC_RED_HONOUR, params),
    getBlackHonourList: params => request(C.DEPT_INFO_STATISTIC_BLACK_HONOUR,params),
    getDateList:type => request(C.DEPT_INFO_STATISTIC_DATA_LIST.replace(":type", type)),

    //系统配置
    getCommentTarget: params => post(C.SYSTEM_CONFIG_COMMENT_TARGET,params),
    getPrimaryDeptList: () => request(C.SYSTEM_CONFIG_PRIMARY_DEPT_LIST),
    getSecondaryDeptList: id => request(C.SYSTEM_CONFIG_SECONDARY_DEPT_LIST.replace(":id", id)),
    addDepartment: params => post(C.SYSTEM_CONFIG_DEPT_ADDED, params),
    deleteDepartment: params => post(C.SYSTEM_CONFIG_DEPT_REMOVED, params),
    DeleteType: params => post(C.SYSTEMCONFIG_DELETETYPE, params),
    AddType: params => post(C.SYSTEMCONFIG_ADDTYPE, params),
    getStandard:params =>request(C.SYSTEM_CONFIG_STANDARD,params),

};

