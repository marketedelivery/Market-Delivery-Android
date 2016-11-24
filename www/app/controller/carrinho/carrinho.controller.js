(function() {

	angular
		.module('entryPoint')
		.controller('CarrinhoController', carrinhoController);

	carrinhoController.$inject = ['$scope', '$state', '$ionicHistory'];

	function carrinhoController($scope, $state, $ionicHistory) {

		var vm = this;
		vm.noResult = true;
		function goBack() {
			$ionicHistory.goBack();
		}



	}

})();
