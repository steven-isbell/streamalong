angular.module('streamalong')
  .service('homeSrvc', function($q, $http) {

    this.getUser = () => {
      return $http.get('/me');
    };

    this.getQuote = () => {
      return $http({
        method: 'GET',
        url: 'http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en'
      }).then(function(response) {
        let results = response.data;
        return results;
      });
    };

    this.getAPIWeather = (position) => {
      var lat, lon;

      lat = position.coords.latitude;
      lon = position.coords.longitude;
      return $http({
        method: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&APPID=8d6d3d96f61b617556cbc73957e7ae65'
      });
    };


    this.getLocation = () => {
      var deferred = $q.defer();

      function success(position) {
        deferred.resolve(position);
      }
      navigator.geolocation.getCurrentPosition(success);
      return deferred.promise;
    };

    this.checkAuth = () => {
      return $http({
        method: 'GET',
        url: '/checkAuth'
      }).then((response) => {
        return response;
      });
    };

  });
