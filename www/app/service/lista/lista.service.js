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
      getUsuario: getUsuario,
      pesquisarListaPorId: pesquisarListaPorId,
      buscarItemPorLista: buscarItemPorLista,
      consultarProdutoPorId: consultarProdutoPorId
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
      var params = {codigo: usuarioId};
      return $http.get(url + "/listaCompras/consultarListasComprasPorUsuario",{params: params});
    }

    function getUsuario(){
      return $http.get(url + "/usuario/pesquisarUsuarioPorId/27");
    }

    function buscarItemPorLista(listaId){
      var params = {codigo: listaId};
      return $http.get(url + "/item/consultarItensPorLista",{params: params});
    }
    function pesquisarListaPorId(listaId){
      var params = {codigo: listaId};
      return $http.get(url + "/listaCompras/pesquisarListaPorId",{params: params});
    }
    function consultarProdutoPorId(produtoId){
      return $http.get("http://localhost:8080/Carrefour_WS/rest/produto/carrefour/consultarProdutoPorId/" + produtoId);
    }



  }

})();
