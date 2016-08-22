'use strict';

angular.module('streamalong', ['ui.router']);
'use strict';

angular.module('streamalong').config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('landing page', {
        url: '/',
        templateUrl: './app/component/landingPage/landingPage.html',
        controller: 'landingCtrl'
    }).state('home', {
        url: '/home',
        templateUrl: './app/component/home/home.html',
        controller: 'homeCtrl',
        resolve: {
            user: function user(homeSrvc) {
                return homeSrvc.getUser();
            }
        }
    }).state('clients', {
        url: '/clients',
        templateUrl: './app/component/client_view/client_view.html',
        controller: 'clientCtrl',
        resolve: {
            user: function user(homeSrvc) {
                return homeSrvc.getUser();
            }
        }
    }).state('programs', {
        url: '/programs',
        templateUrl: './app/component/programs/programs.html',
        controller: 'programCtrl',
        resolve: {
            user: function user(homeSrvc) {
                return homeSrvc.getUser();
            }
        }
    }).state('distraction', {
        url: '/distraction',
        templateUrl: './app/component/distraction/games.html',
        controller: 'disCtrl',
        resolve: {
            user: function user(homeSrvc) {
                return homeSrvc.getUser();
            }
        }
    });
});
'use strict';

angular.module('streamalong').directive('jqDir', function () {
    return {
        restrict: 'EA',
        link: function link(scope, element, attrs) {
            $(document).ready(function () {
                /*
                typedJS
                */
                $(function () {
                    $('.work').typed({
                        strings: [" Youth", " Sons", " Daughters", " Families"],
                        backDelay: 1000,
                        typeSpeed: 100,
                        backSpeed: 50,
                        loop: true
                    });
                });
                /*
                login and signup modals
                */
                $('.close-modal').on('click', function () {
                    $('.login-modal').hide(300);
                });
                $('.close-modal').on('click', function () {
                    $('.signup-modal').hide(300);
                });
                $('.log-in').on('click', function () {
                    $('.login-modal').show(300);
                });
                $('.sign-up').on('click', function () {
                    $('.signup-modal').show(300);
                });
                /*
                Program View
                */
                $('#delete-program').click(function () {
                    $('.program-container').toggleClass('wiggle');
                });

                $('#add-program').on('click', function () {
                    $('.programs-modal').show(300);
                });
                $('.close-modal').on('click', function () {
                    $('.programs-modal').hide(300);
                });

                /*
                Program Detail Modal
                */

                /*
                Sidebar
                */
                $('.sidebar-show').on('click', function () {
                    $('.sidebar').toggleClass('slideIn');
                });

                $('.sidebar-show').on('click', function () {
                    $('.sidebar-show').toggleClass('button-slide');
                });

                $('#client-toggle').on('click', function () {
                    setTimeout(function () {
                        $('#client-drop').slideDown('fast');
                    }, 300);
                });

                $('#programs-toggle').on('click', function () {
                    setTimeout(function () {
                        $('#programs-drop').slideDown('fast');
                    }, 300);
                });
                $('#info-display').on('click', function () {
                    $('.info-modal').show(300);
                });
                $('.close-modal').on('click', function () {
                    $('.info-modal').hide(300);
                });

                /*
                Client View
                */
                $('#add-client').on('click', function () {
                    $('.client-modal').show(300);
                });
                $('.close-modal').on('click', function () {
                    $('.client-modal').hide(300);
                });
                $('#remove-client').on('click', function () {
                    $('.client-container').toggleClass('wiggle');
                });
                $('#remove-client').on('click', function () {
                    $('#clientDelete').toggle('fast');
                });

                $('.author').hide();
                $('.quotes').mouseenter(function () {
                    $('.author').show(400).mouseleave(function () {
                        $('.author').hide(400);
                    });
                });
                $('#date').combodate();
            });
        }
    };
});
'use strict';

angular.module('streamalong').controller('clientCtrl', function ($scope, user, clientSrvc) {

    $scope.user = user.data;

    $scope.getClients = function (id) {
        clientSrvc.getClients(id).then(function (results) {
            $scope.clients = results;
        });
    };
    $scope.getClients($scope.user.id);

    $scope.addClient = function (newClient) {
        clientSrvc.addClient(newClient).then(function (results) {
            $('.client-modal').hide(300);
            if (results.status === 200) {
                swal("Success!", "A New Client Has Been Added!", "success");
            } else if (results.status === 400) {
                swal("Uh-Oh!", "There Was An Error!", "error");
            }
            $scope.getClients($scope.user.id);
        });
    };

    $scope.deleteClient = function (id) {
        clientSrvc.deleteClient(id).then(function (results) {
            $('.makeWiggle').toggleClass('wiggle');
            $('.remove-client').toggleClass('hidden');
            if (results.status === 200) {
                swal("Success!", "The Client Has Been Removed!", "success");
            } else {
                swal("Uh-Oh!", "There Was An Error!", "error");
            }
            $scope.getClients($scope.user.id);
        });
    };

    $scope.readClientId = function (client) {
        $scope.selectedClient = client;
    };
});
'use strict';

angular.module('streamalong').service('clientSrvc', function ($http) {
    this.getUser = function () {
        return $http.get('/me');
    };

    this.getClients = function (id) {
        return $http({
            method: 'GET',
            url: '/clients/' + id
        }).then(function (response) {
            var results = response.data;
            return results;
        });
    };

    this.addClient = function (newClient) {
        return $http({
            method: 'POST',
            url: '/client',
            data: newClient
        }).then(function (response) {
            console.log(response);
            return response;
        });
    };

    this.deleteClient = function (id) {
        return $http({
            method: 'DELETE',
            url: '/client/' + id
        }).then(function (response) {
            return response;
        });
    };
});
'use strict';

angular.module('streamalong').controller('disCtrl', function (disSrvc, $scope, user) {
  $scope.user = user.data;
});
'use strict';

angular.module('streamalong').service('disSrvc', function ($http) {
  this.getUser = function () {
    return $http.get('/me');
  };
});
'use strict';

angular.module('streamalong').controller('homeCtrl', function ($scope, homeSrvc, user) {

    $scope.user = user.data;

    function update() {
        $('.time').html(moment().format('h:mm'));
    }

    var clock = setInterval(update, 1000);

    $scope.clock = clock;

    $scope.getQuote = function () {
        homeSrvc.getQuote().then(function (results) {
            $scope.quote = results;
        });
    };
    $scope.getQuote();

    if ("geolocation" in navigator) {
        /* geolocation is available */
    } else {
        alert('Unable to access location');
    }

    $scope.currWeather = function () {
        homeSrvc.getLocation().then(function (response) {
            homeSrvc.getAPIWeather(response).then(function (response) {
                $('.weather').css("visibility", "visible");
                $scope.now = response.data;
            });
        });
    };
    $scope.currWeather();
});
'use strict';

angular.module('streamalong').service('homeSrvc', function ($q, $http) {

    this.getUser = function () {
        return $http.get('/me');
    };

    this.getQuote = function () {
        return $http({
            method: 'GET',
            url: 'http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en'
        }).then(function (response) {
            var results = response.data;
            return results;
        });
    };

    this.getAPIWeather = function (position) {
        var lat, lon;

        lat = position.coords.latitude;
        lon = position.coords.longitude;
        return $http({
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&APPID=8d6d3d96f61b617556cbc73957e7ae65'
        });
    };

    this.getLocation = function () {
        var deferred = $q.defer();
        function success(position) {
            deferred.resolve(position);
        }
        navigator.geolocation.getCurrentPosition(success);
        return deferred.promise;
    };
});
'use strict';

angular.module('streamalong').controller('landingCtrl', function (landingSrvc, $scope, $state) {

    $scope.addManager = function (user) {
        landingSrvc.addManager(user).then(function (response) {
            $('.signup-modal').hide();
            swal("Successfully Registered!", "Please Login Using The Login Screen!", "success");
            console.log(response);
            if (response.data) {
                $state.go('landing page');
            }
        });
    };

    function getUser() {
        landingSrvc.getUser().then(function (user) {
            if (user) $scope.user = user.username;else $scope.user = 'NOT LOGGED IN';
        });
    }

    $scope.login = function (username, password) {
        console.log('Logging in with', username, password);
        landingSrvc.login({
            username: username,
            password: password
        }).then(function (response, err) {
            if (response === undefined) {
                swal("Error Logging In!", "Hmm.. Something Wasn't Right. Please Try Again.", "error");
            } else {
                getUser();
                $state.go('home');
            }
        });
    };
});
'use strict';

angular.module('streamalong').service('landingSrvc', function ($http) {
  this.addManager = function (user) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    }).then(function (response) {
      console.log(response);
      return response;
    });
  };

  this.login = function (user) {
    return $http({
      method: 'POST',
      url: '/auth/local',
      data: user
    }).then(function (response) {
      // console.log(response.data);
      return response.data;
    }).catch(function (err) {
      // console.log('ERROR LOGGING IN!', err);
      // return err;
    });
  };

  this.getUser = function () {
    return $http({
      method: 'GET',
      url: '/me'
    }).then(function (response) {
      return response.data;
    }).catch(function (err) {
      console.log(err);
    });
  };
});
'use strict';

angular.module('streamalong').controller('programCtrl', function ($scope, programSrvc, user) {
  $scope.user = user.data;

  $scope.getPrograms = function () {
    programSrvc.getPrograms().then(function (results) {
      console.log(results);
      $scope.programs = results;
    });
  };
  $scope.getPrograms();

  $scope.addProgram = function (newProgram) {
    programSrvc.addProgram(newProgram).then(function (results) {
      $('.programs-modal').hide(300);
      swal("Success!", "A New Program Has Been Added!", "success");
      $scope.getPrograms();
    });
  };

  $scope.deleteProgram = function (id) {
    programSrvc.deleteProgram(id).then(function (results) {
      console.log(results);
      $('.makeWiggle').toggleClass('wiggle');
      $('.remove-program').toggleClass('hidden');
      swal("Success!", "The Program Has Been Removed!", "success");
      $scope.getPrograms();
    });
  };

  $scope.readProgramId = function (program) {
    $scope.selectedProgram = program;
  };
});
'use strict';

angular.module('streamalong').service('programSrvc', function ($http) {

    this.getPrograms = function () {
        return $http({
            method: 'GET',
            url: '/programs'
        }).then(function (response) {
            console.log(response);
            var results = response.data;
            return results;
        });
    };

    this.addProgram = function (newProgram) {
        return $http({
            method: 'POST',
            url: '/programs',
            data: newProgram
        }).then(function (response) {
            return response;
        });
    };

    this.deleteProgram = function (id) {
        return $http({
            method: 'DELETE',
            url: '/program/' + id
        }).then(function (response) {
            return response;
        });
    };

    this.getUser = function () {
        return $http.get('/me');
    };
});
'use strict';

angular.module('streamalong').directive('infoModal', function () {
    return {
        restrict: 'EA',
        templateUrl: './app/directives/infoModal/info-modal.html',
        scope: false,
        controller: 'sidebarCtrl',
        link: function link(scope, elem, attr) {
            var $scope = scope;
        }
    };
});
'use strict';

angular.module('streamalong').directive('sideDir', function () {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/sidebar/sidebar.html',
    scope: false,
    controller: 'sidebarCtrl',
    link: function link(scope, elem, attr) {
      console.log(scope.user);
      var $scope = scope;
    }
  };
});
'use strict';

angular.module('streamalong').controller('sidebarCtrl', function ($scope, sidebarSrvc, $state) {
  // $scope.getOne = (id) => {
  //   sidebarSrvc.getCM().then(function (response) {
  //     console.log(response);
  //     $scope.user = response;
  //   });
  // };

  $scope.logout = function () {
    sidebarSrvc.logout().then(function (response) {
      // console.log(response);
      swal("Success!", "Logout Successful!", "success");
      setTimeout(function () {
        if (response) {
          $state.go('landing page');
        }
      }, 1500);
    });
  };
});
'use strict';

angular.module('streamalong').service('sidebarSrvc', function ($http) {
  // this.getCM = function() {
  //   return $http({
  //     method: 'GET',
  //     url: '/manager/:id',
  //     data: id
  //   }).then(function(response) {
  //     return response.data;
  //   });
  // };

  this.logout = function () {
    return $http({
      method: 'GET',
      url: '/logout'
    }).then(function (response) {
      console.log(response);
      return response.data;
    }).catch(function (err) {
      console.log(err);
    });
  };
});