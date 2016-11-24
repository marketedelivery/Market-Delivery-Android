(function() {

  angular
    .module('entryPoint')
    .service('UsuarioService', usuarioService);

  usuarioService.$inject = ['$http', 'configurationUrl'];

  function usuarioService($http, configurationUrl) {

    var url = configurationUrl.url;

    var exports = {
      cadastrarUsuario: cadastrarUsuario,
      login: login
    };

    return exports;

    function cadastrarUsuario(params) {

        return $http.post(url + "/usuario/cadastrarUsuario", params, {
          headers: {
            "Content-Type": "application/json"
          }
        });

    }
    function login(email, senha){
      var params = {email:email,senha:senha};
      return $http.get(url + "/usuario/efetuarLogin", {params:params});
      // return $http.get("app/mocks/usuarios.json");
    }

  }

})();
