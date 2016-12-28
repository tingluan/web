<template>
    <div class="tags">
        <el-tag class='tag-item'
                v-for="tag in tags"
                @click.native="onClickTag(tag)"
                :closable="true"
                :type="tag.type"
                :key="tag.id"
                :close-transition="false"
                @close="onTagRemove(tag)"
        >
            {{tag.name}}
        </el-tag>

        <span @click="onAddTag(activeTag)" class="tag-add-icon" >
            <i class="el-icon-plus"></i>
        </span>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: "Tag",

        props: {
            sources: Array,
            reference: Object,
            enableHighlight: {
                default:true,
                type:Boolean
            }
        },

        data(){
            return {
                defaultType: 'primary',
                selectedType: 'success',
                activeTag: {
                    'id': 'id',
                    'name': 'name'
                },
                onClick:'0'
            }
        },

        computed: {
            tags(){
                return this.sources.map( source =>{

                    source.type = this.activeTag.id === source.id ? this.selectedType: this.defaultType;
                    return source;
                })
            },

        },

        methods: {
            onClickTag(selectedTag) {
                this.enableHighlight && (this.activeTag = selectedTag);
                console.log('selectedTag',selectedTag);
                this.$emit("onTagClick", selectedTag);
            },

            onAddTag(){

                this.$emit("onTagAdd",  this.activeTag);
            },

            onTagRemove(selectedTag){
                this.$emit("onTagRemove", selectedTag)
            }
        }
    }
</script>


<style lang='less' scoped>
    .tags{
        padding: 20px;
    }
    .tag-item {
        font-size: 15px;
        margin: 10px;
    }
    .tag-add-icon{
        cursor: pointer;
    }
</style>
