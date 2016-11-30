(function() {

  angular
    .module('entryPoint')
    .service('ProdutoService', produtoService);

  produtoService.$inject = ['$http', 'configurationUrl'];

  function produtoService($http, configurationUrl) {

    var url = configurationUrl.url;

    var exports = {
      listarProdutos: listarProdutos,
      criarItem: criarItem
    };

    return exports;


    function listarProdutos(nome) {
      // return $http.get(url + "/produto");
    var params = {
      nome: nome
    };
      return $http.get(url + '/produto/retornarProdutoPorNome',{params:params} );
      // return $http.get('app/mocks/produtos2.json');
    }
    function criarItem(params){
      return $http.post(url + "/item/cadastrarItem", params, {
        headers: {
          "Content-Type": "application/json"
        }
      });
    }



  }

})();
