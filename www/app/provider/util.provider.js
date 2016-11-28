(function() {
  angular.module("appModule")
    .provider("loadService", function() {
      var ionicLoading;
      var timeout;
      var timeState = {};
      return {
        show: function(){
          if(ionicLoading && timeout){
            ionicLoading.show({
              template: '<ion-spinner icon="spiral" style="backgroud-color: transparent;"></ion-spinner>',
              duration: 60000
            }).then(function() {
              console.log('loading...');
              timeout.cancel(timeState);
              timeState = timeout(function(){
                //rootScope.$broadcast('eventResponse', {message: 'Problemas com a sua Conexão. Tente novamente mais tarde'});
              }, 60000);
            });
          }
        },
        hide: function(){
          if(ionicLoading && timeout){
            timeout.cancel(timeState);
            ionicLoading.hide().then(function() {
              console.log("The loading indicator is now hidden");
            });
          }
        },
        $get: function() {
          return {
            setComponent: function(ionicLoadingObj, timeoutObj){
              timeout = timeoutObj;
              ionicLoading = ionicLoadingObj;
            }
          };
        }
      };
    });

})();
