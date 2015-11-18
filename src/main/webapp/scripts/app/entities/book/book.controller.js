'use strict';

angular.module('jhipsterApp')
    .controller('BookController', function ($scope, Book, ParseLinks) {
        $scope.books = [];
        $scope.page = 0;
        $scope.loadAll = function() {
            Book.query({page: $scope.page, size: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.books = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Book.get({id: id}, function(result) {
                $scope.book = result;
                $('#deleteBookConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Book.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteBookConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.book = {
                name: null,
                publishdate: null,
                edition: null,
                sales: null,
                id: null
            };
        };
    });
