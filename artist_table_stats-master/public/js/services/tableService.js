"use strict";

(function () {
var app = angular.module('bucketfeet');

app.service('tableService', function($http, $q) {

	/************************************************
    GET ARTIST DATA 
    ************************************************/
	this.getArtistData = function() {

		var defer = $q.defer();

		$http.get('../../../data/artists-lite.json')
			.success(function(response) {

				var objTableArray = response;

				objTableArray.forEach(function(user) {
					var httpsLinkCloudFront = "https://d153fwbf2sefnf.cloudfront.net"; //37
					var httpLinkCloudFront = "http://d153fwbf2sefnf.cloudfront.net"; //36
					var LinkCloudFront = /https?:\/\/d153fwbf2sefnf.cloudfront.net/;
					var prefixLink = "http://www.bucketfeet.com";
					var placeHolderForLink = user.profile_image_url;

					if(placeHolderForLink) {
						//if user profile image has HTTP /cloudfront prefix link remove it and add http://www.bucketfeet.com OR don't add anything
						placeHolderForLink = placeHolderForLink.replace(LinkCloudFront, prefixLink);
						if (!placeHolderForLink.startsWith(prefixLink)) {
			                placeHolderForLink = prefixLink.concat(placeHolderForLink);
			            }
					}
					//if you comment out line 35-38, it should still render default (directive)
					else {
						//if it is empty give it a default image
						placeHolderForLink = "https://unbrandeddesignsblog.files.wordpress.com/2013/12/bucket-feet.jpg";
					}

					user.profile_image_url = placeHolderForLink;

					// if (!user.img) {
					// 	user.img = '../../../imgs/art.jpg';
					// }
				});  
			// console.log(objTableArray);
			defer.resolve(objTableArray);	
			})
			.error(function(err) {
				defer.reject(err);
			});

	return defer.promise;

	};
});
} ());