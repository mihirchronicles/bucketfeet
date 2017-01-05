'use strict';

(function () {

	var app = angular.module('bucketfeet', ['ui.router','ui.grid', 'ngAnimate', 'ui.grid.pagination']);

	app.run(function($state, $rootScope) {
		$rootScope.$state = $state;
	});

	app.config(function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider
		.otherwise('/');

		$stateProvider
		.state('stats', 
			{
				url: '/stats',
				templateUrl: './js/views/statsTmpl.html',
				controller: 'statsCtrl'
			})
		.state('table', 
			{
				url: '/table',
				templateUrl: './js/views/tableTmpl.html',
				controller: 'tableCtrl'
			});

	});
}());