(function() {
  angular
    .module("entryPoint")
    .controller("LoginController", loginController);

  loginController.$inject = ['$scope', '$state', '$rootScope', '$openFB', 'Constants', '$http', '$ionicModal', 'UsuarioService', '$cordovaToast', 'UtilFactory', '$timeout', 'configurationUrl'];

  function loginController($scope, $state, $rootScope, $openFB, Constants, $http, $ionicModal, UsuarioService, $cordovaToast, UtilFactory, $timeout, configurationUrl) {
    var vm = this;

    vm.isShowForm = false;
    vm.showForm = showForm;
    vm.login = login;
    vm.fBLogin = fBLogin;
    vm.openModal = openModal;
    vm.cancelar = cancelar;
    vm.cadastrarUsuario = cadastrarUsuario;
    vm.testeLoad = testeLoad;
    vm.hideLoad = hideLoad;
    vm.changeUrl = changeUrl;

    function testeLoad(){
      UtilFactory.showLoad($rootScope);
    }
    function changeUrl(){

      $rootScope.$broadcast("changeurl", {
        url: vm.url
      });

    }
    function hideLoad(){
      UtilFactory.hideLoad();
    }

    function showForm() {
      vm.isShowForm = !vm.isShowForm;
    }

    function login() {
      UtilFactory.showLoad($rootScope);
      UsuarioService.login(vm.usuarioNm.email, vm.usuarioNm.senha).then(
        function success(response) {
          var usuario = response.data;
          if (usuario && usuario.codigo === null) {
            $rootScope.$broadcast("login", {
              loginType: Constants.NM_LOGIN,
              usuario: usuario
            });
            UtilFactory.hideLoad();
          } else {
            UtilFactory.hideLoad();
            UtilFactory.showDialog($rootScope, {message:'Usuário ou Senha inválidos'});

          }

        },
        function error(error) {

        }
      );

    }

    function fBLogin() {
      $openFB.login({
          scope: 'email,user_friends'
        })
        .then(function(token) {
          console.log(token);
          $rootScope.$broadcast("login", {
            loginType: Constants.FB_LOGIN,
            usuario: {}
          });
        }, function(err) {});

    }

    function openModal() {
      $scope.modal.show();
    }

    function cancelar() {
      $scope.modal.hide();
    }
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    function cadastrarUsuario() {

      UsuarioService.cadastrarUsuario(vm.usuario).then(
        function success(response) {
          console.log(response);
        },
        function error(error) {

        }
      );

    }

    function configModal() {
      $ionicModal.fromTemplateUrl('app/templates/login/usuario.template.html', {
        scope: $scope,
        animation: 'fade-in-left'
      }).then(function(modal) {
        $scope.modal = modal;
      });
    }

    function init() {
      configModal();
      vm.usuario = {};
      vm.usuarioNm = {};
    }

    init();

  }

})();
