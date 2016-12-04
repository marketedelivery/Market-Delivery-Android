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
    vm.closeModal = closeModal;
    vm.cadastrarUsuario = cadastrarUsuario;
    vm.changeUrl = changeUrl;

    var URL_NEW_MODAL = 'app/templates/login/new.user.html';
    var URL_EXIST_MODAL = 'app/templates/login/existent.user.html';

    
    function login() {
      UtilFactory.showLoad($rootScope);
      UsuarioService.login(vm.usuarioNm.email, vm.usuarioNm.senha).then(
        function success(response) {
          var usuario = response.data;
          if (usuario && usuario.codigo) {
            UtilFactory.hideLoad(gologin, usuario);
          } else {
            UtilFactory.hideLoad(showResult);

          }

        },
        function error(error) {

        }
      );

    }
    function gologin(usuario){
      closeModal(vm.existentUserModal);
      $rootScope.$broadcast("login", {
        loginType: Constants.NM_LOGIN,
        usuario: usuario
      });
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

    function showResult(){
      UtilFactory.showDialog($rootScope, {message:'Usuário ou Senha inválidos'});
    }

    function cadastrarUsuario() {
      UtilFactory.showLoad($rootScope);
      UsuarioService.cadastrarUsuario(vm.usuario).then(
        function success(response) {
          UtilFactory.hideLoad(function(){
              UtilFactory.showDialog($rootScope, {message:'Cadastrado com sucesso'});    
          });
        },
        function error(error) {
          UtilFactory.hideLoad(function(){
              UtilFactory.showDialog($rootScope, {message:'Erro ao cadastrar'});  
          });
        }
      );

    }

    

    function init() {
  
      configModal(URL_NEW_MODAL, 'newUserModal', 'fade-in-left');
      configModal(URL_EXIST_MODAL, 'existentUserModal', 'slide-in-up');
      vm.usuario = {};
      vm.usuarioNm = {};
    }

    function configModal(url, modalControllerName, animation) {
      $ionicModal.fromTemplateUrl(url, {
        scope: $scope,
        animation: animation
      }).then(function(modal) {
        vm[modalControllerName] = modal;
      });
      $scope.$on('$destroy', function() {
      modalObj.remove();
    });
    }

    function openModal(modalObj) {
      modalObj.show();
    }

    function closeModal(modalObj) {
      modalObj.hide();
    }

    function changeUrl(){

      $rootScope.$broadcast("changeurl", {
        url: vm.url
      });

    }

    function showForm() {
      vm.isShowForm = !vm.isShowForm;
    }

    init();

  }

})();
