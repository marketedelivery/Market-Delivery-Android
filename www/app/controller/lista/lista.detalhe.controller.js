(function() {

	angular
		.module('entryPoint')
		.controller('ListaFormController', listaformController);

	listaformController.$inject = ['$scope', '$ionicModal', '$state', 'SupermercadoService', 'ListaComprasService', '$stateParams', 'ProdutoService', '$ionicHistory'];

	function listaformController($scope, $ionicModal, $state, SupermercadoService, ListaComprasService, $stateParams, ProdutoService, $ionicHistory) {

		var vm = this;
		vm.goBack = goBack;
		vm.atualizarLista = atualizarLista;

		function goBack() {
			$state.go("app.tab.minhalista");
		}

		function atualizarLista() {

			if (vm.nomeLista) {

				var params = {
					codigoSupermercado: 1,
					nomeLista: vm.nomeLista

				};

				vm.isEditMode = true;
				UtilFactory.showLoad();
				ListaComprasService.atualizarListaCompras(params).then(
					function success(response) {

						if (response.data) {

							listaCompras();
						} 

						UtilFactory.hideLoad();

					},
					function error(response) {
						UtilFactory.hideLoad();

					});

			}
		}

		function init() {
			vm.lista = $stateParams.lista;
			if (vm.lista) {}
			ProdutoService.listarProdutos().then(
				function success(response) {
					if (response.data) {
						vm.produtos = response.data;
					} else {
						vm.produtos = [];
					}
				},
				function error(error) {});
		}
		init();
	}

})();
