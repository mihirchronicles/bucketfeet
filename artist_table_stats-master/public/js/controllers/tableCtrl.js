"use strict";

(function () {
var app = angular.module('bucketfeet');


app.controller('tableCtrl', function($scope, tableService, uiGridConstants) {

    /************************************************
    INITIALIZE GRID OPTIONS BEFORE 
    ************************************************/
    $scope.gridOptions = {
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        enablePaginationControls: false,
        paginationPageSize: [50],
        columnDefs: [
            {name:'img', width: 50, cellTemplate:"<image-render></image-render>", enableSorting: false},
            {name:'created_at', suppressRemoveSort: true, width: 200,
                sort: { 
                    direction: uiGridConstants.DESC, priority: 0
                }
            },
            {name:'artist_id', enableSorting: false, width: 90},
            {name:'first_name', width: 120},
            {name:'last_name', width: 120},
            {name:'city', enableSorting: false, width: 120},
            {name:'country', enableSorting: false, width: 90},
            {name:'email', enableSorting: false, width: 220},
            {name:'profile_image_url', enableSorting: false, cellTemplate: '<div class="ui-grid-cell-contents">' +
                   '<a href="{{row.entity.profile_image_url}}">{{row.entity.profile_image_url}}</a>' +
                   '</div>'}
        ]
    };

    $scope.gridOptions.data = [];


    /************************************************
    GET ALL ARTIST DATA 
    ************************************************/
    var getAllArtistData = function() {
        tableService.getArtistData().then(function(data) {
            // console.log("this is controller data", data);

            $scope.gridOptions.data = data;

            });
        };

    getAllArtistData();
});
} ());