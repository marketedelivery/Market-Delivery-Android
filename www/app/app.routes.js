(function(){
	angular
		.module('entryPoint')
		.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){

			$stateProvider

				.state('login',{
					url: '/login',
					templateUrl: 'app/templates/login.template.html',
					controller: 'LoginController',
					controllerAs: 'loginCtrl'
						
				})

				.state('app',{
					url: '/app',
					abstract: true,
					templateUrl: 'app/templates/menu.template.html',
					controller: 'AppController',
					controllerAs: 'appCtrl'

				})

				.state('app.home',{
					url: '/home',
					views : {
						'menuContent' : {
							templateUrl: 'app/templates/home.template.html',
							controller: 'HomeController',
							controllerAs: 'homeCtrl'
						}
					},
					params: {
            			loginType: null
        			}

				})

				.state('app.conta',{
					url: '/conta',
					views : {
						'menuContent' : {
							templateUrl: 'app/templates/conta.template.html',
							controller: 'ContaController',
							controllerAs: 'contaCtrl'
						}
					}

				})

				.state('app.carrinho',{
					url: '/carrinho',
					views : {
						'menuContent' : {
							templateUrl: 'app/templates/carrinho.template.html',
							controller: 'CarrinhoController',
							controllerAs: 'carrinhoCtrl'
						}
					}

				})

				.state('app.lista',{
					url: '/lista',
					views : {
						'menuContent' : {
							templateUrl: 'app/templates/lista.template.html',
							controller: 'ListaController',
							controllerAs: 'listaCtrl'
						}
					},
					params : {
						supermercadoObj : null

					}

				})

				.state('app.listaform',{
					url: '/listaform',
					views : {
						'menuContent' : {
							templateUrl: 'app/templates/listaform.template.html',
							controller: 'ListaFormController',
							controllerAs: 'listaformCtrl'

						}
					},
					params : {
						isEditMode : null
					},
					cache : false

				});
		$urlRouterProvider.otherwise('login');
		});


		


		
})();