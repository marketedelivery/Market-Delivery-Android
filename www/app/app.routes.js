(function() {
	angular
		.module('entryPoint')
		.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

			$stateProvider

				.state('login', {
				url: '/login',
				templateUrl: 'app/templates/login/login.template.html',
				controller: 'LoginController',
				controllerAs: 'loginCtrl'

			})

			.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: 'app/templates/menu/menu.template.html',
				controller: 'AppController',
				controllerAs: 'appCtrl',
				cache: false

			})

			.state('app.produto', {
				url: '/produto',
				views: {
					'menuContent': {
						templateUrl: 'app/templates/produto/produto.template.html',
						controller: 'ProdutoController',
						controllerAs: 'produtoCtrl'
					}
				},
				params: {
					loginType: null
				}

			})

			.state('app.conta', {
				url: '/conta',
				views: {
					'menuContent': {
						templateUrl: 'app/templates/conta/conta.template.html',
						controller: 'ContaController',
						controllerAs: 'contaCtrl'
					}
				}

			})

			.state('app.carrinho', {
				url: '/carrinho',
				views: {
					'menuContent': {
						templateUrl: 'app/templates/carrinho/carrinho.template.html',
						controller: 'CarrinhoController',
						controllerAs: 'carrinhoCtrl'
					}
				}

			})

			.state('app.tab', {
				url: '/listas',
				views: {
					'menuContent': {
						templateUrl: 'app/templates/lista/lista.tab.template.html',
						controller: 'ListaController',
						controllerAs: 'listaCtrl'
					}
				}

			})

			.state('app.tab.minhalista', {
				url: '/lista',
				views: {
					'minhalista-tab': {
						templateUrl: 'app/templates/lista/lista.template.html',
						controller: 'ListaController',
						controllerAs: 'listaCtrl'
					}
				}

			})

			.state('app.tab.favorito', {
				url: '/favorito',
				views: {
					'favorito-tab': {
						templateUrl: 'app/templates/lista/lista.template.html',
						controller: 'ListaController',
						controllerAs: 'listaCtrl'
					}
				}

			})

			.state('app.teste', {
				url: '/teste',
				views: {
					'menuContent': {
						templateUrl: 'app/templates/produto/produto.template.html',
						controller: 'ProdutoController',
						controllerAs: 'produtoCtrl'
					}
				}
			});


			// .state('app.tab.detalhe', {
			// 	url: '/detalhe',
			// 	views: {
			// 		'minhalista-tab': {
			// 			templateUrl: 'app/templates/lista/lista.detalhe.template.html',
			// 			controller: 'ListaFormController',
			// 			controllerAs: 'listaformCtrl'
			//
			// 		}
			// 	},
			// 	params: {
			// 		isEditMode: null,
			// 		lista: null
			// 	},
			// 	cache: false
			//
			// });
			$urlRouterProvider.otherwise('login');
			$httpProvider.defaults.headers.common = {};
			$httpProvider.defaults.headers.post = {};
			$httpProvider.defaults.headers.put = {};
			$httpProvider.defaults.headers.patch = {};
		});






})();
