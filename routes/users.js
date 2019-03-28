var express = require('express');
var router = express.Router();
var models = require('../models');
var jwt = require('jsonwebtoken'); // 使用jwt签名
var salt = require('../constant');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');
const saltRounds = 10;
router.post('/login', function (req, res, next) {
    // var hash = bcrypt.hashSync('123123', saltRounds);
    // console.log(hash)
    var username = req.body.username
    var password = req.body.password
    if (!username || !password) {
        res.json({success: false, message: '用户名或密码错误！'})
        return;
    }

    models.User.findOne({
        where: {
            username: username
        }
    }).then(user => {
        if (!user) {
            return res.json({success: false, message: '用户名或密码错误！'})
        }


        var checkPassword = bcrypt.compareSync(password, user.password);
        if (checkPassword == false) {
            return res.json({success: false, message: '用户名或密码错误！'})
        }

        var token = jwt.sign({user_id: user.id, username: username}, salt, {expiresIn: 60 * 60 * 24});
        res.json({
            success: true,
            message: '请求成功',
            token: token
        })
    })
});
router.put('/', function (req, res, next) {
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    models.User.findByPk({
        where: {
            id: req.user.id
        }
    }).then(user => {
        user.update({password: hash});
    })
})

router.get('/me', function (req, res, next) {

    models.User.findOne({
        where: {
            id: req.decoded.user_id
        },
    }).then(articles => {
        res.json({
            success: true, message: '查询成功',
            articles: articles,
        })

    })

});


module.exports = router;
