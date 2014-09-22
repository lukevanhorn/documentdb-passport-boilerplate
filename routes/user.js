var router = require('express').Router();
var controller = require('../controllers/auth');

// home page
router.get('/me', function (req, res) {    
    controller.getAccount(req.user, function(e, user) {
        res.json(req.user);
    }); 
});

module.exports = router;