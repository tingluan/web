import {
    PRODUCT_STATISTIC_TOTAL,
    PRODUCT_STATISTIC_DETAIL,
    PRODUCT_TYPE_NAME,
    PRODUCT_PRIMARY_TYPE,
} from "../constants/api";
import Api, {createAction} from "../utils/api";

const metaCreator = ({processId}) =>({processId});

export default {

    getTotalStatistic: createAction(PRODUCT_STATISTIC_TOTAL, Api.getTotalStatistic),

    getDetailStatistic: createAction(PRODUCT_STATISTIC_DETAIL, Api.getDetailStatistic),

    getTypeName:createAction(PRODUCT_PRIMARY_TYPE, Api.getProductPrimaryType),



}
