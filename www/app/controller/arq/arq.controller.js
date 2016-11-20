(function() {

  angular
    .module('entryPoint')
    .controller('arqController', arqController);

  arqController.$inject = ['$rootScope', '$scope', '$state', '$openFB','Constants', 'UtilFactory'];

  function arqController($rootScope, $scope, $state, $openFB, Constants, UtilFactory) {

    var vm = this;
    vm.appStarted = false;

    //Coment for teste
    //vm.isLogged = false;
    vm.isLogged = false;


    function init() {

      $openFB.init({
        appId: '263167474084754',
        secret: '69d2dff24086874f45ef90c95b61b75d'
      });

      $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams, fromState, fromStateParams) {

        // if (toState.name !== "login" && !$window.sessionStorage['fbtoken']) {


					if (toState.name !== "login" && !vm.isLogged) {
						event.preventDefault();
						$state.go('login');
					} else if (toState.name === "login" && vm.isLogged) {
						$state.go('app.produto');
					}

      });


      $rootScope.$on('login', function(event, toState, toStateParams, fromState, fromStateParams) {
        vm.isLogged = true;
        //var localStorage = window.localStorage;
        //localStorage.setItem('usuarioRules', {loginType : toState.loginType,usuario: toState.usuario});
        UtilFactory.setUsuarioStorage({loginType : toState.loginType,usuario: toState.usuario});
        // if(toState.loginType && toState.loginType === Constants.FB_LOGIN){
        //   localStorage.setItem('usuario', {fbId: toState.fbId});
        // }
        $state.go('app.produto');
      });

      $rootScope.$on('logout', function() {
        vm.isLogged = false;
        UtilFactory.removeUsuarioStorage();
        $state.go('login');
      });

    }
    init();



  }

})();
