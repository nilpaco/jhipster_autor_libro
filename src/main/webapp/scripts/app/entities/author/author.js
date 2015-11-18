'use strict';

angular.module('jhipsterApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('author', {
                parent: 'entity',
                url: '/authors',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Authors'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/author/authors.html',
                        controller: 'AuthorController'
                    }
                },
                resolve: {
                }
            })
            .state('author.detail', {
                parent: 'entity',
                url: '/author/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Author'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/author/author-detail.html',
                        controller: 'AuthorDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Author', function($stateParams, Author) {
                        return Author.get({id : $stateParams.id});
                    }]
                }
            })
            .state('author.new', {
                parent: 'author',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/author/author-dialog.html',
                        controller: 'AuthorDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    birthdate: null,
                                    country: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('author', null, { reload: true });
                    }, function() {
                        $state.go('author');
                    })
                }]
            })
            .state('author.edit', {
                parent: 'author',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/author/author-dialog.html',
                        controller: 'AuthorDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Author', function(Author) {
                                return Author.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('author', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
