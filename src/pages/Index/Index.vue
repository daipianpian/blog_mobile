<template>
	<div class="index-wrap">

		<anne-scroll ref="loadmore" :on-refresh="onRefresh" :on-infinite="onInfinite">
			<!-- 顶部信息栏 start -->
			<div class="top-menu">
				<div class="admin-wrap clearboth">
					<div class="admin-avatar float-left"><img src="@/assets/images/user_avatar@2x.png" alt=""></div>
					<div class="admin-info float-right">一片天空</div>
				</div>
				<div class="search-wrap flex">
					<div class="search-box flex-item"><input type="text" autocomplete="off" placeholder="请输入文章名称" v-model="keywords"></div>
					<div class="search-icon" @click="searchArticle"><img src="@/assets/images/icon_search.png" alt=""></div>
				</div>
			</div>
			<!-- 顶部信息栏 end -->
			<div class="main article-list-box">
				<div class="main-content attr-name" v-if="keywords">全部文章&nbsp;&gt;&nbsp;{{keywords}}</div>

				<div class="article-list article-info">
					<div class="main-content article-item" v-for="item in articleList">
						<div class="title flex" @click="goArticle(item.id)">
							<span :class="{'type type-success': item.typeId==1, 'type type-danger': item.typeId==2}">{{item.typeId==1?'原':'转'}}</span>
							<span class="title-info flex-item">{{item.title}}</span>
						</div>
						<div class="abstract">{{item.abstract}}...</div>
						<div class="other-info">
							<span><i class="el-icon-date"></i>{{item.createTime}}</span>
						</div>
					</div>

				</div>

			</div>
		</anne-scroll>
	</div>
</template>

<script type="text/ecmascript-6">
	import anneScroll from '@/components/anne-scroll'
	import {queryArticleList} from '@/config/interface.js'
	export default{
		data(){
			return{
				clientWidth:this.$store.state.clientWidth+'px',
				clientHeight:this.$store.state.clientHeight+'px',
				keywords: '',
				queryFlag: { // 是否可发送请求
		    	article: true
		    },
		    loading: { // 是否显示loading
		    	article: false
		    },
		    pageNum: 1,
        pageSize: 10,
        flag: true,
		    articleList: []
			}
		},
		components:{
      anneScroll
    },
		mounted(){
			this.init()
		},
		methods:{
			init(){
				this.queryArticleList();
			},
			queryArticleList(done) {
				const url=queryArticleList;
				let params={
					keywords: this.keywords,
          pageNum: this.pageNum,
          pageSize: this.pageSize
				}
				fetch(url,params)
				.then((res)=>{
					if(res.code == 10000){
						let data = res.data;
						if(data && data.length>0){
							for(let value of data){
								value.abstract = value.content.replace(/<[^>]*>|/g,"").toString().substr(0, 50);
								this.articleList.push(value);
							}
						}
					}else{
            this.flag = false
            this.$refs.loadmore.onLoaded();
          }
          if(done){
          	done();
          }
				});				
			},
			searchArticle(){
				this.pageNum=1
	      this.flag= true
        this.articleList = []
	      this.queryArticleList();
			},
	    // 下拉刷新
	    onRefresh(done) {
	      setTimeout(() => {
	        this.pageNum=1
	        this.flag= true
	        this.queryArticleList(done); 
	      },500)
	    },
	    // 上拉加载
	    onInfinite(done) {
	      setTimeout(() => {
	        if(this.flag){
	          ++this.pageNum;
	          this.queryArticleList(done);
	        }else{
	          this.$refs.loadmore.onLoaded();
	          return;
	        }
	        
	        done()
	      },500)
	    },
			/*跳转到文章详情 start*/
			goArticle(articleId) {
				console.log('articleId==='+articleId);
				this.$router.push({
		        path:'/article',
		        query:{
		          articleId:articleId
		        }
		    });
			}
			/*跳转到文章详情 end*/
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
	.top-menu{position:fixed; width: 100%; padding-bottom: 25px; z-index: 100;background: #fff; box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
		.admin-wrap{width:200px;margin: 0 auto; padding:20px 0; overflow:hidden;}
		.admin-avatar{width:60px;height:60px;border: 2px solid white; border-radius: 50%;overflow: hidden;
			img{width:100%;}
		}
		.admin-info{line-height: 60px; font-size: 28px;}
	}
	.search-wrap{width:268*2px; height:38*2px; line-height: 38*2px; margin:0 auto; border: 1px solid #dcdfe6; /* no */ border-radius: 5px; overflow:hidden;
		.search-box{    
			input{width:90%;height:100%; padding:0 5%; border:none;}
		}
		.search-icon{width:56*2px; height:38*2px; border-left: 1px solid #dcdfe6; /* no */
			img{width:100%; height:100%;}
		}
	}

	.main{padding-top: 190px;}

	.article-list-box{
		background-color: #fff;
		.article-item{
			.title:hover{cursor: pointer;}
		}
		.attr-name,.article-item{ border-bottom: 1px solid $color-gray-light;}
		.article-info .article-item:last-child{ border-bottom: none;}
		.el-pagination{padding:50px 24px 50px 24px;}
	}
</style>