(function() {

  angular
    .module('entryPoint')
    .controller('arqController', arqController);

  arqController.$inject = ['$rootScope', '$scope', '$state', '$openFB','Constants', 'UtilFactory', '$ionicModal', '$timeout'];

  function arqController($rootScope, $scope, $state, $openFB, Constants, UtilFactory, $ionicModal, $timeout) {

    var vm = this;
    vm.appStarted = false;
    vm.isLogged = false;
    var timeoutControl;

    function init() {
      configModal();
      $openFB.init({
        appId: '263167474084754',
        secret: '69d2dff24086874f45ef90c95b61b75d'
      });

      $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams, fromState, fromStateParams) {
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

      $rootScope.$on('eventResponse', function(event, message){
        showDialog(message);
      });

    }
    function configModal(){
      $ionicModal.fromTemplateUrl('app/templates/util/modal.response.template.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.controlModal = modal;
      });

    }

    function showDialog(obj) {
      $scope.message = obj.message;
      $scope.controlModal.show();
      $timeout.cancel(timeoutControl);
      timeoutControl = $timeout(function(){
        closeDialog();
      },2000);
    }

    function closeDialog() {
      $scope.controlModal.hide();
    }
    $scope.$on('$destroy', function() {
      $scope.controlModal.remove();
    });

    init();
  }
})();
