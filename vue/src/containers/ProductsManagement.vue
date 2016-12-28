<template>
    <div class='products-section'>
        <div class="mb10 clearfix">
            <el-button @click.native="addProductApp" type="primary">添加产品</el-button>
            <div class='search-section pull-right'>
                <el-input placeholder='请输入产品名称' v-model='keywords' class='inline-block'/>
                <el-button @click.native="searchProduct()" type="info">搜索</el-button>
            </div>
        </div>

        <wm-table
            @onPagination="onPagination"
            :source="apps.items"
            :pageNo="apps.pageNo"
            :pageSize="apps.pageSize"
            :total="apps.totalCount">
            <el-table-column label="产品ID" property="appId"/>
            <el-table-column label="产品名称" inline-template>
                <div class='app-info-wrapper'>
                    <div class='app-img' :style="{backgroundImage:`url(${row.icon})`}"></div>
                    <div class='app-desc'>
                        <span>{{row.appName}}</span>
                        <div>{{row.versionName}}</div>
                    </div>
                </div>
            </el-table-column>
            <el-table-column label="类型" property="typeName"/>
            <el-table-column label="上传时间" property="createdTime" width="120"/>
            <el-table-column label="操作" inline-template width="220" align='center'>
                    <span>
                        <el-button size="small" @click.native="$parent.updateProductApp(row)" type='info'>更新</el-button>
                        <el-button type="danger" size="small"
                                   @click.native="$parent.deleteProductApp(row.appId)">删除
                        </el-button>
                        <el-button size="small"
                                   @click.native="$parent.showComments(row.appId, row.versionCode)">评论
                        </el-button>
                    </span>
            </el-table-column>
        </wm-table>

        <el-dialog :title="dialogTitle" v-model="isDialogVisible" :close-on-click-modal="false" @close="onClose">

            <el-form :model="app" :rules="rules" label-width="100px" ref="form">
                <el-form-item label="产品名称" prop="appName">
                    <el-input v-model="app.appName" placeholder="请输入产品名称"/>
                </el-form-item>
                <el-form-item label="产品分类" required>
                    <el-form-item prop="typeId" class="inline-block mr5">
                        <el-select v-model="app.typeId" @change="querySecondaryTypes">
                            <el-option
                                v-for="item in primaryTypes"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="subTypeId" class="inline-block">
                        <el-select v-model="app.subTypeId">
                            <el-option
                                v-for="item in secondaryTypes"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="产品描述">
                    <el-input type="textarea" :rows="4" v-model="app.description" placeholder="请输入产品描述"/>
                </el-form-item>
                <el-form-item label="上传APK文件">
                    <Uploader name='uploadFile'
                              :url="apkUploadUrl" accept="(application/vnd.android.package-archive|apk)"
                              @on-success="onApkUpload" tips="只允许上传apk文件">
                        <el-button size="small" type="primary" class='el-icon-upload el-icon--right'> 点击上传</el-button>
                    </Uploader>
                    <a :href='app.downloadUrl' target="_blank" :title='app.downloadUrl'> {{app.downloadUrl | basename }}</a>
                </el-form-item>
                <el-form-item label="上传产品图标">
                    <Uploader :url="imagesUploadUrl" @on-success="onIconUpload">
                        <el-button size="small" type="primary" class='el-icon-upload el-icon--right'>
                            点击上传
                        </el-button>
                    </Uploader>
                    <div class='app-icon'>
                        <img v-if="app.icon" :src="app.icon"/>
                    </div>
                </el-form-item>
                <el-form-item label="上传产品截图">
                    <Uploader :url="imagesUploadUrl" @on-success="onScreenshotsUpload">
                        <el-button size="small" type="primary" class='el-icon-upload el-icon--right'> 点击上传</el-button>
                    </Uploader>
                    <div class='mt10'>
                        <div class='app-screenshot-wrapper'>
                            <div class='app-screenshot' v-for='screenshot, index in app.imageList'>
                                <img :src='screenshot.src'/>
                                <div class='text-center'>
                                    <i class='el-icon-delete' @click="removeScreenshot(index)"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native="saveProductApp">OK</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import WmTable from '../components/Table'
    import Uploader from '../components/Uploader'
    import * as C from '../constants/api'
    import utils from '../utils/misc'

    export default {

        name: 'Products',

        components: {
            WmTable,
            Uploader,
        },

        data(){
            return {
                isDialogVisible:false,

                apkUploadUrl: C.APK_FILE_UPLOADED,

                imagesUploadUrl: C.IMAGES_FILE_UPLOADED,

                // 应用名搜索
                keywords:'',

                dialogTitle:'',

                app:  {
                    appName:'',
                    typeId: null,
                    subTypeId: null,
                    versionCode:null,
                    size:0,
                    versionName:'',
                    downloadUrl:'',
                    icon:'',
                    imageList: [],
                },

                rules:{
                    appName:[
                        {required:true, message:"请输入应用名名称",trigger:'change'},
                        { max: 20, message: '最多为20个字符', trigger: 'change' }
                    ],
                    typeId:[{required:true, message:"请选择一级产品类型", trigger:'change'}],
                }
            }
        },

        beforeMount(){
            this.refreshPage();
            this.getProductPrimaryType();

        },

        computed: mapState({
            apps: ({apps}) => apps.appList,
            primaryTypes: ({apps}) => apps.primaryTypes,
            secondaryTypes: ({apps}) => apps.secondaryTypes
        }),


        methods: {


            resetForm(){
                const app = this.app;
                this.$refs.form.resetFields();
                Object.keys(app).forEach( key =>{
                    utils.isArray(app[key]) ? (app[key] = []) : (app[key] = '');
                });
            },

            onClose(){
               this.resetForm();
            },

            searchProduct(){
                this.refreshPage({pageNo:1})
            },

            saveProductApp(){
                this.$refs.form.validate( valid =>{
                   if(valid){
                        this.showPageLoading();
                        this.app.typeId = +this.app.typeId;
                        this.app.subTypeId = +this.app.subTypeId;
                        this.app.size=+this.app.size;
                        const promise = !this.app.appId ? this.addApp(this.app) : this.updateApp(this.app);
                        promise.then(()=>{
                            this.isDialogVisible = false;
                            this.hidePageLoading();
                            this.refreshPage();
                        })
                   }
                });


            },

            addProductApp(){
                 this.isDialogVisible = true;
                 this.dialogTitle = '添加产品';
            },

            updateProductApp(app){
                this.isDialogVisible = true;
                this.dialogTitle = '修改产品';
                app.typeId = `${app.typeId}`;
                app.subTypeId = `${app.subTypeId}`;
                typeof(app.subTypeId) !== "undefined" && app.subTypeId !== null && this.querySecondaryTypes(app.subTypeId);
                this.app = {...app};
                // 简单复制图片信息
                this.app.imageList = JSON.parse(JSON.stringify(this.app.imageList));
            },

            deleteProductApp(appId){
                this.$confirm('确认要删除该产品么？','删除提示', {
                    type:'warning',
                    }).then(()=>{
                        this.showPageLoading();
                        this.deleteApp({appId}).then(()=> {
                            this.hidePageLoading();
                            this.apps.items.length == 0 && this.refreshPage();

                        });
                }).catch(()=>{});
            },

            onApkUpload(res, file){
                const {versionCode, versionName, fileUrl, size } = res;
                this.app.versionCode = versionCode;
                this.app.versionName = versionName;
                this.app.downloadUrl = fileUrl;
                this.app.size = size;
            },

            onIconUpload(res, file){
                this.app.icon = res.src;
            },

            onScreenshotsUpload( res, file){
                this.app.imageList.push( res );
            },

            removeScreenshot(index){
                this.app.imageList.splice(index, 1);
            },

            refreshPage(otherParams = {}){
                otherParams = {...otherParams, ...{appName: this.keywords}};
                this.showPageLoading();
                this.getAppList(otherParams).then(()=> {
                    this.hidePageLoading();
                });
            },

            querySecondaryTypes(typeId){
                this.getSecondaryType({typeId})
            },


            onPagination(pageNo){
                this.refreshPage({pageNo})
            },

            showComments(appId, versionCode){
                this.$router.push({path:'/comments-management', query:{appId, versionCode}})
            },

            exportComments(appId, versionCode){
                window.location.href = `${C.PRODUCT_COMMENTS_EXPORTED}?appId=${appId}`;
            },

            ...mapActions(["showPageLoading", "hidePageLoading", "getAppList", "getProductPrimaryType",
                "getSecondaryType", "addApp", "updateApp", "deleteApp"])
        },

    };




</script>


<style lang='less'>

    .products-section {
        img {
            max-width: 100%;
        }
        .app-info-wrapper {
            padding: 5px;
            overflow: hidden;
            .app-img {
                width: 64px;
                height: 64px;
                float: left;
                margin-right: 10px;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center center;
            }
            .app-desc {
                overflow: hidden;
            }
        }

        .app-icon {
            width: 64px;
            overflow: hidden;
            display: inline-block;
            vertical-align: middle;
        }

        .app-screenshot {
            width: 170px;
            overflow: hidden;
            display: inline-block;
            margin-right: 15px;
            display: inline-block;
            border: 5px solid rgba(0, 0, 0, .3);

            i {
                color: lighten(#f00, 20%);
                cursor: pointer;
                &:hover {
                    color: #f00;
                }
            }
        }

    }

</style>

