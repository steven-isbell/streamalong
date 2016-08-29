angular.module('streamalong')
    .directive('jqDir', () => {
        return {
            restrict: 'EA',
            link: (scope, element, attrs) => {
                $(document).ready(() => {
                    /*
                    typedJS
                    */
                    $(() => {
                        $('.work').typed({
                            strings: [" Youth", " Sons", " Daughters", " Families."],
                            backDelay: 1000,
                            typeSpeed: 80,
                            backSpeed: 50,
                            loop: true,
                        });
                    });
                    /*
                    landing page
                    */

                    $('.logged-in').hide();
                    $('.close-modal').on('click', () => {
                        $("body").css("overflow-y", "auto");
                        $('.login-modal').hide(300);
                    });
                    $('.close-modal').on('click', () => {
                        $("body").css("overflow-y", "auto");
                        $('.signup-modal').hide(300);
                    });
                    $('.log-in').on('click', () => {
                        $("body").css("overflow-y", "hidden");
                        $('.login-modal').show(300);
                    });
                    $('.sign-up').on('click', () => {
                        $("body").css("overflow-y", "hidden");
                        $('.signup-modal').show(300);
                    });
                    $("#raptor").click((e) => {
                        e.preventDefault();
                        $('html, body').animate({
                            scrollTop: $("#raptor-receiver").offset().top
                        }, 1200);
                    });

                    function startMoving(img) {
                        var img$ = $(img);
                        var imgWidth = img$.width();
                        var screenWidth = $(window).width();
                        var amount = screenWidth - (parseInt(img$.css("left"), 10) || 0);
                        if (amount <= 0) {
                            img$.css("left", -imgWidth);
                            amount = screenWidth + imgWidth;
                        }
                        var moveRate = 300;
                        var time = amount * 1000 / moveRate;
                        img$.stop(true)
                            .animate({
                                left: "+=" + amount
                            }, time, "linear", function() {
                                startMoving(this);
                            });
                    }
                    $(window).resize(function() {
                        $(".nyan").each(function() {
                            startMoving(this);
                        });
                    });
                    startMoving('.nyan');

                    /*
                    Program View
                    */
                    $('#add-program').on('click', () => {
                        $("body").css("overflow-y", "hidden");
                        $('.programs-modal').show(300);
                    });
                    $('.close-modal').on('click', () => {
                        $("body").css("overflow-y", "auto");
                        $('.programs-modal').hide(300);
                    });

                    /*
                    Sidebar
                    */
                    $('.sidebar-show').click(() => {
                        let effect = 'slide';
                        let options = {
                            direction: 'left'
                        };
                        let duration = 500;
                        $('.sidebar').toggle(effect, options, duration);
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
                        $("body").css("overflow-y", "hidden");
                        $('.info-modal').show(300);
                    });
                    $('.close-modal').on('click', () => {
                        $("body").css("overflow-y", "auto");
                        $('.info-modal').hide(300);
                    });
                    $('#CM-update').on('click', () => {
                        $("body").css("overflow-y", "hidden");
                        $('.CM-modal').show(300);
                    });
                    $('.close-modal').on('click', () => {
                        $("body").css("overflow-y", "auto");
                        $('.CM-modal').hide(300);
                    });

                    /*
                    Client View
                    */
                    $('#add-client').on('click', () => {
                        $("body").css("overflow-y", "hidden");
                        $('.client-modal').show(300);
                    });
                    $('.close-modal').on('click', () => {
                        $("body").css("overflow-y", "auto");
                        $('.client-modal').hide(300);
                    });
                    /*
                    Home View
                    */
                    $('.author').hide();
                    $('.quotes').mouseenter(() => {
                        $('.author').show(400);
                    });
                    $('.quotes').mouseleave(() => {
                        $('.author').hide(400);
                    });
                    $('#date').combodate();

                    let bgImages = ['./../../../assets/img/2Q==.jpg', './../../../assets/img/rfasPI6.jpg', './../../../assets/img/b9dX5lg.jpg', './../../../assets/img/gsqQP9V.jpg', './../../../assets/img/QIYCXvx.jpg'];
                    let bg = bgImages[Math.floor(Math.random() * bgImages.length)];

                    $('.admin-dash').css('background-image', 'url(' + bg + ')');
                    /* Stats View*/
                    $("#trex").click((e) => {
                        e.preventDefault();
                        $('html, body').animate({
                            scrollTop: $("#trex-receiver").offset().top
                        }, 1200);
                    });

                    $("#triceratops").click((e) => {
                        e.preventDefault();
                        $('html, body').animate({
                            scrollTop: $("#triceratops-receiver").offset().top
                        }, 1200);
                    });


                });
            }
        };
    });
