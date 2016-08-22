angular.module('streamalong')
    .directive('jqDir', () => {
        return {
            restrict: 'EA',
            link: (scope, element, attrs) => {
                $(document).ready(function() {
                    /*
                    typedJS
                    */
                    $(() => {
                        $('.work').typed({
                            strings: [" Youth", " Sons", " Daughters", " Families"],
                            backDelay: 1000,
                            typeSpeed: 100,
                            backSpeed: 50,
                            loop: true,
                        });
                    });
                    /*
                    login and signup modals
                    */
                    $('.close-modal').on('click', () => {
                        $('.login-modal').hide(300);
                    });
                    $('.close-modal').on('click', () => {
                        $('.signup-modal').hide(300);
                    });
                    $('.log-in').on('click', () => {
                        $('.login-modal').show(300);
                    });
                    $('.sign-up').on('click', () => {
                        $('.signup-modal').show(300);
                    });
                    /*
                    Program View
                    */
                    $('#delete-program').click(() => {
                        $('.program-container').toggleClass('wiggle');
                    });

                    $('#add-program').on('click', () => {
                        $('.programs-modal').show(300);
                    });
                    $('.close-modal').on('click', () => {
                        $('.programs-modal').hide(300);
                    });

                    /*
                    Program Detail Modal
                    */


                    /*
                    Sidebar
                    */
                    $('.sidebar-show').on('click', () => {
                        $('.sidebar').toggleClass('slideIn');
                    });

                    $('.sidebar-show').on('click', () => {
                        $('.sidebar-show').toggleClass('button-slide');
                    });

                    $('#client-toggle').on('click', () => {
                        setTimeout(() => {
                            $('#client-drop').slideDown('fast');
                        }, 300);
                    });

                    $('#programs-toggle').on('click', () => {
                        setTimeout(() => {
                            $('#programs-drop').slideDown('fast');
                        }, 300);
                    });
                    $('#info-display').on('click', () => {
                        $('.info-modal').show(300);
                    });
                    $('.close-modal').on('click', () => {
                        $('.info-modal').hide(300);
                    });

                    /*
                    Client View
                    */
                    $('#add-client').on('click', () => {
                        $('.client-modal').show(300);
                    });
                    $('.close-modal').on('click', () => {
                        $('.client-modal').hide(300);
                    });
                    $('#remove-client').on('click', () => {
                        $('.client-container').toggleClass('wiggle');
                    });
                    $('#remove-client').on('click', () => {
                        $('#clientDelete').toggle('fast');
                    });



                    $('.author').hide();
                    $('.quotes').mouseenter(() => {
                        $('.author').show(400).mouseleave(() => {
                            $('.author').hide(400);
                        });
                    });
                    $('#date').combodate();

                


                });
            }
        };
    });
