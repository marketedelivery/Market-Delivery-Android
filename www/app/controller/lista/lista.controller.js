(function() {

  angular
    .module('entryPoint')
    .controller('ListaController', listaController);

  listaController.$inject = ['$scope', '$rootScope','$state', '$stateParams', 'ListaComprasService', '$ionicModal', 'UtilFactory', '$ionicBackdrop', '$filter', 'Listas'];

  function listaController($scope, $rootScope, $state, $stateParams, ListaComprasService, $ionicModal, UtilFactory, $ionicBackdrop, $filter, Listas) {

    var vm = this;


    vm.listaCompras = listaCompras;
    vm.noLista = true;
    vm.closeModal = closeModal;
    vm.criarLista = criarLista;
    vm.openModal = openModal;
    vm.goTo = goTo;
    vm.novaMod = {};
    vm.detalheMod = {};
    vm.enviarCarrinho = enviarCarrinho;
    vm.selecionarSupermercado = selecionarSupermercado;


    function enviarCarrinho(){
      Listas.listaCarrinho = vm.lista;
      Listas.supermercadoCarrinho = vm.supermercadoSelecionado;
      closeModal(vm.superMod);
      closeModal(vm.detalheMod);
      angular.forEach(vm.lista.produtos, function(itemArr){
        ListaComprasService.consultarProdutoPorId(itemArr.codigo).then(
          function success(response){

          },
          function error(error){
            console.log(error);
          }
        );
      });
      // $rootScope.$broadcast("carrinho", {
      // });
    }
    function configNovaListaModal() {

      $ionicModal.fromTemplateUrl('app/templates/lista/new.list.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.novaMod = modal;
      });
      $scope.$on('$destroy', function() {
        vm.novaMod.remove();
      });


    }
    function configSupermercadoModal() {

      $ionicModal.fromTemplateUrl('app/templates/lista/supermercado.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.superMod = modal;
      });
      $scope.$on('$destroy', function() {
        vm.superMod.remove();
      });


    }

    function configDetalheModal() {
      $ionicModal.fromTemplateUrl('app/templates/lista/detail.list.html', {
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

      ListaComprasService.listaCompras(usuarioId).then(
        function success(response) {
          if (response.data) {
            if (angular.isArray(response.data) && response.data.length > 0) {
              vm.noLista = false;
              vm.listas = response.data;

            } else {
              vm.noLista = true;
              vm.emptyLista = "Nenhuma Lista Encontrada";
              vm.listas = [];
            }
          }

        },
        function error(error) {
          vm.hasList = false;
          vm.emptyLista = "Nenhuam Lista Encontrada";

        });
    }

    function criarLista() {

      if (vm.lista.nome && vm.lista.tipo) {

        vm.lista.produtos = [];
        UtilFactory.showLoad($rootScope);
        var storage = UtilFactory.getUsuarioStorage();

        if (storage.usuario && (storage.usuario.codigo || storage.usuario.id) ) {
          vm.lista.tipo = "Mensal";
          var params = {
            nome: vm.lista.nome,
            tipo: vm.lista.tipo,
            dataCriacao: new Date(),
            qtd: 0,
            usuario: {
              codigo: storage.usuario.codigo
            }
          };
          UtilFactory.showLoad($rootScope);
          ListaComprasService.criarListaCompras(params).then(
            function success(response) {
              UtilFactory.hideLoad(successResponse, response);
            },
            function error(response) {
              UtilFactory.hideLoad();
            });
        }



      }
    }
    function successResponse(response){

      vm.nomeLista = "";
      listaCompras();
      closeModal(vm.novaMod);
    }

    function goTo(lista) {
      $state.go('app.tab.detalhe', {
        lista: lista
      });

    }

    function openModal(modal, lista) {
      vm.lista = lista;
      if(lista && lista.codigo){
      listarProdutos(lista.codigo);
      }
      modal.show();
    }

    function closeModal(modal) {
      modal.hide();
    }

    function selecionarSupermercado(){
      vm.superMod.show();
    }

    function init() {
      //MOCK
      // Listas.listasCompras = [];
      //MOCK - end
      vm.listas = [];
      vm.lista = {};
      vm.supermercados = Listas.superMercadoList;
      configNovaListaModal();
      configDetalheModal();
      configSupermercadoModal();
      listaCompras();


    }
    function listarProdutos(listaId){
      ListaComprasService.buscarItemPorLista(listaId).then(
        function success(response){
        treatImage(response.data);
        vm.lista.produtos = response.data;
      },
    function error(error){
      console.log(error);
    });
    }

    function treatImage(produtosArr){
      angular.forEach(produtosArr, function(item){
        if(item.produto && angular.isString(item.produto.imagem)){
          item.produto.imagem = item.produto.imagem.replace('/images', 'img');
        }
      });
    }


    init();

  }

})();
