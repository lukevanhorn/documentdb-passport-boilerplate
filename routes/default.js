var router = require('express').Router();

// home page
router.get('/', function (req, res) {
    if(req.isAuthenticated()) {
        return res.render('index.html');
    }

    res.render('visitor.html');
});

module.exports = router;
