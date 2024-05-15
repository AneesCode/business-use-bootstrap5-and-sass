jQuery(document).on('ready', function ($) {
    // Sticky Header

    // Sticky Header
    window.floatingHeaderLock = false;
    $(window).on(
        'scroll',
        function () {
            if ($(window).scrollTop() > 0) {
                $('body').addClass('is-scrolling');
                $('.site-header').addClass('site-header--sticked-top');
            } else {
                $('body').removeClass('is-scrolling');
                $('.site-header').removeClass('site-header--sticked-top');
            }
        }
    ).on(
        'load',
        function () {
            var $window = $(window);
            $window.on('scroll', function () {
                handleStickyHeader();
            });
        }
    );
    handleStickyHeader();
    var headerHeight = $('.site-header').height() + 20;
    var lastScrollTop = 0;

    function handleStickyHeader() {
        if (window.floatingHeaderLock) {
            return;
        }

        var currentScrollTop = $(window).scrollTop();

        if (currentScrollTop - headerHeight <= 0) {
            $('body').removeClass('is-scrolling-down is-scrolling-up');
        } else if (currentScrollTop > lastScrollTop) {
            $('body').removeClass('is-scrolling-up');
            $('body').addClass('is-scrolling-down');
        } else {
            $('body').removeClass('is-scrolling-down');
            $('body').addClass('is-scrolling-up');
        }

        lastScrollTop = currentScrollTop;
    }

    function lockFloatingHeader() {
        window.floatingHeaderLock = true;

        setTimeout(function () {
            window.floatingHeaderLock = false;
        }, 3000);
    }
    // --------------------------------------------------------------------


    $(document).on(
        'click',
        function (event) {
            var target = $(event.target);
            var _mobileMenuOpen = $(".navbar-collapse").hasClass("show");
            if (_mobileMenuOpen === true && !target.hasClass("navbar-toggler")) {
                $('#siteNavigation').collapse('hide');
            }
        }
    );

    // Site Navigation Overflow Stopped on Navbar Toggle
    $('#siteNavigation').on('show.bs.collapse', function () {
        $('body').addClass('overflow-stopped');

    }).on('hide.bs.collapse', function () {
        $('body').removeClass('overflow-stopped');
    })


    $('a[smooth-scroll]').on('click', function (event) {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 140
        }, 500);
        event.preventDefault();
    });

});