"use strict";

(function () {
var app = angular.module('bucketfeet');

app.service('statsService', function($http, $q) {

	/************************************************
    GET ARTIST SIGNUP DATA 
    ************************************************/
	this.getSignupData = function() {

		var defer = $q.defer();

		$http.get('../../../data/artists-lite.json')
		.success(function(response) {

				var modFinalSignUpData = [];

				/*COUNT ALL TIME ARTIST SIGNUPS*/
				var objArray = response;
				var allTimeSignups = objArray.length;

				// modFinalSignUpData.push({
				// 	totalSignups: allTimeSignups
				// });

				// Define moment.js
				// Note we're using 'valueOf' to get the milliseconds
				// Since epoch makes comparing two numbers easier than comparing two moments.
				var thisMonthStart = moment().startOf('M').valueOf();
				var lastMonthStart = moment(thisMonthStart).subtract(1, 'M').valueOf();
				var twoMonthStart = moment().startOf('d').subtract(2, 'M').valueOf();
				var sixMonthStart = moment().startOf('d').subtract(6, 'M').valueOf();
				var twelveMonthStart = moment().startOf('d').subtract(12, 'M').valueOf();

				var thisMonthSignups = [],
				    lastMonthSignups = [],
				    twoMonthSignups = [],
				    sixMonthSignups = [],
				    twelveMonthSignups = [];

				/*COUNT ARTIST SIGNUPS FOR DURATION OF TIME*/
				var signups = response;
				// console.log(signups);

				signups.forEach(function(signup) {
				    // Parse the string from the records as a date, then use 'getTime()' to get the milliseconds since epoch
				    var createdAt = new Date(signup.created_at).getTime();

				    if (createdAt >= twelveMonthStart) {
				    	twelveMonthSignups.push(signup);

				    } if (createdAt >= sixMonthStart) {
				        sixMonthSignups.push(signup);

				    } if (createdAt >= twoMonthStart) {
				        twoMonthSignups.push(signup);

				    } if (createdAt >= thisMonthStart) {
				        thisMonthSignups.push(signup);

				    } else if (createdAt >= lastMonthStart) {
				        lastMonthSignups.push(signup);
				    }    
				});

				var thisMonthSignupsCount = thisMonthSignups.length,
				 	lastMonthSignupsCount = lastMonthSignups.length,
				 	twoMonthSignupsCount = twoMonthSignups.length,
				 	sixMonthSignupsCount = sixMonthSignups.length,
				 	oneYearSignupsCount = twelveMonthSignups.length;
					// thisMonthSignupsList = thisMonthSignups,
					// lastMonthSignupsList = lastMonthSignups,
					// twoMonthSignupsList = twoMonthSignups,
					// sixMonthSignupsList = sixMonthSignups,
					// oneYearSignupsList = twelveMonthSignups,

				// push modified array into a new modFinalSignUpData
				modFinalSignUpData.push({
					totalSignups: allTimeSignups,
					thisMonth: thisMonthSignupsCount,
					lastMonth: lastMonthSignupsCount,
					twoMonth: twoMonthSignupsCount,
					sixMonth: sixMonthSignupsCount,
					oneYear: oneYearSignupsCount
					// thisMonthList: thisMonthSignups,
					// lastMonthList: lastMonthSignups,
					// twoMonthList: twoMonthSignups,
					// sixMonthList: sixMonthSignups,
					// oneYearList: twelveMonthSignups
				});

		// console.log("modFinalSignUpData", modFinalSignUpData);
		defer.resolve(modFinalSignUpData);
		})
		.error(function(err) {
			defer.reject(err);
		});

		return defer.promise;

	};

	/************************************************
    GET ALL DATA 
    ************************************************/
	this.getAllSignupDataLineGraph = function() {
		var defer = $q.defer();

		$http.get('../../../data/artists-lite.json')
		.success(function(response) {

			// Get data for the last 2 months from today
			var twelveMonthDataLineGraph = moment().startOf('d').subtract(12, 'M').valueOf();

			var twelveMonthSignupsLineGraphArray = [];

			var modifiedDataLineGraph = response;

			modifiedDataLineGraph.forEach(function(e) {
				    // Parse the string from the records as a date, then use 'getTime()' to get the milliseconds since epoch
				    var createdAtLineGraph = new Date(e.created_at).getTime();

				    if (createdAtLineGraph >= twelveMonthDataLineGraph) {
				    	e.created_at = moment(e.created_at).format('M');
				    	twelveMonthSignupsLineGraphArray.push(e.created_at);
				    }
			});
			// console.log("twelveMonthSignupsLineGraphArray", twelveMonthSignupsLineGraphArray);

			var month1 = 0,
				month2 = 0,
			 	month3 = 0,
			 	month4 = 0,
				month5 = 0,
				month6 = 0,
				month7 = 0,
				month8 = 0,
				month9 = 0,
				month10 = 0,
				month11 = 0,
				month12 = 0;

		    for (var i = 0; i <= twelveMonthSignupsLineGraphArray.length; i++) {
		    	if(twelveMonthSignupsLineGraphArray[i] === "1") {
		    		month1 ++;
		    	} if(twelveMonthSignupsLineGraphArray[i] === "2") {
		    		month2 ++;
		    	} if(twelveMonthSignupsLineGraphArray[i] === "3") {
		    		month3 ++;
		    	} if(twelveMonthSignupsLineGraphArray[i] === "4") {
		    		month4 ++;
		    	} if(twelveMonthSignupsLineGraphArray[i] === "5") {
		    		month5 ++;
		    	} if(twelveMonthSignupsLineGraphArray[i] === "6") {
		    		month6 ++;
		    	} if(twelveMonthSignupsLineGraphArray[i] === "7") {
		    		month7 ++;
		    	} if(twelveMonthSignupsLineGraphArray[i] === "8") {
		    		month8 ++;
		    	} if(twelveMonthSignupsLineGraphArray[i] === "9") {
		    		month9 ++;
		    	} if(twelveMonthSignupsLineGraphArray[i] === "10") {
		    		month10 ++;
		    	} if(twelveMonthSignupsLineGraphArray[i] === "11") {
		    		month11 ++;
		    	} if(twelveMonthSignupsLineGraphArray[i] === "12") {
		    		month12 ++;
		    	}
		    }

		   	var getAllSignupDataLineGraphData = [
		   		{Jan: month1, month: 'January'},
		    	{Feb: month2, month: 'February'},
		    	{Mar: month3, month: 'March'},
		    	{Apr: month4, month: 'April'},
		    	{May: month5, month: 'May'},
		    	{June: month6, month: 'June'},
		    	{July: month7, month: 'July'},
		    	{Aug: month8, month: 'August'},
		    	{Sep: month9, month: 'September'},
		    	{Oct: month10, month: 'October'},
		    	{Nov: month11, month: 'November'},
		    	{Dec: month12, month: 'December'}
		    ];
		    console.log(getAllSignupDataLineGraphData);

		defer.resolve(getAllSignupDataLineGraphData);
		})
		.error(function(err) {
			defer.reject(err);
		});

		return defer.promise;

	};
});
} ());