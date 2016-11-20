(function(){

	angular
		.module('entryPoint')
		.controller('ProdutoController', produtoController);

		produtoController.$inject = ['$scope', '$state', '$stateParams', '$ionicPopover', '$ionicModal', '$ionicLoading', 'Listas','AppValues', 'SupermercadoService', 'ProdutoService'];

		function produtoController($scope, $state, $stateParams, $ionicPopover,  $ionicModal, $ionicLoading, Listas, AppValues, SupermercadoService, ProdutoService){

			var vm = this;

			vm.openModal = openModal;
			vm.listarSupermercado = listarSupermercado;

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
				 configureModalAndLoading();
				 vm.hasSupermercadoSearched = AppValues.hasSupermercadoSearched;
				 vm.imgSup = "img/carre.jpg";
				 vm.supermercadoList = [{nome : 'Carrefour', url : 'img/carre.jpg'}];

				 vm.testeArr = [{nome: 'teste'},{nome: 'teste'},{nome: 'teste'},{nome: 'teste'},{nome: 'teste'},{nome: 'teste'},{nome: 'teste'},{nome: 'teste'}];

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
