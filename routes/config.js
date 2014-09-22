var fs = require('fs');
var router = require('express').Router();

// setup page
router.get("/",function (req, res, next) {
    if(!siteConfig.initialized || req.isAuthenticated()) {
        if(fs.existsSync('./settings.json')) {
            return res.json(JSON.parse(fs.readFileSync('./settings.json').toString()));
        }

        return res.json(JSON.parse('{"documentdb":{"databaseId": "docdbbp", "collectionId": "default", "host":"https://CHANGETHIS.documents.azure.com:443/","authKey":""},"website":{"name":"Azure Starter Site","baseUrl":"https://' + req.headers.host + '"}, "google":{"clientID":"","clientSecret":""}, "facebook":{"clientID":"","clientSecret":""},"twitter":{"clientID":"","clientSecret":""},"linkedin":{"clientID":"","clientSecret":""},"github":{"clientID":"","clientSecret":""}}'));
    } else {
        res.send(500, 'Error');
    }     
});

router.post("/",function (req, res, next) {
    if(!siteConfig.initialized || req.isAuthenticated()) {
        var data = req.body;
        if(data.documentdb.host && data.documentdb.authKey) {
            data.initialized = true;
        }

        fs.writeFile('./settings.json', JSON.stringify(data), function(e) {
            if(e) {
                return res.send(500, e);
            }

            siteConfig = data;
            return res.json({});
            //process.exit();
        });
    } else {
        res.send(500, 'Error');
    }     
});

module.exports = router;
