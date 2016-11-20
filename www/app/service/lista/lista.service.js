(function() {

  angular
    .module('entryPoint')
    .service('ListaComprasService', listacomprasService);

  listacomprasService.$inject = ['$http', 'configurationUrl'];

  function listacomprasService($http, configurationUrl) {

    var url = configurationUrl.url;

    var exports = {
      criarListaCompras: criarListaCompras,
      listaCompras: listaCompras,
      getUsuario: getUsuario
    };

    return exports;

    function criarListaCompras(params) {
      return $http.post(url + "/listaCompras/cadastrarLista", params, {
        headers: {
          "Content-Type": "application/json"
        }
      });
    }

    function listaCompras(usuarioId) {
      // return $http.get(url + "/listaCompras/consultarListasComprasPorUsuario/"+ usuarioId);
      return $http.get(url + "/listaCompras/consultarTodasListas");
    }

    function getUsuario(){
      return $http.get(url + "/usuario/pesquisarUsuarioPorId/27");
    }



  }

})();
