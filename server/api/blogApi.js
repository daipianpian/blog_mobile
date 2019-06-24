const models = require('../db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sqlMap');

// 连接数据库
const conn = mysql.createConnection(models.mysql);
conn.connect();
const jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.send('err')
    } else {
        res.json(ret);
        // res.send('ok')
    }
};


//查找文章列表
router.post('/queryArticleList', (req,res) => {
    let selectArticleList = $sql.blog.selectArticleList;
    let params = req.body;
    let keywords = req.body.keywords;

    /*分页查询入参 start*/
    let limitFirst = (params.pageNum-1)*params.pageSize;
    let limitLast = params.pageSize;
    /*分页查询入参 end*/
    let objParams = [];

    if(!keywords){
        objParams = [limitFirst, limitLast];
    }else{
        objParams = ["%"+req.body.keywords+"%", limitFirst, limitLast];
        selectArticleList += " and title like ?"; // 模糊查询
    }

    selectArticleList += " order by id desc"; // id倒序排
    selectArticleList+= " limit ?,?"; // 分页查询

    conn.query(selectArticleList, objParams, function(err, result) {
        let resultParams = {};
        if(err) {
            resultParams = {
                code: 20000,
                data: {},
                message: '查询文章列表失败',
                errMessage: err
            };
        }
        if(result[0]===undefined) {
            resultParams = {
                code: 20000,
                data: []
            };
        }else {
            resultParams = {
                code: 10000,
                data: result
            };
        }
        jsonWrite(res, resultParams);
    })
});

// 获取商品详情
router.post('/queryArticleDetail', (req,res) => {
    let selectArticleDetail = $sql.blog.selectArticleDetail;
    let params = req.body;
    let articleId = req.body.articleId;
    conn.query(selectArticleDetail, articleId, function(err, result) {
        let resultParams = {};
        if(err) {
            resultParams = {
                code: 20000,
                data: {},
                message: '查询文章详情失败',
                errMessage: err
            };
            jsonWrite(res, resultParams);
        }
        if(result[0]===undefined) {
            resultParams = {
                code: 20000,
                data: {},
                message: '查询文章详情失败'
            };
            jsonWrite(res, resultParams);
        }else {
            let resultData = result[0];
            let newReadNum = ++resultData.readNum;

            let updateReadNum = $sql.blog.updateReadNum;
            let objParams = [newReadNum, articleId];
            conn.query(updateReadNum,objParams, function(err, result) {
                if(err) {
                    resultParams = {
                        code: 20000,
                        data: {},
                        message: '增加阅读量失败'
                    };
                }else{
                    resultData.readNum = newReadNum;
                    resultParams = {
                        code: 10000,
                        data: resultData
                    };
                }
                jsonWrite(res, resultParams);
            });
        }
        
    });
});


module.exports = router;






