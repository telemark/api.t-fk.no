'use strict';

var mongojs = require('mongojs')
  , config = require('../config')
  , db = mongojs(config.DB)
  , journals = db.collection('journals')
  ;

function getJournals(request, reply){
  journals.find(request.query, function (err, data) {
    if(err){
      reply(err);
    } else {
      reply(data)
    }
  });
}

function getJournal(request, reply){
  journals.findOne({sakId:request.params.sakId}, function (err, data) {
    if(err){
      reply(err)
    } else {
      reply(data);
    }
  });
}


module.exports.getJournals = getJournals;

module.exports.getJournal = getJournal;