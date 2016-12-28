import Vue from "vue"
import VueRouter from "vue-router"
import ProductsManagement from "./containers/ProductsManagement"
import CommentsManagement from "./containers/CommentsManagement"
import ProductStatistics from "./containers/productstatistics"
import DepartmentalExamination from "./containers/DepartmentalExamination"
import SystemSetting from "./containers/SystemSetting"
import utils from "./utils/misc";
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {path: '/product-management', component: ProductsManagement},
        {path: '/comments-management', component: CommentsManagement},
        {path: '/product-statistics', component: ProductStatistics},
        {path:'/dept-kpi',component: DepartmentalExamination},
        {path:'/system-settings',component: SystemSetting},
        {path: '/', redirect: '/product-management'}
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.length == 0) {
        next('/');
    } else {
        if (!utils.isSystemAdmin() && to.path == '/system-settings') {
            next('/');
        } else {
            next();
        }
    }

});

export default router;

