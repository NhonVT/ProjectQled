
var step = 0;
var wheel = true;
var scrolling = false;
var vidPlay = null;
var vid = document.getElementById('myVideo');
    
    function scrollDelay(){
        wheel = true;
    } 

    // Fade Text
    (function($){
        function injector(t, splitter, klass, after) {
            var a = t.text().split(splitter), inject = '';
            if (a.length) {
                $(a).each(function(i, item) {
                    inject += '<span class="'+klass+(i+1)+'">'+item+'</span>'+after;
                });	
                t.empty().append(inject);
                
            }
        }
        var methods = {
            init : function() {
    
                return this.each(function() {
                    injector($(this), '', 'char', '');
                });
    
            },
            words : function() {
    
                return this.each(function() {
                    injector($(this), ' ', 'word', ' ');
                });
    
            },
            
            lines : function() {
    
                return this.each(function() {
                    var r = "eefec303079ad17405c889e092e105b0";
                    injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
                });
    
            }
        };
        $.fn.lettering = function( method ) {
            // Method calling logic
            if ( method && methods[method] ) {
                return methods[ method ].apply( this, [].slice.call( arguments, 1 ));
            } else if ( method === 'letters' || ! method ) {
                return methods.init.apply( this, [].slice.call( arguments, 0 ) ); // always pass an array
            }
            $.error( 'Method ' +  method + ' does not exist on jQuery.lettering' );
            return this;
    };
    
    })(jQuery);

(function(){
  
    /* Full Page*/
    $('#fullpage').fullpage({
		//options here
        lockAnchors: false,
        slidesNavigation: true,
        scrollingSpeed: 800,
        autoScrolling:true,
        scrollBar: false,
        fitToSection: true,
        onLeave: function(index, nextIndex, direction) {
            if (nextIndex == 1) { 
                if(vid.paused){
                    vid.play();
                }
            }
            //cancel scroll when to 
            if(nextIndex == 2){
                return false;
            }
            if(nextIndex == 3){
                return false;
            }  
        }
    });
    
    if($(window).width() > $(window).height() && $(window).width() <= 1100){
        $('#fullpage').fullpage.setAutoScrolling(false);

    }else{
        $('#fullpage').fullpage.setAutoScrolling(true);
    }
    
    function textMove(){
        var wheight = $(window).height();
        if(wheight >= 920){

            if(step == 0){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 0px, 0px)'});
            }else if(step == 1){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 140px, 0px)'});
                $('.scroll-down').fadeIn(500);
            }else if(step == 2){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 250px, 0px)'});
                $('.scroll-down').fadeOut(500);
            }
    
        }
    }
  
    /* Scale Video */
    if($('.panzoom').length){
        $('.panzoom').panzoom({
            $zoomIn: $(".zoomIn"),
            $zoomOut: $(".zoomOut"),
            animate: true,
            startTransform: 'scale(3)',
            transition: true,
            duration: 800,
            maxScale: 3,
            minScale: 1,
            increment: 1,
            disablePan:true,  
        });
        $('.panbox').on('wheel',function(e){
           
            if(scroll){
                if(!wheel){
                    return false;
                }else{
                    wheel = false;
                    if(e.originalEvent.deltaY > 0){
                        step++;
                        $(".zoomOut").trigger('click');
                        $('.join').fadeIn(2000);
                        
                    }else{
                        step--;
                        $(".zoomIn").trigger('click');
                    } 
                    if(step >= 3) step = 2;
                    if(step < 0) step = 0;

                    textMove();
                    setTimeout(scrollDelay,300);
                }  
            }
        });
    }


    $(".random-fade h3").lettering('lines').children('span').lettering();
    $(".random-fade h3 > span span").each(function(index, element) {
        var delay = Math.random();
        $(this).css({'-webkit-animation-delay': delay + 's', 'animation-delay': delay + 's'});
    });


    $('.location').click(function(e){
        $('.popup-location').addClass('hide');

        $('.welcome p').fadeIn(2000);
        // $('.join').fadeIn(2000);
        $('.scroll-down').fadeIn(2000);
        $('.random-fade').addClass('move');
        // video-play
        vid.play();
        // save attr()
        var location = $(this).attr('data-location');
        localStorage.setItem("location", location);
        // call attr()
        $('.set-movie[data-target='+location+']').addClass('active'); 
        
        scrolling = true;
    })

    $('.scroll-down').click(function(){
        if(scroll){
            $('.panzoom').css({'-webkit-transform':'scale(1)','transform':'scale(1)'});
            step = 2;
            textMove();
        }
    })

    $('.join').click(function(){
        $('.section-1').css({'display':'none'});
        $('.section-2').fadeIn(1500);
        $('.scroll-down').fadeOut(150);
    })

    $('.key').on('mouseenter',function(){
        $('.bg-movie').css({'transform':'scale(1.2)'});
    }).on('mouseleave',function(){
        $('.bg-movie').css({'transform':'scale(1)'});
    })

    $('.box-item-movie').click(function(){
        $('.section-2').fadeOut(200);
        // save attr()
        var moviego = $(this).attr('data-movie-go');
        localStorage.setItem("moviego", moviego);
        // call attr()
        $('.movie[data-movie='+moviego+']').fadeIn(250); 
        $('.back').fadeIn(1800);
    });

    // button-back
    $('.back').click(function(){
        $('.movie').fadeOut(500);
        $('.section-2').fadeIn(1000);
        $('.back').fadeOut(100);
    })

    
    // button-key
    $('.bg-key').click(function(){
        $('.bg-key').css(
            {   
                'background-color':'rgba(255, 255, 255, 0.5)',
                'transition':'all 0.5s ease-out',
                'transform':'scale(3.3)'
            },
        );
        $('.bg-key').fadeOut(800);
        $('.movie').fadeOut(800);
        // 3d
        $('.popup-video3d').addClass('active');

        var target = $('.bg-key').attr('data-movie');
        console.log(target);
        var VidId = 'bac_thay';
        console.log(VidId);
        var vidFile =  $(".bg-video3d[data-target='" + target + "']").attr('data-video-3d');
        vidPlay = jwplayer(VidId).setup({
            playlist: [{
                stereomode: 'monoscopic',
                file: vidFile,
            }]
        });
        setTimeout(function(){ vidPlay.play(); },300);
    })

    $('.key').click(function(){
        $('.bg-key').trigger('click');
    })

})()