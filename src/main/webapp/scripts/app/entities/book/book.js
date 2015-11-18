'use strict';

angular.module('jhipsterApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('book', {
                parent: 'entity',
                url: '/books',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Books'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/book/books.html',
                        controller: 'BookController'
                    }
                },
                resolve: {
                }
            })
            .state('book.detail', {
                parent: 'entity',
                url: '/book/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Book'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/book/book-detail.html',
                        controller: 'BookDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Book', function($stateParams, Book) {
                        return Book.get({id : $stateParams.id});
                    }]
                }
            })
            .state('book.new', {
                parent: 'book',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/book/book-dialog.html',
                        controller: 'BookDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    publishdate: null,
                                    edition: null,
                                    sales: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('book', null, { reload: true });
                    }, function() {
                        $state.go('book');
                    })
                }]
            })
            .state('book.edit', {
                parent: 'book',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/book/book-dialog.html',
                        controller: 'BookDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Book', function(Book) {
                                return Book.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('book', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
