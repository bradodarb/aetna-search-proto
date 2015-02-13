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
var cheerio = require('cheerio');
// Get list of things
exports.index = function(req, res) {

  var url = 'http://www.aetna.com/dse/search/results?loggedInZip=true&modalSelectedPlan=&geoMainTypeAheadLastQuickSelectedVal=&searchQuery=Family+Practice&geoSearch=85268&distance=30&filterValues=';
  var langFilter = 'Languages:languagenavigator:French';
  var genderFilter = '|Gender:gendernavigator:Female';

  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      //'#providersTable > tbody > tr > td:nth-child(2)'
      var $ = cheerio.load(body);
      var data = {};
      data.results = [];
      data.filters = {};
      $('#providersTable > tbody > tr > td:nth-child(2)').each(function(idx, elem){
        var result = {};
        result.name = $(this).find('a.links').html().trim();
        var info = $(this).clone().children().remove().end().text().trim();
        var infoParts = info.split('\n');
        info = '';
    

        for (var i = 0; i < infoParts.length; i++) {
          info += infoParts[i].trim() + ' ';
        };

        var phoneSplit = info.indexOf('Phone');
        result.address = info.substring(0, phoneSplit).trim();
        result.phone = info.substring(phoneSplit + 6, phoneSplit + 21).trim();
        result.specialties =  info.substring(phoneSplit + 21, info.length).trim();
       
        data.results.push(result);
      });

      $('#filter-data > .filter-item').each(function(idx, elem){

        var key = $(this).find('.filter-name').html().trim();
        data.filters[key] = {};
        data.filters[key].items = [];

        $(this).find('.filter-value').each(function(_idx, _elem){

          var filterDisplay = $(_elem).find('.filter-display').html().trim();
          var filterMatchValue = $(_elem).find('.filter-match').html().trim();

          //var filterCount = $(this).find('.filter-count');
          data.filters[key].items.push({display: filterDisplay, match:filterMatchValue});

        });

      });

      res.set('Content-Type', 'application/json');
      res.send(data);

    }
  });
};