(function() {

  angular
    .module('entryPoint')
    .factory('UtilFactory', utilFactory);

  utilFactory.$inject = ['$http', 'configurationUrl', '$ionicLoading', '$ionicModal', '$timeout'];

  function utilFactory($http, configurationUrl, $ionicLoading, $ionicModal, $timeout) {

    var url = configurationUrl.url;
    var usuarioRules;
    var controlModal={};
    var timeState={};

    var exports = {
      showLoad: showLoad,
      hideLoad: hideLoad,
      getUsuarioStorage: getUsuarioStorage,
      setUsuarioStorage: setUsuarioStorage,
      removeUsuarioStorage: removeUsuarioStorage,
      showDialog: showDialog
    };

    return exports;


    function showLoad(rootScope) {
      $ionicLoading.show({
        template: '<ion-spinner icon="spiral"></ion-spinner>',
        duration: 5000
      }).then(function() {
        console.log('loading...');
        $timeout.cancel(timeState);
        timeState = $timeout(function(){
          rootScope.$broadcast('eventResponse', {message: 'Problemas com a sua Conexão. Tente novamente mais tarde'});
        }, 5000);
      });
    }

    function hideLoad() {
      $timeout.cancel(timeState);
      $ionicLoading.hide().then(function() {
        console.log("The loading indicator is now hidden");
      });
    }
    // function timeoutControl(){
    //   showDialog('Problemas com a sua Conexão. Tente novamente mais tarde');
    // }

    function getUsuarioStorage() {
      //return window.localStorage.getItem('usuarioRules');
      return usuarioRules;
    }

    function setUsuarioStorage(objeto) {
      usuarioRules = objeto;
      //var localStorage = window.localStorage;
      //localStorage.setItem('usuarioRules', objeto);
    }

    function removeUsuarioStorage() {
      usuarioRules = undefined;
      var localStorage = window.localStorage;
      var sessionStorage = window.sessionStorage;
      localStorage.clear();
      sessionStorage.clear();
      //localStorage.removeItem('usuarioRules');
      //localStorage.removeItem('fbId');
      //sessionStorage.removeItem('fbtoken');
    }

    function showDialog(rootScope, message){
      rootScope.$broadcast('eventResponse',message);
    }

    // function configModal(scope){
    //   $ionicModal.fromTemplateUrl('app/templates/util/modal.response.template.html', {
    //     scope: scope,
    //     animation: 'slide-in-up'
    //   }).then(function(modal) {
    //     $scope.controlModal = modal;
    //   });
    //
    // }
    //
    // function showDialog(message) {
    //   $scope.controlModal.message = message;
    //   $scope.controlModal.show();
    //   $timeout(function(){
    //     closeDialog();
    //   },3000);
    // }
    //
    // function closeDialog() {
    //   $scope.controlModal.hide();
    // }

  }

})();
