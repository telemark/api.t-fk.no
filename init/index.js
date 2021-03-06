'use strict';

var fs = require('fs');
var mongojs = require('mongojs');
var config = require('../config');
var DB = mongojs(config.DB);
var dataList = [
  {
    'db':DB.collection('municipalities'),
    'file': 'init/data/municipalities.json'
  },
  {
    'db':DB.collection('departments'),
    'file': 'init/data/departments.json'
  },
  {
    'db':DB.collection('journals'),
    'file': 'init/data/journals.json'
  },
  {
    'db':DB.collection('recruitments'),
    'file': 'init/data/recruitments.json'
  }
];

function getData(opts, callback) {
  fs.readFile(opts.file, function(err, data) {
    if (err) {
      return callback(err, null);
    } else {
      opts.data = JSON.parse(data.toString());
      return callback(null, opts);
    }
  });
}

function addDocument(db, post) {
  db.save(post, function(err, success) {
    if (err) {
      console.error(err);
    } else {
      console.log(success);
    }
  });
}

function addDocuments(err, opts) {
  if (err) {
    console.error(err);
  } else {
    opts.db.drop();
    opts.data.forEach(function(document) {
      addDocument(opts.db, document);
    });
  }
}

//Imports all init data
dataList.forEach(function(opts) {
  getData(opts, addDocuments);
});
