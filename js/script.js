$(document).ready(function () {
    // $('.carousel__inner').slick({
    //     speed: 1200,
    //     // adaptiveHeight: true,
    //     prevArrow: '<button type="button" class="slick-prev"><img src="img/chevron-left-solid.png"></button>',
    //     nextArrow: '<button type="button" class="slick-next"><img src="img/chevron-right-solid.png"></button>',
    //     responsive: [
    //         {
    //             breakpoint: 992,
    //             settings: {
    //                 dots: true,
    //                 arrows: false
    //             }
    //         }
    //     ]
    // }
    // );

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list-wrapper').eq(i).toggleClass('catalog-item__list-wrapper_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
            })
        })
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal 

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn();
    })

    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #consultation, #order').fadeOut('fast');
    })

    // $('.button_catalog-item').on('click', function() {
    //     $('.overlay, #order').fadeIn();
    // })

    // $('[data-modal=buy]').on('click', function() {
    //     $('.overlay, #thanks').fadeIn();
    // })

    $('.button_catalog-item').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
    });

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите больше {0} символов")
                },
                phone: {
                    required: "Пожалуйста, введите свой номер телефона"
                },
                email: {
                    required: "Нам нужен ваш адрес электронной почты, чтобы связаться с вами",
                    email: "Ваш адрес электронной почты должен быть в формате name@domain.com"
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99")

    $('form').submit(function (e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fideOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    $('form').submit(function (e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut('slow');
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
    });

    //smooth scrool and pageup

    $(window).scroll(function () {

        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#']").click(function () {
        const _href = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
        return false;
    });

    const slider = tns({
        container: '.carousel__inner',
        items: 1,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: true,
        navPosition: "bottom",
    });
    
    document.querySelector('.prev').addEventListener('click', function () {
      slider.goTo('prev');
    });
    document.querySelector('.next').addEventListener('click', function () {
      slider.goTo('next');
    });
    new WOW().init();
});
