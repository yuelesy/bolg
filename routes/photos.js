var express = require('express');
var qiniu = require("qiniu");
var router = express.Router();

router.get('/uploadToken', function (req, res, next) {
    var accessKey = '2bHFfdt4ipkNK7xbwkOByy0ntxO5lj9e7cmvQWIQ';
    var secretKey = 'Qp3xPSAKX9Xs0JKb-fmKBtdiNchtR_SMaz3NHNiY';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    var options = {
        scope: "space",
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);

    res.json({success: true, data:{token: uploadToken}})
});

module.exports = router;