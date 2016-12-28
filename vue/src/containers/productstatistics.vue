<template>
    <div class="statistics-section">
        <div class="statistics-view">
            <div class="total-statistics"><span>数据总览</span></div>
            <div class="detail-statistics">
                <ul>
                    <li class="product-statistics">
                        <span class="icon"><img src="../layouts/img/image_u29.png"></span>
                        <span class="name">产品:</span>
                        <span class="number">{{Total.totalApp}}</span>
                    </li>
                    <li class="comments-statistics">
                        <span class="icon"><img src="../layouts/img/image_u35.png"></span>
                        <span class="name">评论:</span>
                        <span class="number">{{Total.totalComment}}</span>
                    </li>
                    <li class="adopted-statistics">
                        <span class="icon"><img src="../layouts/img/image_u41.png"></span>
                        <span class="name">采纳:</span>
                        <span class="number">{{Total.totalAccepted}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class='statistics-section'>
            <div class="title">
                <span class="title-des">明细统计</span>
                <el-form class="form" :inline="true">
                    <el-form-item>
                        <el-select v-model='comment.typeId'>
                            <el-option value='' label="全部"></el-option>
                            <el-option
                                v-for="item in primaryTypes"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker
                            v-model='comment.startDate'
                            type="date"
                            placeholder="选择日期"
                            >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item >
                        <el-button @click.native="searchProducts(comment)" type="info" >搜索</el-button>
                    </el-form-item>
                </el-form>

            </div>
            <wm-table @onPagination="onPagination"
                      :source="list.items"
                      :pageNo="list.pageNo"
                      :pageSize="list.pageSize"
                      :total="list.totalCount">
                <el-table-column label="产品名称" property="appName"></el-table-column>
                <el-table-column label="产品版本"  property="versionCode"></el-table-column>
                <el-table-column label="版本个数"  property="versionCount" width="95"></el-table-column>
                <el-table-column label="类型"  property="typeName"></el-table-column>
                <el-table-column label="更新时间"  property="createdTime"></el-table-column>
                <el-table-column label="当前版本下载" property="currDownloadCount"></el-table-column>
                <el-table-column label="当前版本评论"  property="currcommentCount"></el-table-column>
                <el-table-column label="当前版本采纳" property="currAcceptedCount"></el-table-column>
                <el-table-column label="累计下载"  property="downloadTotal" width="95"></el-table-column>
                <el-table-column label="累计评论"  property="commentTotal" width="95"></el-table-column>
                <el-table-column label="累计采纳" property="acceptedTotal" width="95"></el-table-column>
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
        name: 'statistics',

        components: {
            WmTable,
        },

        data(){
            return {
                Total: {
                    totalApp: "",
                    totalComment:"",
                    totalAccepted: " ",
                },
                comment:{
                    typeId:'',
                    startDate:''
                },


            }
        },

        beforeMount(){
            this.refreshPage();
        },

        computed: mapState({
            list:({statistics}) =>statistics.statisticList,
            primaryTypes: ({statistics}) => statistics.typeName,
            Total: ({statistics}) => statistics.statisticTotal
        }),

        methods: {
            refreshPage() {
                this.showPageLoading();
                this.getTotalStatistic().then(()=> {
                    this.hidePageLoading();
                });
                this.getDetailStatistic().then(()=> {
                });
                this.getTypeName().then(()=> {
                    this.hidePageLoading();
                });

            },

            searchProducts(comment){
                comment = {...comment};
                comment.startDate = utils.formatDate(comment.startDate);
                this.getDetailStatistic({pageNo:1,...comment}).then(()=> {
                    this.hidePageLoading();
                })
            },

            onPagination(pageNo){
                this.refreshPage({pageNo})
            },

            ...mapActions(["showPageLoading", "hidePageLoading", "getTotalStatistic","getDetailStatistic","getTypeName"])
        },




    }
</script>

<style lang='less'>
        .statistics-view{
            height: 200px;
            border: 1px solid #e0e6ed;
            margin-bottom: 30px;
            border-radius: 4px;

            .total-statistics{
                border-bottom: 1px solid #e0e6ed;
                height: 50px;
                background-color: #EFF2F7;
                padding-top: 15px;
                padding-left: 20px;
            }
        }

        .detail-statistics {
            height: 150px;
            padding: 20px;

            ul {
                height: 100%;
                clear: both;
                width: 100%;

                li {
                    border: 1px solid #e0e6ed;
                    border-radius: 4px;
                    padding-top: 20px;
                    }

                img{
                    vertical-align: middle;
                    }

                .product-statistics {
                    width: 20%;
                    float: left;
                    height: 95%;
                    font-size: 18px;
                    text-align: center;
                    margin-left: 200px;
                }

                .comments-statistics{
                    float: left;
                    width: 20%;
                    height: 95%;
                    margin-left: 55px;
                    text-align: center;
                    font-size: 18px
                }

                .adopted-statistics{
                    width: 20%;
                    float: right;
                    height: 95%;
                    font-size: 18px;
                    text-align: center;
                    margin-right: 200px;
                }



            }
        }
        .title {
            border: 1px solid #e0e6ed;
            padding-left: 10px;
            height: 60px;
            font-size: 18px;
            background-color: #e0e6ed;

            .form {
                margin-left: 200px;

            }

            .title-des {
                float: left;
                padding-top: 5px;
            }

        }




</style>
