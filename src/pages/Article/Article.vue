<template>
	<div class="main flex-item article article-info" :style="{'min-height': clientHeight}">
		<div class="title flex">
			<span :class="{'type type-success': articleData.typeId==1, 'type type-danger': articleData.typeId==2}">{{articleData.typeId==1?'原':'转'}}</span>
			<span class="title-info flex-item">{{articleData.title}}</span>
		</div>
		<!-- <div class="other-info">
			<span>发布时间：{{articleData.createTime}}</span>
		</div> -->
		<div class="article-content" v-html="articleData.content">
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import {queryArticleDetail, addReadNum} from "@/config/interface.js"
	export default {
		data() {
			return {
				clientHeight:this.$store.state.clientHeight+'px',
				articleId: this.$route.query.articleId,
				articleData: {}
			}
		},
		computed: {
		},
		created() {
			this.init()
		},
	    methods: {
	    	// 初始化
			init(){
				this.queryArticleDetail()
			},
			addReadNum() {
				const url = addReadNum;
				const _this = this;
				let params = {
        			articleId: this.articleId
        		}
        		fetch(url,params)
				.then(res =>{
					if(res.code == 10000){
						console.log('res.data='+res.data);
					}
				})
			},
			queryArticleDetail(){
				const url = queryArticleDetail;
				let params = {
    			articleId: this.articleId
    		}
    		fetch(url,params)
				.then(res =>{
					if(res.code == 10000){
						let data=res.data
						this.articleData = data
					}
				})
			}
	    }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
.article{padding: 20px 30px; background: #fff;}
/* 代码 start */
.article-content {margin-top: 10px;
	blockquote { border-left: 4px solid #ccc; margin-bottom: 5px; margin-top: 5px; padding-left: 16px;}
	pre{
		display: block; padding: 9.5px; margin: 0 0 10px; font-size: 13px; line-height: 1.42857143; color: #333; word-break: break-all; word-wrap: break-word; background-color: #f5f5f5; border: 1px solid #ccc; border-radius: 4px;
	}
}
/* 代码 end */
</style>