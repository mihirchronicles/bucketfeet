"use strict";

(function () {

var app = angular.module('bucketfeet');

app.directive('imageRender', function () {
    var imageRenderTableView = {
    	restrict: 'AE',
    	template: '<img width=30px src="imgs/art.jpg" ng-src="{{row.entity.profile_image_url}}">',
    	link: function(scope, element, attrs) {
		  var defaultSrc = attrs.src;
		      element.bind('error', function() {
		        if(defaultSrc) {
		            element.attr('src', defaultSrc);
		        }
		        else if(attrs.ngSrc) {
		            element.attr('ngSrc', attrs.ngSrc);
		        }
	      });
		}
    }
    return imageRenderTableView;
});
} ());


