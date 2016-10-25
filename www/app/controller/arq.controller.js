(function(){

	angular
		.module('entryPoint')
		.controller('arqController', arqController);

		arqController.$inject = ['$rootScope','$scope', '$state', '$openFB'];

		function arqController($rootScope, $scope, $state, $openFB){

			var vm = this;
			vm.appStarted = false;
			
			
			vm.isLogged = false;


			function init(){

				$openFB.init( {appId: '263167474084754'} );

				$rootScope.$on('$stateChangeStart', function (event, toState, toStateParams, fromState, fromStateParams) {

              // if (toState.name !== "login" && !$window.sessionStorage['fbtoken']) {
              		if (toState.name !== "login" && !vm.isLogged) {
                    	event.preventDefault();
                    	$state.go('login');
                	}else if(toState.name === "login" && vm.isLogged){
                		$state.go('app.home');
                	}

            	});
				

				$rootScope.$on('login', function (event, toState, toStateParams, fromState, fromStateParams) {
					vm.isLogged = true;
					var storage = window.localStorage;
					storage.setItem('loginType', toState.loginType);
					$state.go('app.home');
			  });
	
        		$rootScope.$on('logout', function() {
					vm.isLogged = false;
					var storage = window.localStorage;
					storage.removeItem('loginType');
            		$state.go('login');
        		});


				if(!vm.appStarted){
					vm.appStarted = true;
					if(!vm.isLogged){
						//TODO - Recuperar do localstorage o tipo de login se já estiver salvo
					}
				}

				
			}
			 init();


			
		}

})();