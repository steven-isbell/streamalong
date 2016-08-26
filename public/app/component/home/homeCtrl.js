angular.module('streamalong')
    .controller('homeCtrl', function($scope, homeSrvc, user) {

        $scope.user = user.data;

        function update() {
            $('.time').html(moment().format('h:mm'));
        }

        let clock = setInterval(update, 1000);

        $scope.clock = clock;

        $scope.getQuote = () => {
            homeSrvc.getQuote().then((results) => {
                $scope.quote = results;
            });
        };
        $scope.getQuote();

        if ("geolocation" in navigator) {
            /* geolocation is available */
        } else {
            alert('Unable to access location');
        }


        $scope.currWeather = () => {
            homeSrvc.getLocation().then((response) => {
              homeSrvc.getAPIWeather(response).then((response) => {
                  $('.weather').css("visibility", "visible");
                $scope.now = response.data;
              });
            });
        };
        $scope.currWeather();

    });
