var router = require('express').Router();

// home page
router.get('/', function (req, res) {
    if(req.isAuthenticated()) {
        res.render('admin.html');
    } else {
        res.render('index.html');
    }
});

module.exports = router;
