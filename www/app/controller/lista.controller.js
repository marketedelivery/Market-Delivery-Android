(function() {

    angular
        .module('entryPoint')
        .controller('ListaController', listaController);

    listaController.$inject = ['$scope', '$ionicModal', '$state', '$stateParams', 'ionicMaterialInk', 'ionicMaterialMotion'];

    function listaController($scope, $ionicModal, $state, $stateParams, ionicMaterialInk, ionicMaterialMotion) {

        var vm = this;

        // vm.openModal = openModal;
        vm.adicionarLista = adicionarLista;

        // function openModal(){
        // 	$scope.modal.show();
        // }

        function adicionarLista() {

            $state.go('app.listaform');
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
            vm.listas = [{
                nomeLista: "Lista 01",
                dataCriacao: new Date()
            }, {
                nomeLista: "Lista 02",
                dataCriacao: new Date()
            }, {
                nomeLista: "Lista 03",
                dataCriacao: new Date()
            }];
            if ($stateParams.supermercadoObj) {
                vm.listas.push($stateParams.supermercadoObj);

            }
            configureModal();
        }

        init();



    }

})();