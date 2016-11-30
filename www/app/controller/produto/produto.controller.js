(function(){

	angular
		.module('entryPoint')
		.controller('ProdutoController', produtoController);

		produtoController.$inject = ['$scope', '$rootScope','$state', '$stateParams', '$ionicPopover', '$ionicModal', '$ionicLoading', 'Listas','AppValues', 'SupermercadoService', 'ProdutoService', 'UtilFactory', 'ListaComprasService'];

		function produtoController($scope, $rootScope, $state, $stateParams, $ionicPopover,  $ionicModal, $ionicLoading, Listas, AppValues, SupermercadoService, ProdutoService, UtilFactory, ListaComprasService){

			var vm = this;

			vm.openModal = openModal;
			vm.listarSupermercado = listarSupermercado;
			vm.noResultProd = true;
			vm.listarProdutos = listarProdutos;
			vm.atualizaPagina = atualizaPagina;
			vm.mudarQuantidade = mudarQuantidade;
			vm.criarItem = criarItem;


			function openModal(){
				$scope.modal.show();

			}

			function listarSupermercado(cepDigitado){
				var params = {
					cep : cepDigitado
				};
				var isValid = validaParams(params);
				$scope.show();
				if(isValid){
					SupermercadoService.listarSupermercado(params)
					.then(
						function success(response){

							if(response && response.data){
								//

								vm.supermercadoList = response.data;

							}else{

								vm.supermercadoList = [];
							}
							$scope.hide();

						},
						function error(error){
							console.log(error);
							$scope.hide();

						});
				}

			}

			function validaParams(params){
				var isValid = false;
				if(params.cep){
					isValid = true;
				}
				return isValid;
			}

			function configureModalAndLoading(){
				$ionicModal.fromTemplateUrl('app/templates/produto/modal.html', {
			    scope: $scope
			  }).then(function(modal) {
			    $scope.modal = modal;

			  });

			}
			function init(){
				vm.produtos = [];
				listaCompras();

			}
			function listarProdutos(nome){
				UtilFactory.showLoad($rootScope);
				ProdutoService.listarProdutos(nome).then(
	 				function success(response) {
						UtilFactory.hideLoad(successResponse, response);
	 				},
	 				function error(error) {
						vm.noResultProd = true;
						UtilFactory.hideLoad();
					});
			}

			function successResponse(response){
				if (Array.isArray(response.data) && response.data.length > 0) {
					convertProdutos(response.data);
					pageConfig(response.data.length);

					vm.produtos = response.data;

					vm.noResultProd = false;
				} else {
					vm.noResultProd = true;
					vm.produtos = [];
				}
			}
			function pageConfig(totalRegistros){
				vm.totalRegistros = totalRegistros;
				vm.quantidadeRegPagina = totalRegistros < 10 ? totalRegistros : 10;
				var totalRegDiv = totalRegistros / 10;
				var truncReg = Math.trunc(totalRegDiv);
				vm.totalDezenas = truncReg === 0 ? 1 : truncReg;
				vm.paginaAtual = 1;
			}
			function atualizaPagina(){
				if(vm.paginaAtual === vm.totalDezenas){
					vm.quantidadeRegPagina = vm.totalRegistros - vm.totalDezenas * 10;
				}
				vm.paginaAtual++;
			}
			function convertProdutos(produtos){

				angular.forEach(produtos, function(produto){
					if(angular.isString(produto.imagem)){
						produto.imagem = produto.imagem.replace('C:\\ImagemMarketeDelivery\\imagens produtos', "img");
					}
					produto.quantidade = 0;
				});

			}
			function mudarQuantidade(produto, quantidade){
				produto.quantidade += quantidade;
				if(produto.quantidade === -1){
					produto.quantidade = 0;
				}

			}

			init();

			function listaCompras() {
	      var storage = UtilFactory.getUsuarioStorage();
	      var usuarioId = (storage.usuario && storage.usuario.codigo) ? storage.usuario.codigo : 0;
	      ListaComprasService.listaCompras(usuarioId).then(
	        function success(response) {
	          if (response.data) {
	            if (angular.isArray(response.data) && response.data.length > 0) {
	              vm.listas = response.data;
	            } else {
	              vm.listas = [];
	            }
	          }

	        },
	        function error(error) {

	        });

		}
		function criarItem(produto){
			var userStorage = UtilFactory.getUsuarioStorage();
			var usuario = userStorage.usuario;
			if(usuario && usuario.codigo && produto){
				var item = {
					"lista": {
						"codigo": vm.listaSelecionada,
						"usuario": {
							"codigo": usuario.codigo
						}
					},
					"precoTotal": 0,
					"produto": {
						"codigo": produto.codigo
					},
					"qtdProduto": produto.quantidade
				};
				ProdutoService.criarItem(item).then(
					function success(response){
						console.log('success');
					},
					function error(error){
						console.log('error');
					}
				);
			}

		}
	}

})();
