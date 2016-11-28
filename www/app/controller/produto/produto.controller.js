(function(){

	angular
		.module('entryPoint')
		.controller('ProdutoController', produtoController);

		produtoController.$inject = ['$scope', '$state', '$stateParams', '$ionicPopover', '$ionicModal', '$ionicLoading', 'Listas','AppValues', 'SupermercadoService', 'ProdutoService'];

		function produtoController($scope, $state, $stateParams, $ionicPopover,  $ionicModal, $ionicLoading, Listas, AppValues, SupermercadoService, ProdutoService){

			var vm = this;

			vm.openModal = openModal;
			vm.listarSupermercado = listarSupermercado;
			vm.noResultProd = true;
			vm.listarProdutos = listarProdutos;
			vm.atualizaPagina = atualizaPagina;
			vm.mudarQuantidade = mudarQuantidade;


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
				$scope.show = function() {
			    $ionicLoading.show({
			      template: 'Carregando...',
			      duration: 30000
			    }).then(function(){
			       console.log("The loading indicator is now displayed");
			    });
			  };
			  $scope.hide = function(){
			    $ionicLoading.hide().then(function(){
			       console.log("The loading indicator is now hidden");
			    });
			  };

			}
			function init(){
				//  configureModalAndLoading();
				vm.produtos = [];
				vm.listas = Listas.listasCompras;
				 vm.hasSupermercadoSearched = AppValues.hasSupermercadoSearched;
				 vm.imgSup = "img/carre.jpg";
				 vm.supermercadoList = [{nome : 'Carrefour', url : 'img/carre.jpg'}];
				 vm.lista = $stateParams.lista;
	 			if (vm.lista) {}
			}
			function listarProdutos(nome){
				ProdutoService.listarProdutos(nome).then(
	 				function success(response) {
	 					if (Array.isArray(response.data) && response.data.length > 0) {
							convertProdutos(response.data);
							pageConfig(response.data.length);

	 						vm.produtos = response.data;

							vm.noResultProd = false;
	 					} else {
							vm.noResultProd = true;
	 						vm.produtos = [];
	 					}
	 				},
	 				function error(error) {
						vm.noResultProd = true;
					});
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
					if(angular.isString(produto.image)){
						produto.image = produto.image.replace('C:\\ImagemMarketeDelivery\\imagens produtos', "img");
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



		}

})();
