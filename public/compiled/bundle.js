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
            },
            authUser: function authUser($state, homeSrvc) {
                return homeSrvc.checkAuth().then(function (response) {
                    if (response === 'unauthorized') {
                        $state.go('landing page');
                        setTimeout(function () {
                            swal("Error", 'Please Login or Sign Up', 'error');
                        }, 400);
                    } else {
                        return response;
                    }
                });
            }
        }
    }).state('clients', {
        url: '/clients',
        templateUrl: './app/component/client_view/client_view.html',
        controller: 'clientCtrl',
        resolve: {
            user: function user(homeSrvc) {
                return homeSrvc.getUser();
            },
            authUser: function authUser($state, homeSrvc) {
                return homeSrvc.checkAuth().then(function (response) {
                    if (response === 'unauthorized') {
                        $state.go('landing page');
                        setTimeout(function () {
                            swal("Error", 'Please Login or Sign Up', 'error');
                        }, 400);
                    } else {
                        return response;
                    }
                });
            }
        }
    }).state('programs', {
        url: '/programs',
        templateUrl: './app/component/programs/programs.html',
        controller: 'programCtrl',
        resolve: {
            user: function user(homeSrvc) {
                return homeSrvc.getUser();
            },
            authUser: function authUser($state, homeSrvc) {
                return homeSrvc.checkAuth().then(function (response) {
                    if (response === 'unauthorized') {
                        $state.go('landing page');
                        setTimeout(function () {
                            swal("Error", 'Please Login or Sign Up', 'error');
                        }, 400);
                    } else {
                        return response;
                    }
                });
            }
        }
    });
    // .state('distraction', {
    //     url: '/distraction',
    //     templateUrl: './app/component/distraction/games.html',
    //     controller: 'disCtrl',
    //     resolve: {
    //         user: (homeSrvc) => {
    //             return homeSrvc.getUser();
    //         },
    //         authUser: ($state, homeSrvc) => {
    //             return homeSrvc.checkAuth().then((response) => {
    //                 if (response === 'unauthorized') {
    //                     $state.go('landing page');
    //                     setTimeout(() => {
    //                         swal("Error", 'Please Login or Sign Up', 'error');
    //                     }, 400);
    //                 } else {
    //                     return response;
    //                 }
    //             });
    //         }
    //     }
    // });

});
'use strict';

angular.module('streamalong').controller('clientCtrl', function ($scope, user, clientSrvc) {

    $scope.user = user.data;

    $scope.getClients = function (id) {
        clientSrvc.getClients(id).then(function (results) {
            $scope.clients = results;
            if (results.length < 1) {
                $('.no-clients').removeClass('no-display');
            } else if (results.length >= 1) {
                $('.no-clients').addClass('no-display');
            }
        });
    };
    $scope.getClients($scope.user.id);

    $scope.addClient = function (newClient) {
        if (newClient.case_manager_id == $scope.user.id) {
            clientSrvc.addClient(newClient).then(function (results) {
                $('.client-modal').hide(300);
                $scope.newClient = "";
                if (results === undefined) {
                    swal("Uh-Oh!", "There Was An Error!", "error");
                } else {
                    swal("Success!", "A New Client Has Been Added!", "success");
                }
                $scope.getClients($scope.user.id);
            });
        } else if (newClient.case_manager_id !== $scope.user.id) {
            swal("Error", "You Can Only Add Clients To Your Case Management.", "error");
        }
    };

    $scope.deleteClient = function (id) {
        clientSrvc.deleteClient(id).then(function (results) {
            if (results === undefined) {
                swal("Uh-Oh!", "There Was An Error!", "error");
            } else {
                swal("Success!", "The Client Has Been Removed!", "success");
            }
            $scope.getClients($scope.user.id);
        });
    };

    $scope.putClient = function (updatedClient, name) {
        clientSrvc.putClient(updatedClient, name).then(function (results) {
            if (results.status === 200) {
                swal("Success!", "The Client Has Been Updated!", "success");
            } else {
                swal("Uh-Oh!", "There Was An Error!", "error");
            }
            $scope.getClients($scope.user.id);
        });
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
            return response.data;
        }).catch(function (err) {
            console.log('Error Adding Client', err);
        });
    };

    this.deleteClient = function (id) {
        return $http({
            method: 'DELETE',
            url: '/client/' + id
        }).then(function (response) {
            return response.data;
        });
    };

    this.putClient = function (updatedClient, name) {
        return $http({
            method: 'PUT',
            url: '/client/' + name,
            data: updatedClient
        }).then(function (response) {
            return response;
        });
    };
});
'use strict';

angular.module('streamalong').controller('programCtrl', function ($scope, programSrvc, user) {
    $scope.user = user.data;

    $scope.getPrograms = function () {
        programSrvc.getPrograms().then(function (results) {
            $scope.programs = results;
            if (results.length < 1) {
                $('.no-clients').removeClass('no-display');
            } else if (results.length >= 1) {
                $('.no-clients').addClass('no-display');
            }
        });
    };
    $scope.getPrograms();

    $scope.addProgram = function (newProgram) {
        programSrvc.addProgram(newProgram).then(function (results) {
            $('.programs-modal').hide(300);
            $scope.newProgram = "";
            swal("Success!", "A New Program Has Been Added!", "success");
            $scope.getPrograms();
        });
    };

    $scope.deleteProgram = function (id) {
        programSrvc.deleteProgram(id).then(function (results) {
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
                        strings: [" Youth", " Sons", " Daughters", " Families."],
                        backDelay: 1000,
                        typeSpeed: 80,
                        backSpeed: 50,
                        loop: true
                    });
                });
                /*
                landing page
                */
                $('.close-modal').on('click', function () {
                    $("body").css("overflow-y", "auto");
                    $('.login-modal').hide(300);
                });
                $('.close-modal').on('click', function () {
                    $("body").css("overflow-y", "auto");
                    $('.signup-modal').hide(300);
                });
                $('.log-in').on('click', function () {
                    $("body").css("overflow-y", "hidden");
                    $('.login-modal').show(300);
                });
                $('.sign-up').on('click', function () {
                    $("body").css("overflow-y", "hidden");
                    $('.signup-modal').show(300);
                });
                $("#raptor").click(function (e) {
                    e.preventDefault();
                    $('html, body').animate({
                        scrollTop: $("#raptor-receiver").offset().top
                    }, 1200);
                });

                /*
                Program View
                */
                $('#add-program').on('click', function () {
                    $("body").css("overflow-y", "hidden");
                    $('.programs-modal').show(300);
                });
                $('.close-modal').on('click', function () {
                    $("body").css("overflow-y", "auto");
                    $('.programs-modal').hide(300);
                });

                /*
                Sidebar
                */
                $('.sidebar-show').click(function () {
                    var effect = 'slide';
                    var options = {
                        direction: 'left'
                    };
                    var duration = 500;
                    $('.sidebar').toggle(effect, options, duration);
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
                    $("body").css("overflow-y", "hidden");
                    $('.info-modal').show(300);
                });
                $('.close-modal').on('click', function () {
                    $("body").css("overflow-y", "auto");
                    $('.info-modal').hide(300);
                });
                $('#CM-update').on('click', function () {
                    $("body").css("overflow-y", "hidden");
                    $('.CM-modal').show(300);
                });
                $('.close-modal').on('click', function () {
                    $("body").css("overflow-y", "auto");
                    $('.CM-modal').hide(300);
                });

                /*
                Client View
                */
                $('#add-client').on('click', function () {
                    $("body").css("overflow-y", "hidden");
                    $('.client-modal').show(300);
                });
                $('.close-modal').on('click', function () {
                    $("body").css("overflow-y", "auto");
                    $('.client-modal').hide(300);
                });
                /*
                Home View
                */
                $('.author').hide();
                $('.quotes').mouseenter(function () {
                    $('.author').show(400);
                });
                $('.quotes').mouseleave(function () {
                    $('.author').hide(400);
                });
                $('#date').combodate();

                var bgImages = ['./../../../assets/img/2Q==.jpg', './../../../assets/img/rfasPI6.jpg', './../../../assets/img/b9dX5lg.jpg', './../../../assets/img/gsqQP9V.jpg', './../../../assets/img/QIYCXvx.jpg'];
                var bg = bgImages[Math.floor(Math.random() * bgImages.length)];

                $('.admin-dash').css('background-image', 'url(' + bg + ')');
            });
        }
    };
});
'use strict';

angular.module('streamalong').directive('winScroll', function () {
    return {
        restrict: 'EA',
        link: function link(elem, attrs, scope) {
            $(document).ready(function () {
                $(window).scroll(function () {

                    var winScroll = $(this).scrollTop();

                    if (winScroll > $('#inverse-top').offset().top - $(window).height() / 1.5) {
                        $('#inverse-top').each(function (i) {
                            setTimeout(function () {
                                $('#inverse-top').eq(i).addClass('is-showing');
                            }, 150 * (i + 1));
                        });
                    }

                    if (winScroll > $('.middle-container').offset().top - $(window).height() / 1.5) {
                        $('.middle-container').each(function (i) {
                            setTimeout(function () {
                                $('.middle-container').eq(i).addClass('is-showing');
                            }, 150 * (i + 1));
                        });
                    }

                    if (winScroll > $('#inverse-bottom').offset().top - $(window).height() / 1.5) {
                        $('#inverse-bottom').each(function (i) {
                            setTimeout(function () {
                                $('#inverse-bottom').eq(i).addClass('is-showing');
                            }, 150 * (i + 1));
                        });
                    }
                });
            });
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

  $scope.logout = function () {
    sidebarSrvc.logout().then(function (response) {
      swal("Success!", "Logout Successful!", "success");
      setTimeout(function () {
        if (response) {
          $state.go('landing page');
        }
      }, 1500);
    });
  };

  $scope.putManager = function (update, id) {
    sidebarSrvc.putManager(update, id).then(function (response) {
      $('.CM-modal').hide(300);
      console.log(response);
      if (response.status === 200) {
        swal("Success!", "Your Information Has Been Saved!", "success");
      } else {
        swal("Error!", "Hmm...Something Wasn't Right", "error");
      }
    });
  };
});
'use strict';

angular.module('streamalong').service('sidebarSrvc', function ($http) {

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

  this.putManager = function (update, id) {
    return $http({
      method: 'PUT',
      url: '/manager/' + id,
      data: update
    }).then(function (response) {
      console.log(response);
      return response;
    }).catch(function (err) {
      console.log(err);
    });
  };
});
'use strict';

angular.module('streamalong').controller('landingCtrl', function (landingSrvc, $scope, $state) {

    $scope.addManager = function (user) {
        landingSrvc.addManager(user).then(function (response) {
            $('.signup-modal').hide();
            if (response === true) {
                swal("Successfully Registered!", "Please Login Using The Login Screen!", "success");
            } else {
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
      return response.data;
    }).catch(function (err) {
      console.log('ERROR SIGNING UP', err);
    });
  };

  this.login = function (user) {
    return $http({
      method: 'POST',
      url: '/auth/local',
      data: user
    }).then(function (response) {
      return response.data;
    }).catch(function (err) {
      console.log('ERROR LOGGING IN!', err);
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

angular.module('streamalong').directive('cmModal', function () {
    return {
        restrict: 'EA',
        templateUrl: './app/directives/CM_update/CM_update.html',
        scope: false,
        controller: 'sidebarCtrl',
        link: function link(scope, elem, attr) {
            var $scope = scope;
        }
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
                $('.loading').fadeOut();
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

    this.checkAuth = function () {
        return $http({
            method: 'GET',
            url: '/checkAuth'
        }).then(function (response) {
            return response.data;
        });
    };
});