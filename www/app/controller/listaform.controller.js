(function() {

    angular
        .module('entryPoint')
        .controller('ListaFormController', listaformController);

    listaformController.$inject = ['$scope', '$ionicModal', '$state', 'SupermercadoService', 'ListaComprasService', '$stateParams'];

    function listaformController($scope, $ionicModal, $state, SupermercadoService, ListaComprasService, $stateParams) {

        var vm = this;
        vm.selectSupermercado = selectSupermercado;
        vm.voltar = voltar;
        vm.criarLista = criarLista;


        function voltar() {
            $state.go('app.lista');
        }

        function listarSupermercados() {

            SupermercadoService.listarSupermercado().then(
                function success(response) {
                    if (response && response.data) {
                        vm.supermercadosList = response.data.supermercados;

                    }

                },
                function error(error) {
                    console.log(error);
                });
        }

        function selectSupermercado(supermercado) {
            angular.forEach(vm.supermercadosList, function(item) {
                item.selected = false;
            });

            supermercado.selected = true;


        }

        function criarLista() {

            var supermercado = vm.supermercadosList.filter(function(item) {
                return item.selected === true;
            })[0];

            if (vm.nomeLista && vm.nomeLista !== '' && supermercado) {

                var params = {
                    codigoSupermercado: supermercado.id,
                    nomeLista: vm.nomeLista

                };

                vm.isEditMode = true;

                ListaComprasService.criarListaCompras(params).then(
                    function success(response) {

                        if (response.data) {

                            vm.listacompra = convertLista(response.data.supermercados, params);
                        } else {
                            vm.listacompra = {};
                        }

                    },
                    function error(response) {


                    });

                // $state.go('app.lista', {supermercadoObj : supermercadoSaved} );



            }



        }

        function convertLista(lista, params) {

            var listaConverted = [];

            if (Array.isArray(lista)) {

                if (params) {

                    listaConverted = lista.filter(function(item) {
                        return item.id === params.codigoSupermercado;
                    });
                }
            }

            return listaConverted[0];

        }


        function init() {

            vm.supermercadosList = [];
            listarSupermercados();
            vm.isEditMode = $stateParams.isEditMode;



        }

        init();



    }

})();