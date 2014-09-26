var router = require('express').Router();

// home page
router.get('/main', function (req, res) {
    res.render('partial/main.html');
});

module.exports = router;
