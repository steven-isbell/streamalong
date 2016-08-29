angular.module('streamalong')
    .directive('winScrollStats', () => {
        return {
            restrict: 'EA',
            link: (scope, element, attrs) => {
                $(window).scroll(function() {
                    let winScroll = $(window).scrollTop(),
                        docScroll = $(document).scrollTop(),
                        $body = $(document.body),
                        bodyHeight = $body.height();

                    // $('.hello').css("transform", "translateY(" + (winScroll / 2) + "px)");
                    $('.hello').css("transform", "translateX(" + (winScroll / 2) + "px)");

                    $('.you-are').css("transform", "translateY(" + (winScroll / 2) + "px)");

                    $('.seuss').css("transform", "translateY(" + (winScroll / -1.75) + "px)");

                    $('.inspiration').css("transform", "translateX(" + (winScroll / -6) + "px)");

                    $('.infomercial').css("transform", "translateY(" + (winScroll / 2) + "px)");

                    $('.infomercial').css({
                        'transform': 'rotate(' + ($body.scrollTop() / bodyHeight * 360) + 'deg)'
                    });

                    // let opacity = 0,
                    //     fadeStart = 1500,
                    //     fadeEnd = 2000;
                    // if (winScroll <= fadeStart) {
                    //     opacity = 1;
                    // } else if (winScroll <= fadeEnd) {
                    //     opacity = 1 - winScroll / fadeEnd;
                    // }
                    // $('.keep-on-wrapper').css('opacity', opacity);

                });

            }
        };
    });
