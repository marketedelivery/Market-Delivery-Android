(function() {

  angular
    .module('entryPoint')
    .factory('UtilFactory', utilFactory);

  utilFactory.$inject = ['$http', 'configurationUrl', '$ionicLoading'];

  function utilFactory($http, configurationUrl, $ionicLoading) {

    var url = configurationUrl.url;
    var usuarioRules;

    var exports = {
      showLoad: showLoad,
      hideLoad: hideLoad,
      getUsuarioStorage: getUsuarioStorage,
      setUsuarioStorage: setUsuarioStorage,
      removeUsuarioStorage: removeUsuarioStorage
    };

    return exports;


    function showLoad() {
      $ionicLoading.show({
        template: 'Loading...',
        duration: 30000
      }).then(function() {
        console.log("The loading indicator is now displayed");
      });
    }

    function hideLoad() {
      $ionicLoading.hide().then(function() {
        console.log("The loading indicator is now hidden");
      });
    }

    function getUsuarioStorage(){
      //return window.localStorage.getItem('usuarioRules');
      return usuarioRules;
    }
    function setUsuarioStorage(objeto){
      usuarioRules = objeto;
      //var localStorage = window.localStorage;
      //localStorage.setItem('usuarioRules', objeto);
    }
    function removeUsuarioStorage(){
      usuarioRules = undefined;
      var localStorage = window.localStorage;
      var sessionStorage = window.sessionStorage;
      localStorage.clear();
      sessionStorage.clear();
      //localStorage.removeItem('usuarioRules');
      //localStorage.removeItem('fbId');
      //sessionStorage.removeItem('fbtoken');
    }



  }

})();
