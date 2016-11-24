(function() {

  angular
    .module('entryPoint')
    .controller('ListaController', listaController);

  listaController.$inject = ['$scope', '$state', '$stateParams', 'ListaComprasService', '$ionicModal', 'UtilFactory', '$ionicBackdrop', '$filter'];

  function listaController($scope, $state, $stateParams, ListaComprasService, $ionicModal, UtilFactory, $ionicBackdrop, $filter) {

    var vm = this;

    vm.listaCompras = listaCompras;
    vm.hasList = false;
    vm.showempty = false;
    vm.cancelar = cancelar;
    vm.criarLista = criarLista;
    vm.openModal = openModal;
    vm.goTo = goTo;
    vm.novaMod = {};
    vm.detalheMod = {};


    function configureModal() {

      $ionicModal.fromTemplateUrl('app/templates/lista/lista.modal.template.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.novaMod = modal;
      });
      $scope.$on('$destroy', function() {
        vm.novaMod.remove();
      });


    }

    function configModal() {
      $ionicModal.fromTemplateUrl('app/templates/lista/lista.detalhe.template.html', {
        scope: $scope,
        animation: 'fade-in-left'
      }).then(function(modal) {
        vm.detalheMod = modal;
      });
      $scope.$on('$destroy', function() {
        vm.detalheMod.remove();
      });
    }


    function listaCompras() {
      var storage = UtilFactory.getUsuarioStorage();
      var usuarioId = (storage.usuario && storage.usuario.codigo) ? storage.usuario.codigo : 0;
      ListaComprasService.listaCompras(storage.usuario).then(
        function success(response) {
          if (response.data) {
            if (angular.isArray(response.data) && response.data.length > 0) {
              vm.hasList = true;
              vm.showempty = false;
              vm.listas = response.data;

            } else {
              vm.hasList = false;
              vm.showempty = true;
              vm.emptyLista = "Nenhuma Lista Encontrada";
              vm.listas = [];
            }
          }

        },
        function error(error) {
          vm.hasList = false;
          vm.emptyLista = "Nenhuma Lista Encontrada";

        });
    }

    function criarLista() {

      if (vm.nomeLista && vm.tipo) {

        vm.isEditMode = true;
        UtilFactory.showLoad();
        var storage = UtilFactory.getUsuarioStorage();
        if (storage.usuario && storage.usuario.codigo) {
          // var params = {
          //   nome: vm.nomeLista,
          //   tipo: vm.tipo,
          //   dataCriacao: $filter('date')(new Date(), 'yyyy-mm-dd'),
          //   qtd: 0,
          //   usuario: {
          //     codigo: storage.usuario.codigo
          //   }
          // };
          // ListaComprasService.criarListaCompras(params).then(
          //   function success(response) {
          //     if (response.data) {
          //       vm.listas.push(response.data);
          //       vm.nomeLista = "";
          //       cancelar();
          //     }
          //     UtilFactory.hideLoad();
          //   },
          //   function error(response) {
          //     UtilFactory.hideLoad();
          //   });
          var params = {
            nome: vm.nomeLista,
            tipo: vm.tipo,
            dataCriacao: $filter('date')(new Date(), 'yyyy-mm-dd'),
            qtd: 0,
            usuario: {
              codigo: storage.usuario.codigo
            }
          };
          UtilFactory.hideLoad();
          cancelar(vm.novaMod);
          vm.listas.push(params);

        }

      }
    }


    function goTo(lista) {
      $state.go('app.tab.detalhe', {
        lista: lista
      });

    }

    function openModal(modal, lista) {
      vm.lista = lista;
      modal.show();
    }

    function cancelar(modal) {
      modal.hide();
    }
    $scope.$on('$destroy', function() {
      modal.remove();
    });

    function init() {
      configureModal();
      configModal();
      listaCompras();

    }

    init();

  }

})();
