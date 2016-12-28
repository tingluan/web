import rootActions from "./root";
import productsActions from "./products-management";
import commentsActions from "./comments-management";
import productStatistics from "./product-statistics";
import departmentalExamination from "./departmental-examination";
import systemSetting from "./system-setting"


export default {
    ...rootActions,
    ...productsActions,
    ...commentsActions,
    ...productStatistics,
    ...departmentalExamination,
    ...systemSetting
}
