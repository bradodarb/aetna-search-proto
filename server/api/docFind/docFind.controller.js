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
var uri = require('url');
var cheerio = require('cheerio');
// Get list of things
exports.index = function(req, res) {
  var url_parts = uri.parse(req.url);
  var query = url_parts.query;

  var url = 'http://www.aetna.com/dse/search/results?loggedInZip=true&modalSelectedPlan=&geoMainTypeAheadLastQuickSelectedVal=&geoBoxSearch=true&Quicklastname=&Quickfirstname=&quickSearchTerm=&useZipForLatLonSearch=true&' + query;
 
  if(url.indexOf('&filterValues=') < 0){
    url += '&filterValues=';
  }

  console.log(url);
  request(url /*+ '&modalSelectedPlan=ACNMC'*/, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      //'#providersTable > tbody > tr > td:nth-child(2)'
      var $ = cheerio.load(body);
      var data = {};
      data.results = [];
      data.filters = {};
      $('#providersTable > tbody > tr').each(function(idx, elem){

        var location = $(elem).find('> td:nth-child(2)');
        var distance = ($(elem).find('> .providerNumber').clone().children().remove().end().text() || ' ').trim();

        var result = {};
        result.name = ($(location).find('a.links').html() || ' ').trim();
        var info = ($(location).clone().children().remove().end().text() || ' ').trim();
        var infoParts = info.split('\n');
        info = '';
    

        for (var i = 0; i < infoParts.length; i++) {
          info += infoParts[i].trim() + ' ';
        };

        var phoneSplit = info.indexOf('Phone');
        result.address = (info.substring(0, phoneSplit) || ' ').trim();
        result.phone = (info.substring(phoneSplit + 6, phoneSplit + 21) || ' ').trim();
        result.specialties =  (info.substring(phoneSplit + 21, info.length) || ' ').trim();
        result.id = idx;
        result.distance = distance;
        data.results.push(result);
      });

      $('#filter-data > .filter-item').each(function(idx, elem){

        var key = ($(this).find('.filter-name').html() || ' ').trim();
        data.filters[key] = {};
        data.filters[key].items = [];

        $(this).find('.filter-value').each(function(_idx, _elem){

          var filterDisplay = ($(_elem).find('.filter-display').html() || ' ').trim();
          var filterMatchValue = ($(_elem).find('.filter-match').html() || ' ').trim();

          //var filterCount = $(this).find('.filter-count');
          data.filters[key].items.push({display: filterDisplay, match:filterMatchValue});

        });

      });

      $('.poi_latitude').each(function(idx, elem){
        var lat =  ($(elem).html() || ' ').trim();
        //console.log(lat);
        data.results[idx].latitude = lat;
      });
      $('.poi_longitude').each(function(idx, elem){
        var lon =  ($(elem).html() || ' ').trim();
        //console.log(lon);
        data.results[idx].longitude = lon;
      });
 
      $("script").each(function() {

        var text = $(this).html();
        if(text.indexOf('searchURL') > -1){

          var start = text.indexOf('center=')
          if(start > -1){

            var end = start + text.substring(start).indexOf('&');
            data.quickCoordinates = text.substring(start + 10, end - 3);

          }
        }

      });

      res.set('Content-Type', 'application/json');
      res.send(data);

    }
  });
};