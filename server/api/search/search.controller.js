/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var request = require('request');
var xpath = require('xpath');
var dom = require('xmldom').DOMParser;
var fs = require('fs');

// Get list of things
exports.index = function(req, res) {

  var url = 'https://www.aetna.com/search/results.aspx?cfg=wwwaetnacom&query=' + req.params.query;

  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      
      console.log(body);
      res.set('Content-Type', 'text/xml');
      res.send(body);

    }
  });
};