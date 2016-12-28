<template>
    <el-upload class="inline-block" :action="url" :multiple='multiple' :name='name' :accept="accept" :on-error="onError" :before-upload="beforeUpload"
               :showUploadList="false" :on-success="onSuccess">
        <slot></slot>
    </el-upload>
</template>

<script>
    import {mapActions} from 'vuex'
    export default{
        props:{
            url: String,
            multiple: {
                type: Boolean,
                default: false
            },
            name: {
                type:String,
                default: 'uploadImage',
            },
            accept: {
                type: String,
                default: 'image',
            },
            tips:{
                type: String,
                default: '只允许上传图片',
            },
        },

        methods:{
            beforeUpload( file ){
                const name = file.name;
                const type = file.type;
                // 在windows下，当上传apk时， type为空。*unix下为application/vnd.android.package-archive
                if( (type && !new RegExp(this.accept).test(type) ) || (!type && !new RegExp(this.accept).test(name)) ){
                    this.$message({message: this.tips, type: 'error', showClose:true});
                    return false;
                }
                if( this.$emit("on-before-upload", file) !== false ){
                    this.showPageLoading()
                }
            },

            onSuccess( res, file){
                this.hidePageLoading();
                this.$emit("on-success", res.data, file)
            },


            onError(err, res, file){
                this.hidePageLoading();
                this.$emit("on-error", err, res && res.data ? res.data: res, file)
            },

            ...mapActions(["showPageLoading", "hidePageLoading"])

        }
    }


</script>
