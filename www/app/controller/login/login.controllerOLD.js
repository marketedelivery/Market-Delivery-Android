(function() {
  angular
    .module("entryPoint")
    .controller("LoginController", loginController);

  loginController.$inject = ['$scope', '$state', '$rootScope', '$openFB', 'Constants', '$http', '$ionicModal'];

  function loginController($scope, $state, $rootScope, $openFB, Constants, $http, $ionicModal) {
    var vm = this;

    vm.isShowForm = false;
    vm.showForm = showForm;
    vm.login = login;
    vm.fBLogin = fBLogin;
    vm.openModal = openModal;
    vm.cancelar = cancelar;

    vm.testews = {};



    function showForm() {
      vm.isShowForm = !vm.isShowForm;
    }



    function login(user, password) {
      $rootScope.$broadcast("login", {
        loginType: Constants.NM_LOGIN
      });


    }

    function fBLogin() {
      $openFB.login({
          scope: 'email,user_friends'
        })
        .then(function(token) {
          console.log(token);
          $openFB.api({
              path: '/me'
            })
            .then(function(user) {
                vm.user = user;
                console.log(user);
                $rootScope.$broadcast("login", {
                  loginType: Constants.FB_LOGIN,
                  fbId: user.id
                });

              },
              function(err) {
                alert('Facebook error: ' + err);
              });

        }, function(err) {
          console.log(err);
        });



    }
    function openModal(){
      $scope.modal.show();
    }
    function cancelar(){
      $scope.modal.hide();
    }

    function configureModal() {

      $ionicModal.fromTemplateUrl('app/templates/login/usuario.modal.template.html', {
        scope: $scope,
        animation: 'fade-in-left'
      }).then(function(modal) {
        $scope.modal = modal;
      });


    }

    function init() {
      var storage = window.localStorage;
      var fbId = storage.getItem('fbId');
      configureModal();


    }

    init();

  }

})();
