// This is the main angularjs module configuration
define([], function () {
	return ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise("/page1");

		$stateProvider
			.state('link1', {
				url: '/page1',
				templateUrl: 'p1.html',
				controller: 'P1Ctrl'
			})
			.state('link2', {
				url: '/page2',
				templateUrl: 'p2.html',
				controller: ['$scope', function ($scope) {
					$scope.things = ['A', 'list', 'of', 'things'];
				}]
			});
	}];
});