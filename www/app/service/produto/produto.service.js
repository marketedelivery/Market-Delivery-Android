(function() {

  angular
    .module('entryPoint')
    .service('ProdutoService', produtoService);

  produtoService.$inject = ['$http', 'configurationUrl'];

  function produtoService($http, configurationUrl) {

    var url = configurationUrl.url;

    var exports = {
      listarProdutos: listarProdutos
    };

    return exports;

    function criarListaCompras(params) {
      return $http.post(url + "/criarlistacompras", params, {
        headres: {
          "Content-Type": "application/json"
        }
      });
    }

    function listarProdutos(nome) {
      // return $http.get(url + "/produto");
      return $http.get(url + '/produto/pesquisarProdutoPorNome/' +nome);
      // return $http.get('app/mocks/produtos.json');
    }



  }

})();
