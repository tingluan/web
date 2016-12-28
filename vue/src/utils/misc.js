import * as C from '../constants/api'

export default{

    isArray(obj){
        return Object.prototype.toString.call(obj) == '[object Array]'
    },

    isSystemAdmin(){
        return C.SYSTEM_ADMIN == window.config.currentUser.role;
    },

    isDeptAdmin(){
        return C.DEPT_ADMIN == window.config.currentUser.role;
    },

    formatDate( str){
        const date = new Date(str);
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    },

    selectDataChange(str){
        let data = str.split(',');
        let ee=`00:00:00`;
        let tt=`23:59:59`;
        data[0]=data[0]+' '+ee ;
        data[1]=data[1]+' '+tt;
        return data;
    }
}
