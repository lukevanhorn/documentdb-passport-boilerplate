var router = require('express').Router();

// home page
router.get('/', function (req, res) {
    res.render('index.html');
});

module.exports = router;
