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

  var url = 'http://www.aetna.com/dse/search/results?searchQuery=Family+Practice&geoSearch=85268&pagination.offset=&zipCode=85268&distance=30&filterValues=&useZipForLatLonSearch=true&fastProduct=&currentSelectedPlan=&selectedMemberForZip=&sessionCachingKey=&loggedInZip=true&modalSelectedPlan=&isTab1Clicked=&isTab2Clicked=&quickSearchTypeMainTypeAhead=&quickSearchTypeThrCol=&mainTypeAheadSelectionVal=&thrdColSelectedVal=&isMultiSpecSelected=&hospitalNavigator=&productPlanName=&hospitalNameFromDetails=&planCodeFromDetails=&hospitalFromDetails=false&aetnaId=&Quicklastname=&Quickfirstname=&QuickZipcode=&QuickCoordinates=&quickSearchTerm=&ipaFromDetails=&ipaFromResults=&ipaNameForProvider=&porgId=&officeLocation=&otherOfficeProviderName=&officesLinkIsTrueDetails=false&groupnavigator=&groupFromDetails=&groupFromResults=&groupNameForProvider=&suppressFASTCall=&classificationLimit=&suppressFASTDocCall=true&axcelSpecialtyAddCatTierTrueInd=&suppressHLCall=&pcpSearchIndicator=true&specSearchIndicator=&stateCode=&geoMainTypeAheadLastQuickSelectedVal=&geoBoxSearch=&lastPageTravVal=&debugInfo=&linkwithoutplan=&site_id=docfind&sendZipLimitInd=&ioeqSelectionInd=&ioe_qType=&sortOrder=';

  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      //'#providersTable > tbody > tr > td:nth-child(2)'
      var $ = cheerio.load(body);

			var data= $('#providersTable > tbody > tr > td:nth-child(2)') .clone()
            .children()
            .remove()
            .end()
            .text();

      console.log(data);
      res.set('Content-Type', 'text/html');
      res.send(data);

    }
  });
};