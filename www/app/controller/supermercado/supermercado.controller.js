(function() {

    angular
        .module('entryPoint')
        .controller('SupermercadoController', supermercadoController);

    supermercadoController.$inject = ['$scope', '$state', '$cordovaGeolocation'];

    function supermercadoController($scope, $state, $cordovaGeolocation) {

        var vm = this;

        var latitude;
        var longitude;


        var options = {
            timeout: 10000,
            enableHighAccuracy: true
        };

        $cordovaGeolocation.getCurrentPosition(options).then(function(position) {

            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            getMap(position.coords.latitude, position.coords.longitude, mapOptions);

            // $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        }, function(error) {
            console.log("Could not get location");
        });


        function getMap(latitude, longitude, mapOptions) {


             $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);


            var latLong = new google.maps.LatLng(latitude, longitude);

            var marker = new google.maps.Marker({
                position: latLong
            });

            marker.setMap($scope.map);
            $scope.map.setZoom(15);
            $scope.map.setCenter(marker.getPosition());
        }


    }

})();