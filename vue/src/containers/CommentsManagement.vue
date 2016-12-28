<template>
    <div class='comments-section'>
        <el-form :model="comment" :inline="true">
            <el-form-item label="产品名称">
                <el-select v-model='comment.appId' @change="loadVersionsByAppId">
                    <el-option value='' label="全部"></el-option>
                    <el-option
                        v-for="item in appNames"
                        :label="item.appName"
                        :value="item.appId">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="版本号">
                <el-select v-model='comment.versionCode'>
                    <el-option value='' label="全部"></el-option>
                    <el-option
                        v-for="item in appVersions"
                        :label="item.versionName"
                        :value="item.versionCode">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="评论状态">
                <el-select v-model='comment.status'>
                    <el-option value='' label="全部"></el-option>
                    <el-option
                        v-for="item in commentStatus"
                        :label="item.name"
                        :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button @click.native="searchComments(comment)" type="info">搜索</el-button>
                <el-button @click.native="exportComments(comment)" type="info">导出</el-button>
            </el-form-item>

        </el-form>

        <wm-table
            @onPagination="onPagination"
            :source="comments.items"
            :pageNo="comments.pageNo"
            :pageSize="comments.pageSize"
            :total="comments.totalCount">
            <el-table-column label="ID" property="commentId" width="60"/>
            <el-table-column label="产品名称" property='appName' width="120"/>
            <el-table-column label="版本号" property="versionName" width="80"/>
            <el-table-column label="评论内容" inline-template>
                <div class='comment'>
                    <div class='comment-desc'>{{row.comment}}</div>
                    <el-row class='comment-img-wrapper' >
                        <el-col :span="6" v-for='image in row.imageList'>

                            <div class='comment-img'><img :src='image.src' @click='$parent.showLargeImage(image.src)' /></div>

                        </el-col>
                    </el-row>
                </div>
            </el-table-column>
            <el-table-column label="状态" inline-template width="80">
                <div>
                    <div v-if="row.topFlag == $parent.COMMENT_IS_STICKY">置顶</div>
                    <span v-if='row.status == $parent.STATUS_ACCEPTED'>采纳</span>
                    <span v-if='row.status == $parent.STATUS_IN_PROCESS'>未处理</span>
                    <span v-if='row.status == $parent.STATUS_REVERSED'>保留</span>
                    <span v-if='row.status == $parent.STATUS_ABANDONED'>弃用</span>
                </div>
            </el-table-column>
            <el-table-column label="反馈人" property="userName" width="100"/>
            <el-table-column label="评论时间" property="commentTime" width="150"/>
            <el-table-column label="操作" inline-template width="280" align='center'>
                    <span>
                        <el-button v-if='row.topFlag == $parent.COMMENT_IS_STICKY'
                                   size="small"
                                   @click.native="$parent.stickingComment(row, +!$parent.COMMENT_IS_STICKY)"
                                   type='info'>取消置顶</el-button>
                        <el-button v-else
                                   size="small" @click.native="$parent.stickingComment(row, $parent.COMMENT_IS_STICKY)"
                                   type='info'>置顶</el-button>

                        <el-button size="small"
                                   @click.native="$parent.approveComment(row, $parent.STATUS_ACCEPTED)">采纳
                        </el-button>
                        <el-button size="small"
                                   @click.native="$parent.approveComment(row, $parent.STATUS_REVERSED)">保留
                        </el-button>
                        <el-button type="danger" size="small"
                                   @click.native="$parent.approveComment(row, $parent.STATUS_ABANDONED)">弃用
                        </el-button>
                    </span>
            </el-table-column>
        </wm-table>

        <el-dialog  v-model="imgDialogVisible" size="tiny" top="20px" :lock-scroll="false">
            <img :src='imageUrl' />
        </el-dialog>

    </div>

</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import WmTable from '../components/Table'
    import * as C from '../constants/api'
    import utils from '../utils/misc'



    export default {

        name: 'Comments',

        components: {
            WmTable,
        },

        data(){
            return {

                // 表示置顶
                COMMENT_IS_STICKY: 1,

                STATUS_IN_PROCESS: 0,
                STATUS_ACCEPTED :  1,
                STATUS_REVERSED: 2,
                STATUS_ABANDONED: 3,
                commentStatus:[
                    {code: 0, name:'未处理'},
                    {code: 1, name:'已采纳'},
                    {code: 2, name:'已保留'},
                    {code: 3, name:'已弃用'},
                ],

                comment:{
                    appId:'',
                    versionCode:'',
                    status:''
                },

                imgDialogVisible: false,

                imageUrl: '',
            }
        },

        beforeMount(){
            const {appId, versionCode} = this.$route.query;
            this.getAppNameList();
            if( appId && versionCode ){
                this.comment.appId = +appId;
                this.comment.versionCode = +versionCode;
                this.queryAppVersions({appId});
            }
            this.refreshPage();
        },

        computed: mapState({
            comments: ({comments}) => comments.commentList,
            appNames: ({comments}) => comments.appNames,
            appVersions: ({comments}) => comments.appVersions
        }),


        methods: {


            searchComments( comment ){
                this.refreshPage({pageNo:1, ...comment})
            },

            exportComments(comment){
                window.location.href = `${C.COMMENTS_EXPORTED}?type=0&appId=${comment.appId}&versionCode=${comment.versionCode}`
            },

            loadVersionsByAppId( appId ){
                this.comment.versionCode = '';
                this.appVersions = [];
                appId ? this.queryAppVersions({appId}) : this.clearAppVersions()
            },

            _updateComment( params ){
                this.updateCommentStatus( params );
            },


            stickingComment( {commentId, status}, topFlag){
                this._updateComment({commentId, status, topFlag})
            },

            approveComment({commentId, topFlag}, status){
                this._updateComment({commentId, status, topFlag})
            },


            showLargeImage(url){
                this.imgDialogVisible = true;
                this.imageUrl = url;
            },

            refreshPage(otherParams = {}){
                otherParams = {...otherParams, ...this.comment};
                this.showPageLoading();
                this.getCommentList(otherParams).then(()=> {
                    this.hidePageLoading();
                });
            },


            onPagination(pageNo){
                this.refreshPage({pageNo})
            },

            ...mapActions(["showPageLoading", "hidePageLoading", "getCommentList", "getAppNameList", "updateCommentStatus", "queryAppVersions", "clearAppVersions"])
        },

    };





</script>


<style lang='less'>
    .comments-section {
        img{
            max-width:100%;
        }

        .comment{
            margin-top:10px;
            .comment-img-wrapper{
                padding-bottom:10px;
                margin-top:5px;
                .comment-img{
                    border: 5px solid rgba(0, 0, 0, .3);
                    cursor: pointer;
                    margin-right:5px;
                    &:first-child{
                        margin-bottom:5px;
                    }
                }
            }

        }

    }

    .el-dialog--tiny{
        width:auto !important;
    }

</style>

