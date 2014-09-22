var util = require('util');
var async = require('async');
var Documentclient = require('documentdb').DocumentClient;

function DocDB(options) {
	var self = this;

    self.client = new Documentclient(options.host, { masterKey: options.authKey });
    self.databaseId = options.databaseId || 'docdbbp';
    self.collectionId = options.collectionId || 'default';
    self.isReady = false;

    self.readOrCreateDatabase(self.databaseId, function(e, db) { 
        if(e) {
            throw e;
        }

        self.db = db;
        self.readOrCreateCollection(self.db, self.collectionId, function(e, collection) {
            if(!e) {
                self.collection = collection;
                self.isReady = true;
            } else {
                throw e;
            }
        });
    });
};

DocDB.prototype.updateItem = function(item, callback) {
    var self = this;

    self.client.replaceDocument(item._self, item, function (err, doc) {
        return callback(err, doc);
    });
}

/* get item
* query: the select condition
* example: "select * where userId = 1"
*/ 
DocDB.prototype.getItem = function (query, callback) {      
    var self = this;

    self.client.queryDocuments(self.collection._self, query).toArray(function (err, results) {
        if (err || results.length == 0) {
            return callback(err);
        }

        return callback(null, results[0]);
    });
}

// create an item
DocDB.prototype.addItem = function (item, callback) {
    var self = this;

    self.client.createDocument(self.collection._self, item, function (err, doc) {
        return callback(err, doc);
    });        
}


// query the provided table/collection
DocDB.prototype.queryItems = function(query, callback) {
    var self = this;

    self.client.queryDocuments(self.collection._self, query).toArray(function (err, docs) {
        return callback(err, docs);
    });
}

DocDB.prototype.removeItem = function(item, callback)  {
    var self = this;

    self.client.deleteDocument(item,function(e) {
        return callback(e);
    });
}

// if the database does not exist, then create it, else return the database object
DocDB.prototype.readOrCreateDatabase = function (databaseId, callback) {
    var self = this;

    self.client.queryDatabases('SELECT * FROM root r WHERE r.id="' + databaseId + '"').toArray(function (err, results) {
        if (!err && results.length === 0) {
            // no error occured, but there were no results returned 
            // indicating no database exists matching the query            
            self.client.createDatabase({ id: databaseId }, function (err, createdDatabase) {
                return callback(err, createdDatabase);
            });
        } else {
            return callback(err, results[0]);
        }
    });
};

// if the collection does not exist for the database provided, create it, else return the collection object
DocDB.prototype.readOrCreateCollection = function (database, collectionId, callback) {
    var self = this;

    self.client.queryCollections(database._self, 'SELECT * FROM root r WHERE r.id="' + collectionId + '"').toArray(function (err, results) {          
        if (!err && results.length === 0) {
            self.client.createCollection(database._self, { id: collectionId }, function (err, createdCollection) {
                return callback(err, createdCollection);
            });
        } else {
            return callback(err, results[0]);
        }
    });
};


module.exports = DocDB;