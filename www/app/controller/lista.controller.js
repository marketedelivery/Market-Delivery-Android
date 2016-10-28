(function() {

    angular
        .module('entryPoint')
        .controller('ListaController', listaController);

    listaController.$inject = ['$scope', '$ionicModal', '$state', '$stateParams', 'ionicMaterialInk', 'ionicMaterialMotion', 'ListaComprasService'];

    function listaController($scope, $ionicModal, $state, $stateParams, ionicMaterialInk, ionicMaterialMotion, ListaComprasService) {

        var vm = this;

        vm.openModal = openModal;
        vm.criarLista = criarLista;
        vm.listaCompras = listaCompras;

        function openModal(){
        	$scope.modal.show();
        }

        function criarLista(){
            if(vm.formLista.nomeLista.$valid){
                var params = {
                    codigoSupermercado : '1',
                    nome : vm.nomeLista
                };

                ListaComprasService.criarListaCompras(params).then(
                    function success(response){
                        if(response.data){
                            listaCompras();
                            $scope.modal.hide();
                            vm.nomeLista = "";

                        }

                },
                function error(error){

                });

            }
            
        }
        function listaCompras(){
            ListaComprasService.listaCompras().then(
                function success(response){
                    if(response.data){
                        vm.listas = response.data;
                    }

                },
                function error(error){

                });
        }

        function configureModal() {

            $ionicModal.fromTemplateUrl('app/templates/lista.modal.template.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.modal = modal;
            });

        }

        function goTo(id) {
            $state.go('app.listaform', {
                id: id
            });

        }

        function init() {
            // vm.listas = [{
            //     nomeLista: "Lista 01",
            //     dataCriacao: new Date()
            // }, {
            //     nomeLista: "Lista 02",
            //     dataCriacao: new Date()
            // }, {
            //     nomeLista: "Lista 03",
            //     dataCriacao: new Date()
            // }];
            listaCompras();
            if ($stateParams.supermercadoObj) {
                vm.listas.push($stateParams.supermercadoObj);

            }
            configureModal();
        }

        init();



    }

})();