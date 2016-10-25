(function(){

	angular
		.module('entryPoint')
		.controller('HomeController', homeController);

		homeController.$inject = ['$scope', '$state', '$ionicPopover', '$ionicLoading', 'Listas','AppValues', '$ionicModal', 'SupermercadoService'];

		function homeController($scope, $state, $ionicPopover, $ionicLoading, Listas, AppValues, $ionicModal, SupermercadoService){

			var vm = this;

			vm.openModal = openModal;
			vm.listarSupermercado = listarSupermercado;
			

			

			  
			function openModal(){
				$scope.modal.show();
				
			}

			function listarSupermercado(cepDigitado){


				var params = {
					cep : cepDigitado
				}
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

				$ionicModal.fromTemplateUrl('app/templates/modal.html', {
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
			}

			init();


			
		}

})();