var sqlMap = {
    blog: {
        selectArticleList: 'select * from anne_article where status=1', // 查询文章列表
        selectArticleDetail: 'select * from anne_article where id=? and status=1',  // 以id为主条件查询某篇文章
        updateReadNum: 'update anne_article set readNum=? where id=? and status=1'
    }
}
module.exports = sqlMap;