"use strict";

(function () {
var app = angular.module('bucketfeet');

app.controller('statsCtrl', function($scope, statsService) {

	/************************************************
    GET ALL SIGNUP DATA 
    ************************************************/
	var getAllSignupData = function() {
        statsService.getSignupData().then(function(data) {
        	// console.log('this is controller data', data);

        		$scope.thisMonthSignups = data[0].thisMonth;
        		$scope.lastMonthSignups = data[0].lastMonth;
        		$scope.twoMonthSignups = data[0].twoMonth;
        		$scope.sixMonthSignups = data[0].sixMonth;
        		$scope.lastYearSignups = data[0].oneYear;
        		$scope.allTimeSignups = data[0].totalSignups;
		});	
    };
    getAllSignupData();

    /************************************************
    GRAPH 1 - DYNAMIC LINE GRAPH
    ************************************************/
    var getGraph1 = function() {
        statsService.getAllSignupDataLineGraph().then(function(data) {
        	// console.log('this is line graph data');

		var chart1 = c3.generate({
			bindto: '#chart1',
			data: {
				json: [
					{month: data[0].month, total: data[0].Jan},
					{month: data[1].month, total: data[1].Feb},
					{month: data[2].month, total: data[2].Mar},
					{month: data[3].month, total: data[3].Apr},
					{month: data[4].month, total: data[4].May},
					{month: data[5].month, total: data[5].June},
					{month: data[6].month, total: data[6].July},
					{month: data[7].month, total: data[7].Aug},
					{month: data[8].month, total: data[8].Sep},
					{month: data[9].month, total: data[9].Oct},
					{month: data[10].month, total: data[10].Nov},
					{month: data[11].month, total: data[11].Dec}
				],
				keys: {
					value: ['total'],
				}
			},
			axis: {
		        x: {
                    label: {
                        text: "MONTH",
                        position: "outer-center"
                    },
		            type: 'category',
		            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                },
                y: {
                    label: {
                        text: "NUMBER OF SIGNUPS",
                        position: "outer-middle"
                    }
                }
		    },
		    legend: {
		        show: false
		    },
		    subchart: {
		        show: true,
		        size: {
                	height: 90
              	}
		    },
		    grid: {
		        x: {
		            show: true
		        },
		        y: {
		            show: true
		        }
		    },
		    labels: true,
		    size: {
                height: 600,
                width: 1260
            }
   //          onresize: function () { 
			// 	chart1.resize({
			// 	  height: 440,
			// 	  width: 600
			// 	});
			// },
			// onresized: function () { 
			// 	chart1.resize({
			// 	  height: 440,
			// 	  width: 560
			// 	});
			// }
		});

    
	}); //End
	};	//End getGraph1
	getGraph1();

    /************************************************
    GRAPH 2 - PIE CHART
    ************************************************/
    var getGraph2 = function() {
        statsService.getSignupData().then(function(data) {

	    var chart2 = c3.generate({
	    	bindto: '#chart2',
			data: {
				json: [
				  {	
				  	currentMonth: data[0].thisMonth,
				  	lastMonth: data[0].lastMonth, 
				  	twoMonths: data[0].twoMonth,
				  	sixMonths: data[0].sixMonth,
				  	lastYear: data[0].oneYear
				  }
				],
				keys: {
					value: ['currentMonth', 'lastMonth', 'twoMonths', 'sixMonths', 'lastYear'],
				},
				types: {
					currentMonth:'pie',
					lastMonth: 'pie',
					twoMonths: 'pie',
					sixMonths: 'pie',
					lastYear: 'pie'
				}
			},
			axis: {
				x: {
					label: {
	                    text: "DURATION OF TIME",
	                    position: "outer-center"
	                }
				}
			}
		    
		}); //End chart 
		setTimeout(function () {
	    chart2.transform('donut');
		}, 1000);

	}); //End 
	};	//End getGraph2 
	getGraph2();

	/************************************************
    GRAPH 3 - HISTOGRAM
    ************************************************/
    var getGraph3 = function() {
        statsService.getSignupData().then(function(data) {

	    var chart3 = c3.generate({
	    	bindto: '#chart3',
			data: {
				json: [
				  {	
				  	currentMonth: data[0].thisMonth,
				  	lastMonth: data[0].lastMonth, 
				  	twoMonths: data[0].twoMonth,
				  	sixMonths: data[0].sixMonth,
				  	lastYear: data[0].oneYear
				  }
				],
				keys: {
					value: ['currentMonth', 'lastMonth', 'twoMonths', 'sixMonths', 'lastYear'],
				},
				types: {
					currentMonth:'bar',
					lastMonth: 'bar',
					twoMonths: 'bar',
					sixMonths: 'bar',
					lastYear: 'bar'
				}
			},
			axis: {
				x: {
					label: {
	                    text: "Duration of time",
	                    position: "outer-center"
	                }
				},
				y: {
					label: {
	                    text: "# of Artist Signups",
	                    position: "outer-middle"
	                }
				}
			},
			tooltip: {
		        format: {
		            title: function (d) { return 'Artist Signups' ; }
		        }
	    	}
		    
		}); //End chart

	}); //End 
	};	//End getGraph3
	getGraph3();

});
} ());