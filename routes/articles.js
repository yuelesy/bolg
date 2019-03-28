var express = require('express');
var router = express.Router();
var models = require('../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get('/', function (req, res, next) {
    var currentPage = req.param('currentPage') == undefined ? 1 : req.param('currentPage');
    var pageSize = req.param('pageSize') == undefined ? 2 : req.param('pageSize');


    var keyword = req.query.title
    var data = {};
    if (keyword != undefined && keyword != '') {

        data.title = {
            [Op.like]: '%' + keyword + '%'
        }

    }
    models.Article.findAndCountAll({
        where: data,
        include:[models.Category],
        offset: (currentPage - 1) * pageSize,
        limit: parseInt(pageSize)
    }).then(articles => {
        res.json({
            success: true, message: '查询成功',
            articles: articles.rows,
            pagination: {
                current: parseInt(currentPage),
                pageSize: parseInt(pageSize),
                total:articles.count

            },
        })

    })

});


/* 新增数据 */
router.post('/', function (req, res, next) {
    if (!req.body.title || req.body.title == '') {
        return res.json({success: false, message: '内容缺失'})
    }
    models.Article.create(req.body).then((articles) => {
        res.json({success: true, message: '发布成功', data: articles})

    });
});

router.put('/:id', function (req, res, next) {
    models.Article.findByPk(req.params.id).then(articles => {
        articles.update(req.body);
        res.json({success: true, message: '修改成功', data: articles})
    })
});

router.delete('/:id', function (req, res, next) {
    models.Article.findByPk(req.params.id).then(articles => {
        articles.destroy();
        res.json({success: true, message: '删除成功'})
    })
});


// 查询
router.get('/:id', function (req, res, next) {
    models.Article.findByPk(req.params.id).then(articles => {
        res.json({
            success: true, message: '查询成功',
            articles: articles,
        })
    })
});


module.exports = router;