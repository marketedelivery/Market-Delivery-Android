(function() {

    angular
        .module('entryPoint')
        .controller('SupermercadoController', supermercadoController);

    supermercadoController.$inject = ['$scope', '$state', '$cordovaGeolocation', 'SupermercadoService', '$filter'];

    function supermercadoController($scope, $state, $cordovaGeolocation, SupermercadoService, $filter) {

        var vm = this;

        var latitude;
        var longitude;




        var options = {
            // timeout: 10000,
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


            var currentLatLong = new google.maps.LatLng(latitude, longitude);

            var marker = new google.maps.Marker({
                position: currentLatLong
            });

            marker.setMap($scope.map);
            $scope.map.setZoom(15);
            $scope.map.setCenter(marker.getPosition());



            listarSupermercados(currentLatLong);
        }


        function listarSupermercados(currentLatLong) {
            SupermercadoService.listarSupermercado().then(
                function success(response) {
                    if (response.data && angular.isArray(response.data.supermercados)) {
                        var supermercados = response.data.supermercados;

                        angular.forEach(supermercados, function(supermercado){
                            var superLatLong = new google.maps.LatLng(supermercado.latitude, supermercado.longitude);
                            var marker = new google.maps.Marker({
                                map: $scope.map,
                                animation: google.maps.Animation.DROP,
                                position: superLatLong
                            });
                        });

                        var controlFlag = 0;
                        var distanceResult = [];
                        calculateDistance(currentLatLong, supermercados, controlFlag, distanceResult);

                    }
                },
                function error(error) {
                    console.log(error);
                });
        }

        function calculateDistance(currentLatLong, locationArr, controlFlag, distanceResult) {
            if (currentLatLong && Array.isArray(locationArr) && Number.isInteger(controlFlag) && Array.isArray(distanceResult)) {

                var directionsService = new google.maps.DirectionsService();
                var superLatLong = new google.maps.LatLng(locationArr[controlFlag].latitude, locationArr[controlFlag].longitude);

                var request = {
                    destination: superLatLong,
                    origin: currentLatLong,
                    travelMode: 'DRIVING'
                };

                directionsService.route(request, function(response, status) {
                    if (status == 'OK') {
                        // Display the route on the map.
                        // directionsDisplay.setDirections(response);
                        var obj = {};
                        obj.response = response;
                        obj.supermercado = locationArr[controlFlag];
                        distanceResult.push(obj);
                        controlFlag++;
                        if (controlFlag < locationArr.length) {
                            calculateDistance(currentLatLong, locationArr, controlFlag, distanceResult);
                        }
                        if (controlFlag === locationArr.length) {
                            traceRoute(distanceResult);
                        }
                    }
                });

            }

        }

        function traceRoute(distanceResult) {
            var routes = convertRoutes(distanceResult);
            var directionsDisplay = new google.maps.DirectionsRenderer({
                map: $scope.map
            });
            directionsDisplay.setDirections(distanceResult[0].response);
        }

        function convertRoutes(distanceResult) {
            var routes = [];
            if (Array.isArray(distanceResult)) {
                var routeArr = distanceResult.map(function(requestParam) {
                    return {
                        supermercado: requestParam.supermercado,
                        distancia: (requestParam.response.routes && requestParam.response.routes[0] &&
                            requestParam.response.routes[0].legs && requestParam.response.routes[0].legs[0] &&
                            requestParam.response.routes[0].legs[0].distance) ? requestParam.response.routes[0].legs[0].distance.value : 0

                    };
                });
                routes = routes.concat(routeArr);
            }
            return $filter('orderBy')(routes, 'distancia');
        }


        function init() {


        }

        init();


    }

})();