(function() {

    angular
        .module('entryPoint')
        .service('SupermercadoService', supermercadoService);

    supermercadoService.$inject = ['$http', 'configurationUrl', '$q'];

    function supermercadoService($http, configurationUrl, $q) {

        var url = configurationUrl.url + '/supermercados';

        var exports = {
            listarSupermercado: listarSupermercado
        };

        return exports;

        function listarSupermercado(params) {

            // return $http.get(url, params);
            return $http.get("app/mocks/supermercados.json");

        }



    }

})();