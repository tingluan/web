<template>
    <div class="setting-section">
        <div class="metric-configuration">
            <div class="title">统计指标配置</div>
            <div class="content">
                <el-form :inline="true">
                    <el-form-item label="个人评论达标标准：" >
                        <el-select v-model="value" clearable placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button  type="info" @click.native="dialogVisible = true">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="department-management">
                    <div class="title">部门管理</div>
                    <div class="content">
                        <div>
                            <span>一级部门</span>
                            <tag :sources="primaryDeptList"
                                 @onTagClick="querySecondaryDept"
                                 @onTagAdd="() => this.isPrimaryDeptDialogVisible = true"
                                 @onTagRemove="deleteDepartmentAction"
                            ></tag>

                        </div>
                        <div>
                            <span>二级部门</span>
                            <tag :sources="secondaryDeptList"
                                 :enableHighlight="false"
                                 @onTagAdd="() =>this.isSecondaryDeptDialogVisible = true"
                                 @onTagRemove="deleteDepartmentAction"
                            ></tag>

                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="product-management">
                    <div class="title">产品类型管理</div>
                    <div class="content">
                        <div>
                            <span>一级类型</span>
                            <tag :sources="primaryTypes"
                                 @onTagClick="querySecondaryTypes"
                                 @onTagAdd="() => this.isPrimaryTypeDialogVisible = true"
                                 @onTagRemove="deleteTypeAction"
                            ></tag>
                        </div>
                        <div>
                            <span>二级类型</span>
                            <tag :sources="secondaryTypes"
                                 :enableHighlight="false"
                                 @onTagAdd="() => this.isSecondaryTypeDialogVisible = true"
                                 @onTagRemove="deleteTypeAction"
                            ></tag>
                        </div>
                    </div>

                </div>
            </el-col>
        </el-row>
        <el-dialog title="提示" v-model="dialogVisible" size="small">
            <span>确认提交达标标准？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click.native="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click.native="saveCommentTarget">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="增加一级部门" v-model="isPrimaryDeptDialogVisible">
            <el-form :model="form" ref="form">
                <el-form-item label="一级部门名称: " :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="isPrimaryDeptDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click.native="addDepartmentAction(form ) ">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="增加二级部门" v-model="isSecondaryDeptDialogVisible">
            <el-form :model="form" ref="form">
                <el-form-item label="二级部门名称:" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="isSecondaryDeptDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click.native="addSecondDepartment(form) ">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="增加一级产品" v-model="isPrimaryTypeDialogVisible">
            <el-form :model="form" ref="form">
                <el-form-item label="一级产品名称:" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="isPrimaryTypeDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click.native="addTypeActive(form)">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="增加二级产品" v-model="isSecondaryTypeDialogVisible">
            <el-form :model="form" ref="form">
                <el-form-item label="二级产品名称:" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="isSecondaryTypeDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click.native="addSecondaryTypeActive(form) ">确 定</el-button>
            </div>
        </el-dialog>



    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import Tag from '../components/Tag'
    import * as C from '../constants/api'
    import utils from '../utils/misc'


    export default{

        name:'SystemSetting',

        components:{
            Tag
        },

        data(){
            return {
                dialogVisible:false,
                isPrimaryTypeDialogVisible:false,
                isPrimaryDeptDialogVisible:false,
                isSecondaryTypeDialogVisible:false,
                isSecondaryDeptDialogVisible:false,
                options: [{
                    value: '10',
                    label: '10'
                }, {
                    value: '11',
                    label: '11'
                }, {
                    value: '12',
                    label: '12'
                }, {
                    value: '13',
                    label: '13'
                }, {
                    value: '14',
                    label: '14'
                }, {
                    value: '15',
                    label: '15'
                }],
                form:{
                    name:'',
                    id:'',
                },
                formLabelWidth: '120px',
                value: '',
                success:'success',
                primary:'primary',
                tag:{
                    id:'',
                    name:''
                },
                primaryActiveTagID: '',
                primaryTypeActiveTagID:''
            }
        },

        beforeMount(){
            this.refreshPage();
        },

        computed: mapState({
            primaryTypes: ({system}) => system.primaryTypes,
            secondaryTypes: ({system}) => system.secondaryTypes,
            primaryDeptList: ({system}) => system.primaryDeptList,
            secondaryDeptList:({system}) => system.secondaryDeptList,
            getStandard:({system}) => system.getStandard
        }),

        methods: {
            refreshPage(){
                this.showPageLoading();
                this.getPrimaryDeptList( ).then(()=> {
                });
                this.getProductPrimaryType( ).then(()=> {
                    this.hidePageLoading();
                });
            },
            querySecondaryTypes({id}){
                this.primaryTypeActiveTagID=id;
                this.getSecondaryType({typeId:id})
            },

            querySecondaryDept({id}){
                this.primaryActiveTagID = id;
                this.getSecondaryDeptList(id)

            },
            addDepartmentAction(form){
                const promise=this.addDepartment({name:form.name});
                promise.then(()=>{
                    this.form.name='';
                    this.isPrimaryDeptDialogVisible = false ;
                    this.getPrimaryDeptList( );
                })
            },

            addTypeActive(form){
                const promise=this.addType({name:form.name});
                promise.then(()=>{
                    this.form.name='';
                    this.isPrimaryTypeDialogVisible = false ;
                    this.getProductPrimaryType( );
                })
            },
            addSecondDepartment(form){
                form.id= this.primaryActiveTagID;
                const promise=this.addDepartment({name:form.name,id:form.id});
                promise.then(()=>{
                    this.form.name='';
                    let id=this.primaryActiveTagID;
                    this.querySecondaryDept({id});
                    this.isSecondaryDeptDialogVisible = false ;

                })
            },

            addSecondaryTypeActive(form){
                form.id= this.primaryTypeActiveTagID;
                const promise=this.addType({name:form.name,id:form.id});
                promise.then(()=>{
                    this.form.name='';
                    let id=this.primaryTypeActiveTagID;
                    this.querySecondaryTypes({id});
                    this.isSecondaryTypeDialogVisible = false ;
                })
            },

            deleteDepartmentAction({id}){
                let dataId={id};
                this.deleteDepartment({id:dataId.id}).then(()=> {
                    this.getPrimaryDeptList();
                    let id=this.primaryActiveTagID;
                    this.querySecondaryDept({id});

                })
            },
            deleteTypeAction({id}){
                let dataId={id};
                this.deleteType({id:dataId.id}).then(()=> {
                    this.getProductPrimaryType( );
                    let id=this.primaryTypeActiveTagID;
                    this.querySecondaryTypes({id});
                })
            },

            saveCommentTarget(){
                const promise = this.getCommentTarget({commentTarget:this.value}) ;
                promise.then(()=>{
                    this.dialogVisible = false;
                    this.value=''
                })
            },


            hello(){
                this.isPrimaryDeptDialogVisible = true;
            },


            ...mapActions(["showPageLoading", "hidePageLoading", "getProductPrimaryType", "getSecondaryType",
                "getCommentTarget", "getPrimaryDeptList","getSecondaryDeptList", "addDepartment","deleteDepartment","deleteType","addType","getStandard"])
        }


    }
</script>

<style lang="less">
    .content{
        padding: 20px;
    }
    .title{
        border-bottom: 1px solid #e0e6ed;
        padding: 10px;
        background-color: #e0e6ed;
    }
    .tag{
        padding: 20px;
    }
    .metric-configuration{
        border: 1px solid #e0e6ed;
        border-radius: 4px;
        height: 150px;
        margin-bottom:20px;

    }
    .department-management{
        border: 1px solid #e0e6ed;
        border-radius: 4px;

    }
    .product-management{
        border: 1px solid #e0e6ed;
        border-radius: 4px;

    }


</style>
