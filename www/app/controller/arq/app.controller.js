(function(){

	angular
		.module('entryPoint')
		.controller('AppController', appController);

		appController.$inject = ['$scope', '$state','Constants', '$ionicPopover', '$ionicLoading', '$ionicModal', '$rootScope', '$openFB', 'UtilFactory', 'UsuarioService'];

		function appController($scope, $state, Constants, $ionicPopover, $ionicLoading, $ionicModal, $rootScope, $openFB, UtilFactory, UsuarioService){

			var vm = this;

			vm.initFb = initFb;
			vm.logOut = logOut;
			vm.goTo = goTo;
			vm.activeitemClass = 0;
			vm.cancelar = cancelar;
			vm.showModal = showModal;

			vm.loginType = {};
			vm.noResultCarrinho = true;
			


			function initFb(){

				// UsuarioService.login(fbId).then(
	      //   function success(response) {
	      //     var usuarios = response.data;
	      //     if (usuarios[0]) {
	      //       var usuario = usuarios.filter(function(usu) {
	      //         return usu.codigo_facebook === fbId;
	      //       })[0];
	      //       if (usuario) {
	      //         $rootScope.$broadcast("login", {
	      //             loginType: Constants.NM_LOGIN,
	      //             usuario: usuario
	      //         });
	      //       } else {
	      //         console.log('Usuário não encontrado');
				// 				TODO cadastrar usuario ghest
	      //       }
	      //     }
	      //   },
	      //   function error(error) {
	      //     console.log(error);
	      //   }
	      // );
				$openFB.isLoggedIn().then(
					function success(loginStatus){
						console.log(loginStatus);
						$openFB.api({path: '/me'})
				        .then(function(user) {
				            vm.user = user;
				        },
				        function(err) {
				            alert('Facebook error: ' + err);
				        });
				        $openFB.api({
				        	path: '/me/picture',
				        	params: {
						        redirect: false,
						        height: 80,
						        width: 80
						    }
				        })
				        .then(function(res) {
				            var me = {};
				            angular.extend(me, {picture: res.data.url});
				            vm.urlPicture = me.picture;
				        }, function(err) {
				            alert('Facebook error: ' + err);
				        });
					},
					function error(){
						 alert('Please use Facebook login!');
					});

			}

			function initNm(){
				vm.user = {
					name : "Usuário"
				};

			}

			function logOut(){
				$rootScope.$broadcast('logout', true);
			}

			function goTo(state, activeItem){
				vm.activeitemClass = activeItem;
				$state.go(state);
			}

			function init(){

				//var storage = window.localStorage;
				configCarrinhoModal();
				var usuarioRules = UtilFactory.getUsuarioStorage();
				switch(usuarioRules.loginType){
					case Constants.FB_LOGIN:
						initFb();
					break;
					case Constants.NM_LOGIN:
						initNm();
					break;
					default:
					break;
				}

			}

			function configureModal(){

				$ionicModal.fromTemplateUrl('app/templates/produto/modal.html', {
			    scope: $scope
			  }).then(function(modal) {
			    $scope.modal = modal;
			  });
				$scope.$on('$destroy', function() {
			    $scope.modal.remove();
			  });


			}
			function configCarrinhoModal(){

				$ionicModal.fromTemplateUrl('app/templates/carrinho/carrinho.template.html', {
			    scope: $scope,
					animation: 'fade-in-right'
			  }).then(function(modal) {
			    vm.carrinhoMod = modal;
			  });
				$scope.$on('$destroy', function() {
			    vm.carrinhoMod.remove();
			  });


			}

			function showModal(modal){
				modal.show();
			}

			function cancelar(modal){
				modal.hide();
			}

			// function configurePopover(){
			// 	$ionicPopover.fromTemplateUrl('app/templates/lista/popover.template.html', {
			//     scope: $scope
			//   }).then(function(popover) {
			//     $scope.popover = popover;
			//   });
			//
			//   $scope.openPopover = function($event) {
			//     $scope.popover.show($event);
			//
			//   };
			//   $scope.closePopover = function() {
			//     $scope.popover.hide();
			//   };
			//
			//   //Cleanup the popover when we're done with it!
			//   $scope.$on('$destroy', function() {
			//     $scope.popover.remove();
			//   });
			//
			//
			//   $scope.show = function() {
			//     $ionicLoading.show({
			//       template: 'Loading...',
			//       duration: 3000
			//     }).then(function(){
			//        console.log("The loading indicator is now displayed");
			//     });
			//   };
			//   $scope.hide = function(){
			//     $ionicLoading.hide().then(function(){
			//        console.log("The loading indicator is now hidden");
			//     });
			//   };
			//
			// }


			function setFbIdStorage(fbId){
				var usuario = UtilFactory.getUsuarioStorage();
				usuario.fbId = fbId;
				UtilFactory.setUsuarioStorage(usuario);
			}

			 init();


		}

})();
