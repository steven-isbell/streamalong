angular.module('streamalong')
    .directive('winScroll', () => {
        return {
            restrict: 'EA',
            link: (elem, attrs, scope) => {
                $(document).ready(() => {
                    $(window).scroll(function() {

                        var winScroll = $(this).scrollTop();

                        if (winScroll > $('#inverse-top').offset().top - ($(window).height() / 1.5)) {
                            $('#inverse-top').each((i) => {
                                setTimeout(() => {
                                    $('#inverse-top').eq(i).addClass('is-showing');
                                }, 150 * (i + 1));
                            });
                        }

                        if (winScroll > $('.middle-container').offset().top - ($(window).height() / 1.5)) {
                            $('.middle-container').each((i) => {
                                setTimeout(() => {
                                    $('.middle-container').eq(i).addClass('is-showing');
                                }, 150 * (i + 1));
                            });
                        }

                        if (winScroll > $('#inverse-bottom').offset().top - ($(window).height() / 1.5)) {
                            $('#inverse-bottom').each((i) => {
                                setTimeout(() => {
                                    $('#inverse-bottom').eq(i).addClass('is-showing');
                                }, 150 * (i + 1));
                            });
                        }
                    });

                });
            }
        };
    });
