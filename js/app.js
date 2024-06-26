// function togglePage() {
//     var page1 = document.getElementById("page1");
//     var page2 = document.getElementById("page2");
  
//     if (page1.style.display === "none") {
//       page1.style.display = "block";
//       page2.style.display = "none";
//     } else {
//       page1.style.display = "none";
//       page2.style.display = "block";
//     }
//   }




'use strict';


 jQuery(document).ready(function ($) {

    var lastId,
    topMenu = $("#top-navigation"),
    topMenuHeight = topMenu.outerHeight(),
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            var href = $(this).attr("href");
            if(href.indexOf("#") === 0){
                var item = $($(this).attr("href"));
                if (item.length) {
                    return item;
                }
            }
        });

    //Get width of container
    var containerWidth = $('.section .container').width();
    //Resize animated triangle
    $(".triangle").css({
        "border-left": containerWidth / 2 + 'px outset transparent',
        "border-right": containerWidth / 2 + 'px outset transparent'
    });
    $(window).resize(function () {
        containerWidth = $('.container').width();
        $(".triangle").css({
            "border-left": containerWidth / 2 + 'px outset transparent',
            "border-right": containerWidth / 2 + 'px outset transparent'
        });
    });


    //Initialize header slider.
    $('#da-slider').cslider();

    //Initial mixitup, used for animated filtering portgolio.
    $('#portfolio-grid').mixitup({
        'onMixStart': function (config) {
            $('div.toggleDiv').hide();
        }
    });

    //Initial Out clients slider in client section
    $('#clint-slider').bxSlider({
        pager: false,
        minSlides: 1,
        maxSlides: 5,
        moveSlides: 2,
        slideWidth: 210,
        slideMargin: 25,
        prevSelector: $('#client-prev'),
        nextSelector: $('#client-next'),
        prevText: '<i class="icon-left-open"></i>',
        nextText: '<i class="icon-right-open"></i>'
    });


    $('input, textarea').placeholder();

    // Bind to scroll
    $(window).scroll(function () {

        //Display or hide scroll to top button 
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }

        if ($(this).scrollTop() > 130) {
            $('.navbar').addClass('navbar-fixed-top animated fadeInDown');
        } else {
            $('.navbar').removeClass('navbar-fixed-top animated fadeInDown');
        }

        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight + 10;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });

        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
            .parent().removeClass("active")
            .end().filter("[href=#" + id + "]").parent().addClass("active");
        }
    });

    /*
    Function for scroliing to top
    ************************************/
    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });


    $(window).load(function () {
        function filterPath(string) {
            return string.replace(/^\//, '').replace(/(index|default).[a-zA-Z]{3,4}$/, '').replace(/\/$/, '');
        }
        $('a[href*=#]').each(function () {
            if (filterPath(location.pathname) == filterPath(this.pathname) && location.hostname == this.hostname && this.hash.replace(/#/, '')) {
                var $targetId = $(this.hash),
                $targetAnchor = $('[name=' + this.hash.slice(1) + ']');
                var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;

                if ($target) {

                    $(this).click(function () {

                        //Hack collapse top navigation after clicking
                        topMenu.parent().attr('style', 'height:0px').removeClass('in'); //Close navigation
                        $('.navbar .btn-navbar').addClass('collapsed');

                        var targetOffset = $target.offset().top - 63;
                        $('html, body').animate({
                            scrollTop: targetOffset
                        }, 800);
                        return false;
                    });
                }
            }
        });
});

    /************************
    Animate elements
    *************************/
    
    //Animate thumbnails 
    // jQuery('.thumbnail').one('inview', function (event, visible) {
    //     if (visible == true) {
    //         jQuery(this).addClass("animated fadeInDown");
    //     } else {
    //         jQuery(this).removeClass("animated fadeInDown");
    //     }
    // });

    //Animate triangles
    jQuery('.triangle').bind('inview', function (event, visible) {
        if (visible == true) {
            jQuery(this).addClass("animated fadeInDown");
        } else {
            jQuery(this).removeClass("animated fadeInDown");
        }
    });
    
    //animate first team member
    // jQuery('#first-person').bind('inview', function (event, visible) {
    //     if (visible == true) {
    //         jQuery('#first-person').addClass("animated pulse");
    //     } else {
    //         jQuery('#first-person').removeClass("animated pulse");
    //     }
    // });
    
    //animate sectond team member
    // jQuery('#second-person').bind('inview', function (event, visible) {
    //     if (visible == true) {
    //         jQuery('#second-person').addClass("animated pulse");
    //     } else {
    //         jQuery('#second-person').removeClass("animated pulse");
    //     }
    // });

    //animate thrid team member
    // jQuery('#third-person').bind('inview', function (event, visible) {
    //     if (visible == true) {
    //         jQuery('#third-person').addClass("animated pulse");
    //     } else {
    //         jQuery('#third-person').removeClass("animated pulse");
    //     }
    // });
    
    //Animate price columns
    // jQuery('.price-column, .testimonial').bind('inview', function (event, visible) {
    //     if (visible == true) {
    //         jQuery(this).addClass("animated fadeInDown");
    //     } else {
    //         jQuery(this).removeClass("animated fadeInDown");
    //     }
    // });
    
    //Animate contact form
    // jQuery('.contact-form').bind('inview', function (event, visible) {
    //     if (visible == true) {
    //         jQuery('.contact-form').addClass("animated bounceIn");
    //     } else {
    //         jQuery('.contact-form').removeClass("animated bounceIn");
    //     }
    // });

    //Animate skill bars
    // jQuery('.skills > li > span').one('inview', function (event, visible) {
    //     if (visible == true) {
    //         jQuery(this).each(function () {
    //             jQuery(this).animate({
    //                 width: jQuery(this).attr('data-width')
    //             }, 3000);
    //         });
    //     }
    // });
});


