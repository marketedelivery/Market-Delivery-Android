(function() {
  angular
    .module("entryPoint")
    .controller("LoginController", loginController);

  loginController.$inject = ['$scope', '$state', '$rootScope', '$openFB', 'Constants', '$http', '$ionicModal', 'UsuarioService'];

  function loginController($scope, $state, $rootScope, $openFB, Constants, $http, $ionicModal, UsuarioService) {
    var vm = this;

    vm.isShowForm = false;
    vm.showForm = showForm;
    vm.login = login;
    vm.fBLogin = fBLogin;
    vm.openModal = openModal;
    vm.cancelar = cancelar;
    vm.cadastrarUsuario = cadastrarUsuario;

    function showForm() {
      vm.isShowForm = !vm.isShowForm;
    }

    function login() {

      UsuarioService.login(vm.usuarioNm.email, vm.usuarioNm.senha).then(
        function success(response) {
          var usuario = response.data;
          if (usuario) {
            $rootScope.$broadcast("login", {
              loginType: Constants.NM_LOGIN,
              usuario: usuario
            });
          } else {
            console.log('Usuário não encontrado');
          }

          // if (usuarios[0]) {
          //   var usuario = usuarios.filter(function(usu) {
          //     return usu.Email === vm.usuarioNm.email && usu.Senha === vm.usuarioNm.senha;
          //   })[0];
          //   if (usuario) {
          //     $rootScope.$broadcast("login", {
          //         loginType: Constants.NM_LOGIN,
          //         usuario: usuario
          //     });
          //   } else {
          //     console.log('Usuário não encontrado');
          //   }
          // }
        },
        function error(error) {
          console.log(error);
        }
      );
      // $rootScope.$broadcast("login", {
      // 	loginType: Constants.NM_LOGIN
      // });
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
