(function(){

	angular
        .module('entryPoint')
        .service('ListaComprasService', listacomprasService);

        listacomprasService.$inject = ['$http', 'configurationUrl'];

        function listacomprasService($http, configurationUrl ){

        var url = configurationUrl.url + '/listacompras';

        var exports = {
            criarListaCompras: criarListaCompras
        };

        return exports;

        function criarListaCompras(params){
        	// return $http.get('/supermercados');
        	// return $http.get(url);
            // return $http.post();
            return $http.get('app/mocks/supermercados.json');


        }



        }

})();