(function(){
    angular
        .module("entryPoint")
        .controller("LoginController", loginController);

        loginController.$inject = ['$scope', '$state', '$rootScope', '$openFB', 'Constants', '$http'];

        function loginController($scope, $state, $rootScope, $openFB, Constants, $http){
            var vm = this;

            vm.isShowForm = false;
            vm.showForm = showForm;
            vm.login = login;
            vm.fBLogin = fBLogin;
            
            vm.testews = {};

            

            function showForm(){
                vm.isShowForm = !vm.isShowForm;
            }

            

            function login(user, password){

                
                if(user === "eu@eu.com" && password ==="1234"){
                    $rootScope.$broadcast("login", {loginType : Constants.NM_LOGIN});
                    
                }
                
            }

            function fBLogin(){
                $openFB.login({scope: 'email,user_friends'})
                .then(function( token ) {
                    console.log(token);
                    $rootScope.$broadcast("login", {loginType : Constants.FB_LOGIN});
                }, function( err ) {
                    console.log(err);
                });


        
            }
           function init(){




            }

            init();

        }

})();