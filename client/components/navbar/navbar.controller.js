'use strict';

angular.module('applicationApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
      {
        'title': 'Individuals & Families',
        'link': 'https://www.aetna.com/individuals-families.html#open'
      },
      {
        'title': 'Employers & Organizations',
        'link': 'https://www.aetna.com/employers-organizations.html#open'
      },
      {
        'title': 'Health Care Professionals',
        'link': 'https://www.aetna.com/health-care-professionals.html#open'
      },
      {
        'title': 'Producers',
        'link': 'https://www.aetna.com/insurance-producer.html#open'
      },
      {
        'title': 'About Us',
        'link': 'https://www.aetna.com/about-us.html#open'
      }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });