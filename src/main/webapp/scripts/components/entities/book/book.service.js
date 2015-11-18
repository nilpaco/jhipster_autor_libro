'use strict';

angular.module('jhipsterApp')
    .factory('Book', function ($resource, DateUtils) {
        return $resource('api/books/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.publishdate = DateUtils.convertLocaleDateFromServer(data.publishdate);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.publishdate = DateUtils.convertLocaleDateToServer(data.publishdate);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.publishdate = DateUtils.convertLocaleDateToServer(data.publishdate);
                    return angular.toJson(data);
                }
            }
        });
    });
