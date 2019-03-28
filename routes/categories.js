var express = require('express');
var router = express.Router();
var models  = require('../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get('/', function (req, res, next) {
    // var currentPage = req.param('currentPage') == undefined ? 1 : req.param('currentPage');
    // var pageSize = req.param('pageSize') == undefined ? 2 : req.param('pageSize');


    models.Category.findAndCountAll({
        include:[models.Article],
        // offset: (currentPage - 1) * pageSize,
        // limit: parseInt(pageSize)

    }).then(categories => {
        res.json({
            success: true, message: '查询成功',
            categories: categories.rows,
            // pagination: {
            //     current: parseInt(currentPage),
            //     pageSize: parseInt(pageSize),
            //     total:categories.count
            //
            // },

        })

    })

});

router.get('/:id', function (req, res, next) {
    models.Category.findById(req.params.id).then(category => {
        res.json({success: true, message: '查询成功', data: category})
    })

});

module.exports = router;