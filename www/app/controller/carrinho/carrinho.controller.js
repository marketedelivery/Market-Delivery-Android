(function() {

	angular
		.module('entryPoint')
		.controller('CarrinhoController', carrinhoController);

	carrinhoController.$inject = ['$scope', '$state', '$ionicHistory'];

	function carrinhoController($scope, $state, $ionicHistory) {

		var vm = this;
		

		function goBack() {
			$ionicHistory.goBack();
		}



	}

})();
