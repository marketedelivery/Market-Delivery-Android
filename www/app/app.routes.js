(function() {
	angular
		.module('entryPoint')
		.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider, loadServiceProvider) {

			$stateProvider

				.state('login', {
				url: '/login',
				templateUrl: 'app/templates/login/login.html',
				controller: 'LoginController',
				controllerAs: 'loginCtrl'

			})

			.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: 'app/templates/menu/menu.html',
				controller: 'AppController',
				controllerAs: 'appCtrl',
				cache: false

			})

			.state('app.produto', {
				url: '/produto',
				views: {
					'menuContent': {
						templateUrl: 'app/templates/produto/produto.html',
						controller: 'ProdutoController',
						controllerAs: 'produtoCtrl',

					}
				},
				cache: false,
				params: {
					loginType: null
				}

			})

			.state('app.conta', {
				url: '/supermercado',
				views: {
					'menuContent': {
						templateUrl: 'app/templates/supermercado/supermercado.html',
						controller: 'SupermercadoController',
						controllerAs: 'supermercadoCtrl'
					}
				}

			})

			.state('app.carrinho', {
				url: '/carrinho',
				views: {
					'menuContent': {
						templateUrl: 'app/templates/carrinho/carrinho.html',
						controller: 'CarrinhoController',
						controllerAs: 'carrinhoCtrl'
					}
				}

			})

			.state('app.tab', {
				url: '/listas',
				views: {
					'menuContent': {
						templateUrl: 'app/templates/lista/lista.tab.html',
						controller: 'ListaTabController',
						controllerAs: 'listaTabCtrl'
					}
				}

			})

			.state('app.tab.minhalista', {
				url: '/lista',
				views: {
					'minhalista-tab': {
						templateUrl: 'app/templates/lista/lista.html',
						controller: 'ListaController',
						controllerAs: 'listaCtrl'
					}
				},
				cache: false

			})

			.state('app.tab.favorito', {
				url: '/favorito',
				views: {
					'favorito-tab': {
						templateUrl: 'app/templates/lista/lista.html',
						controller: 'ListaController',
						controllerAs: 'listaCtrl'
					}
				}

			});

			$urlRouterProvider.otherwise('login');
			$httpProvider.defaults.headers.common = {};
			$httpProvider.defaults.headers.post = {};
			$httpProvider.defaults.headers.put = {};
			$httpProvider.defaults.headers.patch = {};
			$httpProvider.interceptors.push(interceptor);

			function interceptor(){
				return {
					request: function(config){
						if(config.url.indexOf('rest')!==-1){
							//loadServiceProvider.show();

						}
						return config;
					},
					response: function(response){
						
						return response;
					}
				};
			}
		});






})();
