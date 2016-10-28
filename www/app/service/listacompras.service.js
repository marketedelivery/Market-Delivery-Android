(function(){

	angular
        .module('entryPoint')
        .service('ListaComprasService', listacomprasService);

        listacomprasService.$inject = ['$http', 'configurationUrl'];

        function listacomprasService($http, configurationUrl ){

        var url = configurationUrl.url;

        var exports = {
            criarListaCompras: criarListaCompras,
            listaCompras: listaCompras
        };

        return exports;

        function criarListaCompras(params){
            return $http.post(url + "/criarlistacompras", params, {
                headres : {
                    "Content-Type": "application/json"
            }
        });
        }

        function listaCompras(){
            return $http.get(url + "/listacompras");
        }



        }

})();