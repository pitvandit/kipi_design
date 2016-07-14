
//Using an object literal for a jQuery feature
var website = {
    init: function( settings ) {
        website.config = {
            bxslider: '.bxslider',
            bxsliderStart: '.bxslider-start',
            //lazyload: 'img.lazy',
            imagefit: '.image-fit',
            sectionfit: '.section-fit, .fixed-fit',
            //fancy: '[rel="lightbox"]',
            //orphans: 'article p',
            ajaxhref: '[href$="html"]',
            animate: '.animated',
            smoothscroll: '.navbar a, .subnav a, .smoothscroll',
            nano: '.nano'
        };
        //allow overriding the default config
        $.extend( website.config, settings );
        website.setup();
        website.initNav();
        website.initMenuAjax( website.config.ajaxhref );
        website.initCartMenu();

        website.loadPage('start.html');
        setInterval( function() {
            /*website.initFitSection( website.config.sectionfit );
             website.initFitImage( website.config.imagefit );*/
        } , 1000 );
    },
    setup: function( obj ) {
        if( typeof obj == "undefined" ) obj = $('body');
        else obj = $(obj);

        
        
        website.initFitSection( obj.find( website.config.sectionfit ) );
        website.initFitImage( obj.find( website.config.imagefit ) );

        website.initBxSlider( obj.find( website.config.bxslider ) );
        //website.initBxSliderStart( obj.find( website.config.bxsliderStart ) );

        //website.initLazyLoad( obj.find( website.config.lazyload ) );
        //website.initFancybox( obj.find( website.config.fancy ) );
        //website.initOrphans( obj.find( website.config.orphans ) );
        website.initSmoothScroll( obj.find( website.config.smoothscroll ) );
        website.initAnimate( obj.find( website.config.animate ) );
        website.initNanoScroller( obj.find( website.config.nano ) );

    },
    resize: function() {
        website.initFitSection( website.config.sectionfit );
        website.initFitImage( website.config.imagefit );
        website.menuResize();
    },

    //Init all lazy images based on .lazy class
    //Init NAV
    initNav: function( ) {

        if( $(".menu-holder").hasClass("init") )
            return;
        $(".menu-holder").addClass("init");


        $(".menu-open").click( function(){
            menuShow();
        });
        $('.menu-holder').mouseleave(function() {
            menuHide();
        });

        $('.menu-holder .menu-close').click(function() {
            if ( $(window).width() < 991 ) {
                menuMobileHide();
            } else {
                menuHide();
            }
        });

        $(".mobile-menu").click( function(){
            menuMobileShow();
        });

        $(".menu-holder a").click( function(){
            if ( $(window).width() < 991 ) {
                menuMobileHide();
            } else {
                menuHide();
            }
            
        });
        

        function menuShow() {
            $('.cart').addClass('white');
            TweenMax.to( $(".menu-open") , 0.2, {x:100, scale:0,  ease: Cubic.easeIn, overwrite:"all", delay:0});
            TweenMax.to( $(".menu-holder") , 0.4, {x:-( $(".menu-holder").width() ), ease: Cubic.easeOut, overwrite:"all", delay:0.2});
            TweenMax.fromTo( $(".menu-holder .menu-close ") , 0.4,{scale:1, x:100}, {scale:1, x:0, ease: Cubic.easeOut, overwrite:"all", delay:0.4});
            $(".menu-main li").each(function(index) {
                TweenMax.fromTo($(this), 0.2, {scale: 0, x: 120}, {scale: 1, x: 0, ease: Cubic.easeOut, overwrite: "all", delay: (index * 0.05)+0.2});
            });
            $(".menu-sub li").each(function(index) {
                TweenMax.fromTo($(this), 0.2, {scale: 0, x: 120}, {scale: 1, x: 0, ease: Cubic.easeOut, overwrite: "all", delay: (index * 0.05)+0.5});
            });
        };

        function menuHide() {
            $('.cart').removeClass('white');
            TweenMax.to( $(".menu-open") , 0.2, {x:0, scale:1, ease: Cubic.easeOut, overwrite:"all", delay:0.4});
            TweenMax.to( $(".menu-holder") , 0.4, {x:0, ease: Cubic.easeIn, overwrite:"all", delay:0});
        };

        function menuMobileShow() {
            TweenMax.to( $(".menu-holder") , 0.4, {top: 0 , ease: Cubic.easeOut, overwrite:"all", delay:0});
            TweenMax.fromTo( $(".menu-holder .menu-close ") , 0.4,{scale:1, x:100}, {scale:1, x:0, ease: Cubic.easeOut, overwrite:"all", delay:0.4});
            $(".menu-main li").each(function(index) {
                TweenMax.fromTo($(this), 0.2, {scale: 0, y: -120}, {scale: 1, y: 0, ease: Cubic.easeOut, overwrite: "all", delay: (index * 0.05)+0.2});
            });
            $(".menu-sub li").each(function(index) {
                TweenMax.fromTo($(this), 0.2, {scale: 0, y: -120}, {scale: 1, y: 0, ease: Cubic.easeOut, overwrite: "all", delay: (index * 0.05)+0.5});
            });
        };
        function menuMobileHide() {
            TweenMax.to( $(".menu-holder") , 0.4, {top:-( $(".menu-holder").height() ), ease: Cubic.easeIn, overwrite:"all", delay:0});
        };

        website.menuResize();

    },

    menuResize: function() {



        var mHeight = $(".menu-holder .nano-content").find('> div').outerHeight();
        console.log($(".menu-holder").actual('height'));

        if ( $(window).height() > mHeight ) {
            $(".menu-holder .menu").css({
                height: mHeight,
                top: ( $(window).height() / 2 ) - ( mHeight / 2 )
            });
        } else {
            $(".menu-holder .menu").css({
                height: $(window).height(),
                top: 0
            });
        };

        if ( $(window).width() < 991 ) {
            $(".menu-holder").css({
                top: -( $(".menu-holder").height() )
            });
        } else {
            $(".menu-holder").css({
                top: 0
            });
        }

    },


    //Init CartMenu
    initCartMenu: function( ) {

        var showCart = false;
        $(".cart-menu").css({
            top: -( $(".cart-menu").height() )
        });
        $("header .cart").mouseenter( function(){
            if ( !$(this).hasClass('white') ) {
                cartMenuShow();
            };
        });
        $(".cart-menu").mouseleave(function() {
            cartMenuHide();
        });
        $(".cart-menu .btn-back").click(function() {
            cartMenuHide();
        });

        $("header .mobile-cart").click( function(){
            cartMenuShow();
        });

        function cartMenuShow() {
            $('header .cart').addClass('white');
            TweenMax.to( $(".cart-menu") , 0.4, {top:0, ease: Cubic.easeOut, overwrite:"all", delay:0});
            TweenMax.to( $(".cart-menu .cart-list") , 0.3, {opacity:1, overwrite:"all", delay:0});
            $(".cart-menu .cart-list li").each(function(index) {
                TweenMax.fromTo($(this), 0.5, {scale: 0.5, x: 300}, {scale: 1, x: 0, ease: Cubic.easeOut, overwrite: "all", delay: (index * 0.1)+0.1});
            });
        };
        function cartMenuHide() {
            TweenMax.to( $(".cart-menu") , 0.4, {top:-( $(".cart-menu").height()), ease: Cubic.easeIn, overwrite:"all", onComplete: function () {
                $('header .cart').removeClass('white');
            }
            });
            TweenMax.to( $(".cart-menu .cart-list") , 0.3, {opacity:0, overwrite:"all", delay:0});
        };


    },

    //Init Nano scroller
    initNanoScroller: function( obj ) {
        $(obj).nanoScroller({
            alwaysVisible: true,
            preventPageScrolling: true,
        });

    },



    //Init all bxsliders based on .bxslider class
    initBxSlider: function( obj ) {
        if( !$.isFunction( $.fn.bxSlider ) ) return;

        $(obj).each(function( id, el ) {
            if( !$(el).parent().hasClass('bx-viewport') ){
                $(el).bxSlider( $.extend({
                    onSlideBefore: function( slideElement ){ $(slideElement).find('img').trigger("scroll"); },
                    onSlideAfter: function( slideElement ){ $(slideElement).find('img').trigger("scroll"); },
                    pagerCustom: '#bx-pager',
                    speed: 1000,
                    easing: 'easeInOutExpo',
                    useCSS: false
                }, $(el).data() ) );
            }
        });
    },
    
    initBxSliderStart: function( obj ) {
        if( !$.isFunction( $.fn.bxSlider ) ) return;
        

        var bxStart = $( obj ).bxSlider({
            mode:"vertical",
            pager: false,
            controls: false,
            speed: 1000,
            easing: 'easeInOutExpo',
            useCSS: true,
            touchEnabled: true,
            preventDefaultSwipeY: false,
            onSlideAfter: function( slideElement ){ $(slideElement).find('img').trigger("scroll"); },
            onSlideBefore: function(slideElement, oldIndex, newIndex){
                $(slideElement).find('img').trigger("scroll");
            }
        });

        var total = bxStart.getSlideCount();

        $('.main-viz .bx-prev').click( function() {
            calculateSlides( $('.main-viz .bx-next') , $('.main-viz .bx-prev') );
            bxStart.goToPrevSlide();
        });

        $('.main-viz .bx-next').click( function() {
            calculateSlides( $('.main-viz .bx-prev') , $('.main-viz .bx-next') );
            bxStart.goToNextSlide();
        });

        function calculateSlides(obj1,obj2) {
            var nextSlide = bxStart.getCurrentSlide() + 1;
            var prevSlide = bxStart.getCurrentSlide() - 1 ;
            if (prevSlide < 0 ) {
                prevSlide = total-1;
            }
            if (prevSlide == 0 ) {
                prevSlide = total;
            }
            if (nextSlide > total ) {
                nextSlide = 1;
            }
            $( obj1 ).find('span').html( "0"+nextSlide );
            $( obj2 ).find('span').html( "0"+prevSlide );
        };

    },

    initMenuAjax: function(obj) {
        $(obj).each(function( id, el ) {
            console.log('aaaa '+id)
            var mLink = $(this).attr('href');
            $(this).click(function(e) {
                e.preventDefault();
                website.loadPage(mLink);

            });
        });
    },
    

    loadPage: function( obj ) {
        $('#page-content').load( obj, function( response, status, xhr ) {
            if ( status == "error" ) {
                var msg = "Sorry but there was an error: ";
                $('.error').html( msg + xhr.status + " " + xhr.statusText );
            };
            if ( status == "success" ) {

            };
        });
    },


    // Init Isotope
    initIsotope: function () {

        if( !$.isFunction( $.fn.isotope ) ) return;

        var $container = $('#iso-grid').isotope({
            itemSelector: '.grid-elem',
            masonry: {
                columnWidth: '.grid-sizer'
            },
            transitionDuration: '1s'
        });
        $container.isotope( 'on', 'layoutComplete',
            function( isoInstance, laidOutItems ) {
                //$container.isotope();
                //website.initLazyLoad( $('#container').find( website.config.lazyload ) );
            }
        );
        $container.isotope();

        $( "#sortmenu" ).selectBoxIt({
            showEffect: "slideDown",
            showEffectSpeed: 300,
            hideEffect: "slideUp",
            hideEffectSpeed: 300
        });

        $("#sortmenu").change(function() {
            var filterValue = $(this).val();
            $container.isotope({ filter: filterValue });
        });

        $("#sortmenu").bind({

            "open": function() {
                $(this).data("selectBox-selectBoxIt").dropdown.addClass("dropup");
            },
            "close": function() {
                $(this).data("selectBox-selectBoxIt").dropdown.removeClass("dropup");

            }

        });



    },


    //Init all lazy images based on .lazy class
    initLazyLoad: function( obj ) {
        if( !$.isFunction( $.fn.lazyload ) ) return;

        $(obj).show().lazyload({
            threshold : 200,
            failure_limit   : 10,
            effect : "fadeIn",
            skip_invisible : true
        });
        //$(obj).filter(":in-viewport").trigger('scroll');
    },

    //Init all fancy box galleries based on rel=lightbox-gallery
    initFancybox: function( obj ) {
        if( !$.isFunction( $.fn.fancybox ) ) return;

        $(obj).each(function( id, el ) {

            $( el ).fancybox( $.extend( {
                'transitionIn'	: 'elastic',
                'transitionOut'	: 'elastic',
                'titlePosition' : 'inside',
                'overlayColor' : '#fff',
                'overlayOpacity' : '0.9',
                'padding' : '2',
                'iframe' : {
                    scrolling : 'auto',
                    preload   : false
                }
            }, $(el).data() ) );

        });

        website.initFancyboxGallery();
    },

    //Init all fancy box galleries based on rel=lightbox-gallery
    initFancyboxGallery: function() {
        if( !$.isFunction( $.fn.fancybox ) ) return;

        var obj = '.fancybox';
        var galleries = {};
        $(obj).each(function( id, el ) {

            var rel = $(el).attr('rel');
            eval( 'galleries.'+rel+' = "'+rel+'"' );
        });

        $.each( galleries, function( id, el ) {

            el = $( '[rel='+el+']' );
            $( el ).fancybox( $.extend( {
                'transitionIn'	: 'elastic',
                'transitionOut'	: 'elastic',
                'titlePosition' : 'inside',
                'overlayColor' : '#fff',
                'overlayOpacity' : '0.9',
                'padding' : '2',
                'iframe' : {
                    scrolling : 'auto',
                    preload   : false
                }
            }, $(el).data() ) );

        });
    },

    //Init all fancy box galleries based on rel=lightbox-gallery
    initFitImage: function( obj ) {
        $(obj).each(function( id, el ) {
            website.fitImage( $(el), $(el).find('img') );
        });
    },

    //Init all section-fit
    initFitSection: function( obj ) {

        $(obj).each(function( id, el ) {

            if( $(window).width() < 600 && $(el).hasClass('no-mobilefit') ) {
                $(el).css("height", "auto" );
            }else{
                //toHeight = 'auto';

                var wHeight = $(window).height();
                var toHeight = wHeight;
                var headerHeight = $('header').height();
                var scrollMarginH = $(el).closest('section').find('.scroll-margin').actual('height');
                var percentHeight = $(el).data('percent-height');
                var percentHeightSm = $(el).data('percent-height-sm');
                var percentHeightXs = $(el).data('percent-height-xs');

                var pixelHeight = $(el).data('px-height');
                var pixelHeightSm = $(el).data('px-height-sm');
                var pixelHeightXs = $(el).data('px-height-xs');

                var offsetHeight = $(el).data('offset-height');

                var getHeight = function(h, ph) {
                    return parseInt( h * (ph/100) );
                };

                if( percentHeight ) {
                    toHeight = getHeight(wHeight,percentHeight);
                    headerHeight = getHeight(headerHeight, percentHeight);
                };
                if( $(window).width() < 979 && percentHeightSm ) {
                    toHeight = getHeight(wHeight,percentHeightSm);
                    headerHeight = getHeight(headerHeight,percentHeight);
                };
                if( $(window).width() < 768 && percentHeightXs ) {
                    toHeight = getHeight(wHeight,percentHeightXs);
                    headerHeight = getHeight(headerHeight, percentHeightXs);
                }

                if( pixelHeight ) {
                    toHeight = pixelHeight;
                    headerHeight = 0;
                };
                if( $(window).width() < 979 && pixelHeightSm ) {
                    toHeight = pixelHeightSm;
                    headerHeight = 0;
                };
                if( $(window).width() < 768 && pixelHeightXs ) {
                    toHeight = pixelHeightXs;
                    headerHeight = 0;
                }

                //offset height if needed
                if( offsetHeight ) {
                    toHeight = toHeight - offsetHeight
                };

                //if( $(window).height() < 450 ) toHeight = '450';
                //if( !$(el).hasClass('no-header') ) toHeight = toHeight-scrollMarginH;
//                if( $(window).width() < 600 && $(el).hasClass('no-mobilefit') ) toHeight = 'auto';

                //SET HEIGHT
                $(el).css("height", toHeight );
            }

        });
    },


    fitImage: function( imgFrame, imgObj ){

        $(imgFrame).css('position', 'relative' );
        $(imgFrame).css('overflow', 'hidden' );
        $(imgObj).css('position', 'absolute' );
        $(imgObj).css('max-width', 'none' );

        var frameW = $(imgFrame).actual( 'width' );
        var frameH = $(imgFrame).actual( 'height' );
        var imgW = $(imgObj).actual( 'width' );
        var imgH = $(imgObj).actual( 'height' );

        ratioW = frameW / imgW;
        ratioH = frameH / imgH;

        if ( ratioW > ratioH ) {
            $(imgObj).css("width", parseInt(frameW));
            $(imgObj).css("height", 'auto' );
        }
        else {
            $(imgObj).css("height", parseInt(frameH));
            $(imgObj).css("width", 'auto' );
        };

        imgW = $(imgObj).actual( 'width' );
        imgH = $(imgObj).actual( 'height' );

        $(imgObj).css("top", (frameH-imgH)/2);
        $(imgObj).css("left", (frameW-imgW)/2);

        $( imgObj ).load(function() { website.fitImage( imgFrame, imgObj ); });
    },

    initOrphans: function( obj ){
        $( obj ).each(function( id, el ) {
            content = $(el).html();
            if( content && content.length > 0) {
                replaced = content.replace(/(\s)([\S])[\s]+/g, "$1$2&nbsp;");
                $(el).html(replaced);
            }
        });
    },

    //Init smooth scroll plugin
    initSmoothScroll: function( obj ) {
        if( !$.isFunction( $.fn.smoothScroll ) ) return;

        $(obj).smoothScroll( { easing: 'easeInOutExpo', speed: 1000 } );
    },

    //Init  contact
    initEmails: function() {

        $('a[href^="mailto:"]').each(function( id, el ) {

            var email_encoded = $( el ).attr('href').replace('mailto:', '');
            var email = $.rot13( email_encoded );
            console.log( email_encoded + " -> " + email );

            $( el ).attr('href', $( el ).attr('href').replace( email_encoded , email) );
            $( el ).html( $( el ).html().replace( email_encoded , email) );

            if( $( el ).attr('data-original-title') )
                $( el ).attr('data-original-title', $( el ).attr('data-original-title').replace( email_encoded , email) );
        });
    },

    initAnimate: function( obj ) {

        $(obj).each(function( id, el ) {

            var type = $(el).data('animate-class');
            if( typeof type === "undefined" ) type = 'fadeIn';
            var delay = $(el).data('animate-delay');

            var event = $(el).data('animate-event');
            var eventType = $(el).data('animate-event-class');
            var event2 = $(el).data('animate-event2');
            var eventType2 = $(el).data('animate-event-class2');

            if( event ){
                $(el).bind( event, function() {
                    $(el).removeClass( type ).removeClass( eventType ).removeClass( eventType2 ).addClass( eventType );
                });
            }
            if( event2 ){
                $(el).bind( event2, function() {
                    console.log( event2 );
                    console.log( eventType2 );
                    $(el).removeClass( type ).removeClass( eventType ).removeClass( eventType2 ).addClass( eventType2 );
                });
            }

            if( delay ){
                $(el).css('opacity', 0);
                setTimeout( function(){
                    $(el).css('opacity', 1);
                    $(el).removeClass( type ).addClass( type);
                }, delay );
            }
            else{
                $(el).removeClass( type ).addClass( type);
            }
        });
    },


};

$( document ).ready( website.init );
$( document ).load( website.setup );
$( window ).resize( website.resize );
$( window ).scroll( website.scroll );