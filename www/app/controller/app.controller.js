(function(){

	angular
		.module('entryPoint')
		.controller('AppController', appController);

		appController.$inject = ['$scope', '$state','Constants', '$ionicPopover', '$ionicLoading', '$ionicModal', '$rootScope', '$openFB'];

		function appController($scope, $state, Constants, $ionicPopover, $ionicLoading, $ionicModal, $rootScope, $openFB){

			var vm = this;

			vm.initFb = initFb;
			vm.logOut = logOut;

			vm.loginType = {};


			function initFb(){
				$openFB.isLoggedIn().then(
					function success(loginStatus){
						$openFB.api({path: '/me'})
				        .then(function(user) {
				            vm.user = user;
				        }
				        , function(err) {
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
				        }
				        , function(err) {
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

			function init(){

				var storage = window.localStorage;
				var value = storage.getItem('loginType');

				switch(value){
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

				$ionicModal.fromTemplateUrl('app/templates/modal.html', {
			    scope: $scope
			  }).then(function(modal) {
			    $scope.modal = modal;
			  });


			}

			function configurePopover(){
				$ionicPopover.fromTemplateUrl('app/templates/popover.template.html', {
			    scope: $scope
			  }).then(function(popover) {
			    $scope.popover = popover;
			  });

			  $scope.openPopover = function($event) {
			    $scope.popover.show($event);
			  };
			  $scope.closePopover = function() {
			    $scope.popover.hide();
			  };
			  //Cleanup the popover when we're done with it!
			  $scope.$on('$destroy', function() {
			    $scope.popover.remove();
			  });


			  $scope.show = function() {
			    $ionicLoading.show({
			      template: 'Loading...',
			      duration: 3000
			    }).then(function(){
			       console.log("The loading indicator is now displayed");
			    });
			  };
			  $scope.hide = function(){
			    $ionicLoading.hide().then(function(){
			       console.log("The loading indicator is now hidden");
			    });
			  };

			}

			function showModal(){
				$scope.modal.show();
			}
			
			 init();


		}

})();