

const getApi = (url) => `${window.config.context}/admin/${url}`;

export const CODE_SUCCESS = 200;

export const CODE_NOT_LOGIN = 1001;

export const SYSTEM_ADMIN = 3;
export const DEPT_ADMIN = 2;

export const USER_LOGIN = `${window.config.context}/user/login`;
export const PRODUCT_APP_LIST = getApi('app/list');
export const PRODUCT_PRIMARY_TYPE = getApi('app/type');
export const PRODUCT_SECONDARY_TYPE = getApi('app/subType');
export const APK_FILE_UPLOADED = getApi('app/uploadAppFile');
export const IMAGES_FILE_UPLOADED = getApi('app/uploadImage');
export const PRODUCT_ADDED = getApi('app/insert');
export const PRODUCT_UPDATED = getApi('app/updateApp');
export const PRODUCT_DELETED = getApi('app/deleteApp');
export const PRODUCT_COPIED = getApi('app/copyApp');
export const PRODUCT_COMMENTS_EXPORTED = getApi('app/exportComment');


export const COMMENT_LIST = getApi('comment/list');
export const PRODUCT_APP_NAMES_LIST = getApi('comment/appName/List');
export const PRODUCT_APP_VERSIONS = getApi('comment/versionCode/list');
export const COMMENT_STATUS_UPDATED = getApi('comment/operation');
export const COMMENTS_EXPORTED = getApi('comment/export');


export const PRODUCT_STATISTIC_TOTAL = getApi('statistic/statisticTotal');
export const PRODUCT_STATISTIC_DETAIL=getApi('statistic/statisticDetail/list');



export const DEPT_INFO_STATISTIC_LIST=getApi('statistic/deptInfo/list');
export const DEPT_INFO_STATISTIC_COMMON=getApi('statistic/deptInfo/common');
export const DEPT_INFO_STATISTIC_EXPORT=getApi('statistic/deptInfo/export');
export const DEPT_INFO_STATISTIC_RED_HONOUR=getApi('statistic/honour/list');
export const DEPT_INFO_STATISTIC_BLACK_HONOUR=getApi(`statistic/honour/list?t=${+new Date}`);
export const DEPT_INFO_STATISTIC_DATA_LIST=getApi('statistic/dateList?type=:type');




export const SYSTEM_CONFIG_COMMENT_TARGET=getApi('systemConfig/commentTarget');
export const SYSTEM_CONFIG_PRIMARY_DEPT_LIST=getApi('systemConfig/dept');
export const SYSTEM_CONFIG_SECONDARY_DEPT_LIST=getApi('systemConfig/dept?id=:id');
export const SYSTEM_CONFIG_DEPT_ADDED=getApi('systemConfig/addDept');
export const SYSTEM_CONFIG_DEPT_REMOVED=getApi('systemConfig/deleteDept');
export const SYSTEMCONFIG_DELETETYPE=getApi('systemConfig/deleteType');
export const SYSTEMCONFIG_ADDTYPE=getApi('systemConfig/addType');
export const SYSTEM_CONFIG_STANDARD=getApi('systemConfig/targetList');

