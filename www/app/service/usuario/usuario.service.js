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
      try{
        return $http.post(url + "/usuario/cadastrarUsuario", params, {
          headers: {
            "Content-Type": "application/json"
          }
        });
      }catch(e){
        console.log(e);
      }
    }
    function login(email, senha){
      return $http.get(url + "/usuario/efetuarLogin/" + email + ", " + senha);
      // return $http.get("app/mocks/usuarios.json");
    }

  }

})();
