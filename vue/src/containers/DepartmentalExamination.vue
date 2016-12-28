<template xmlns="http://www.w3.org/1999/html">
    <div class="department-section">
        <div class="examination-result">
            <div class="title">
                <span class="title-des">部门考核</span>
                <el-form class="form" :inline="true" :model="condition">
                    <el-form-item>
                        <el-select v-model="value" placeholder="请选时间类型查询" @change="searchPeriod">
                            <el-option
                                v-for="item in options"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="valueTime" placeholder="选择时间段查询">
                            <el-option

                                v-for="item in dataList"
                                :label="`${item.fromDate} - ${item.endDate}`"
                                :value="`${item.fromDate},${item.endDate}`">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item >
                        <el-button  type="info"  @click.native="searchData()">搜索</el-button>
                        <el-button @click.native="exportComments(comment)" type="info">导出</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="result-table">
                <div class="result-description">统计总览: 部门已经注册的账号<span>{{description.userNum}}</span>
                    人， 共计<span>{{description.commentedUserNum}}</span>人发布评论，合计评论<span>{{description.commentTotal}}</span>条，采纳<span>{{description.acceptedTotal}}</span>条</div>
                <wm-table v-if="isDeptAdmin" @onPagination="onPagination"
                          :source="list.items"
                          :pageNo="list.pageNo"
                          :pageSize="list.pageSize"
                          :total="list.totalCount">
                    <el-table-column label="账号" property="account"></el-table-column>
                    <el-table-column label="姓名"  property="userName"></el-table-column>
                    <el-table-column label="评论"  property="commentCount"></el-table-column>
                    <el-table-column label="采纳"  property="acceptedCount"></el-table-column>
                </wm-table>

                <wm-table v-if="isSystemAdmin" @onPagination="onPagination"
                          :source="list.items"
                          :pageNo="list.pageNo"
                          :pageSize="list.pageSize"
                          :total="list.totalCount">
                    <el-table-column label="部门" property="deptName"></el-table-column>
                    <el-table-column label="注册员工"  property="userNum"></el-table-column>
                    <el-table-column label="已发评论员工"  property="commentUserNum"></el-table-column>
                    <el-table-column label="评论总数"  property="commentTotal"></el-table-column>
                    <el-table-column label="采纳"  property="acceptedTotal"></el-table-column>
                    <el-table-column label="弃用"  property="abandonTotal"></el-table-column>
                    <el-table-column label="达标率"  property="rate"></el-table-column>
                </wm-table>

            </div>
        </div>
        <div class="examination-red">
            <div class="title">2016红榜</div>
            <wm-table :source="redHonourList" :enableDisplay="false">
                <el-table-column label="账号" property="account"></el-table-column>
                <el-table-column label="姓名"  property="userName"></el-table-column>
                <el-table-column label="评论"  property="commentCount"></el-table-column>
                <el-table-column label="采纳"  property="acceptedCount"></el-table-column>
            </wm-table>
        </div>
        <div class="examination-black">
            <div class="title" >2016黑榜</div>
            <wm-table :source="blackHonourList" :enableDisplay="false">
                <el-table-column label="账号" property="account"></el-table-column>
                <el-table-column label="姓名"  property="userName"></el-table-column>
                <el-table-column label="评论"  property="commentCount"></el-table-column>
                <el-table-column label="弃用"  property="abondonCount"></el-table-column>
            </wm-table>
        </div>
    </div>

</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import WmTable from '../components/Table'
    import * as C from '../constants/api'
    import utils from '../utils/misc'

    export default{

        name: 'department',

        components: {
            WmTable,
        },

        data(){
            return {
                description: {
                    userNum: "",
                    commentedUserNum:"",
                    commentTotal: " ",
                    acceptedTotal:" "
                },

                comment:{
                    appId:'1',
                    versionCode:'2.2'
                },

                isSystemAdmin: utils.isSystemAdmin(),
                isDeptAdmin: utils.isDeptAdmin(),
                value: '',
                valueTime: '',
                options: [{
                    value: '1',
                    label: '按周查询'
                }, {
                    value: '2',
                    label: '按月查询'
                }
                ],
            }
        },

        beforeMount(){

            this.refreshPage();
        },

        computed: mapState({
            list:({departmental}) =>departmental.deptInfoList,
            redHonourList: ({departmental}) => departmental.redHonourList,
            blackHonourList: ({departmental}) => departmental.blackHonourList,
            description:({departmental}) => departmental.commentList,
            dataList:({departmental}) => departmental.dataList
        }),



        methods: {

            exportComments(){
                window.location.href = `${C.DEPT_INFO_STATISTIC_EXPORT}?type= ${this.value}`
            },

            refreshPage() {
                this.showPageLoading();
                this.getDeptInfoList({type:'1'});
                this.getCommonList({type:'1'});
                this.getRedHonourList({category:'1',type:'1'});
                this.getBlackHonourList({category:'2',type:'1'}).then(()=> {
                    this.hidePageLoading();
            });

            },


            searchPeriod(value){
                this.getDataList(value)
            },
            searchData(){
                this.showPageLoading();
                let data=utils.selectDataChange(this.valueTime);
                this.getCommonList({type:this.value,startDate:data[0],endDate:data[1]});
                this.getDeptInfoList({startDate:data[0],endDate:data[1],type:this.value}).then(()=> {
                });
                this.getRedHonourList({category:'1',startDate:data[0],endDate:data[1],type:this.value});
                this.getBlackHonourList({category:'2',startDate:data[0],endDate:data[1],type:this.value}).then(()=> {
                    this.hidePageLoading();
            });

            },

            onPagination(pageNo){
                this.refreshPage({pageNo})
            },

            ...mapActions(["showPageLoading", "hidePageLoading", "getDeptInfoList","getCommonList","getRedHonourList","getDataList","getBlackHonourList","getExportData"])
        },



    }


</script>
<style lang='less'>
    .examination-result{
        margin-bottom:30px;
        border-radius: 1px;
        .title{
            border: 1px solid #e0e6ed;
            padding-left: 10px;
            height: 50px;

            font-size: 18px;
            background-color: #e0e6ed;
            .form{
                margin-left: 200px;

            }
            .title-des{
                float:left;
            }



        }
        .result-table{
            border: 1px solid #e0e6ed;
            padding: 40px;

            .result-description{
                margin-bottom: 10px;
                font-size: 15px;
            }
        }


    }

    .examination-red{
        float: left;
        width: 49%;
        .title{
            border: 1px solid #e0e6ed;
            height: 40px;
            padding-left: 10px;
            padding-top: 10px;
            background-color: #e0e6ed;
            text-align: center;
        }

    }

    .examination-black{
        float: right;
        width: 50%;
        .title{
            border: 1px solid #e0e6ed;
            height: 40px;
            padding-left: 10px;
            padding-top: 10px;
            background-color: #e0e6ed;
            text-align: center;
        }
    }



</style>

