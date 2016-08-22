angular.module('streamalong')
    .controller('homeCtrl', function($scope, homeSrvc, user) {

        $scope.user = user.data;

        function update() {
            $('.time').html(moment().format('h:mm'));
        }

        let clock = setInterval(update, 1000);

        $scope.clock = clock;

        $scope.getQuote = function() {
            homeSrvc.getQuote().then(function(results) {
                $scope.quote = results;
            });
        };
        $scope.getQuote();

        if ("geolocation" in navigator) {
            /* geolocation is available */
        } else {
            alert('Unable to access location');
        }


        $scope.currWeather = function() {
            homeSrvc.getLocation().then(function (response) {
              homeSrvc.getAPIWeather(response).then(function (response) {
                  $('.weather').css("visibility", "visible");
                $scope.now = response.data;
              });
            });
        };
        $scope.currWeather();

    });
