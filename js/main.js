
var step = 0;
var wheel = true;
var scrolling = false;


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
            
            if($(window).width() > 900){
                if (nextIndex == 1) { 
                    if(vid.paused){
                        vid.play();
                    }
                }
                    //cancel scroll when to 
                if(nextIndex == 2){
                    return false;
                }
                return false;
            }else if($(window).width() <= 900){
                $('.panzoom').panzoom({
                    disablePan: true,
                    $zoomIn:(".zoomIn"),
                    $zoomOut:(".zoomOut"),
                    $reset:(".zoomClear"),
                });
                if(nextIndex == 3){
                    return false;
                }
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
        if(wheight >= 900){

            if(step == 0){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 0px, 0px)'});
            }else if(step == 1){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 150px, 0px)'});
                $('.scroll-down').fadeIn(500);
            }else if(step == 2){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 250px, 0px)'});
                $('.scroll-down').fadeOut(500);
            }
        }

        if(wheight >= 800 && wheight <= 900){
            if(step == 0){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 0px, 0px)'});
            }else if(step == 1){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 100px, 0px)'});
                $('.scroll-down').fadeIn(500);
            }else if(step == 2){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 200px, 0px)'});
                $('.scroll-down').fadeOut(500);
            }
        }

        if(wheight>= 768 && wheight<= 800){
            if(step == 0){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 0px, 0px)'});
            }else if(step == 1){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 100px, 0px)'});
                $('.scroll-down').fadeIn(500);
            }else if(step == 2){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 150px, 0px)'});
                $('.scroll-down').fadeOut(500);
            }
        }
        if(wheight < 768){
            if(step == 0){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 0px, 0px)'});
            }else if(step == 1){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 50px, 0px)'});
                $('.scroll-down').fadeIn(500);
            }else if(step == 2){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 100px, 0px)'});
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
            startTransform: 'scale(3.3)',
            transition: true,
            duration: 800,
            maxScale: 3.3,
            minScale: 1,
            increment: 1.1,
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
                    if(step >= 3) {
                        step = 2;  
                    }
                    if(step < 0) {
                        step = 0;
                    }

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

    onResize();


    $('.location').click(function(e){
        $('.popup-location').addClass('hide');

        $('.welcome p').fadeIn(2000);
        $('.scroll-down').fadeIn(2000);
        $('.random-fade').addClass('move');
        // video-play
        vid.play();
        // logo-fim
        $('.logo-fim').fadeIn(800);
        $('.sound').fadeIn(800);
        // save attr()
        var location = $(this).attr('data-location');
        localStorage.setItem("location", location);
        // call attr()
        $('.set-movie[data-target='+location+']').addClass('active'); 
        
        scrolling = true;
    })

    $('.scroll-down').click(function(){
        if(scrolling){
            $('.panzoom').css({'-webkit-transform':'scale(1)','transform':'scale(1)', 'transition':'1s'});
            $('.join').fadeIn(2000);
            step = 2;
            textMove();
        }
    })

    $('.join').click(function(){
        $('.section-1').css({'display':'none'});
        $('.section-2').fadeIn(1700);
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
        $('.movie[data-movie='+moviego+']').fadeIn(1000); 
        $('.back').fadeIn(1800);
    });

    // button-back
    $('.back').click(function(){
        $('.movie').fadeOut(500);
        $('.section-2').fadeIn(1000);
        $('.back').fadeOut(100);
    })
     
    // button-key
    $('.bg-key').click(function(e){
        $('.bg-key').css(
            {   
                'background-color':'rgba(255, 255, 255, 0.5)',
                'transition':'all 0.8s ease-out',
                'transform':'scale(3.3)'
            },
        );
        $('.bg-key').fadeOut(800);
        $('.movie').fadeOut(800);

        // Video 3d
        setTimeout(function(){
            $('.popup-video3d').addClass('active');
        },1000)

        var target = $(this).attr('data-movie');

        var vidPlay = null;
        var VidId;

        if(target == 'bac-thay'){
            VidId = 'bac_thay';
        }
        else if(target == 'xac-uop'){
            VidId = 'xac_uop';
        }
        else if(target == 'diep-vien'){
            VidId = 'diep_vien';
        }

        var vidFile =  $(".bg-video3d[data-target='" + target + "']").attr('data-video-3d');
        $(".bg-video3d[data-target='" + target + "']").addClass('active');
        vidPlay = jwplayer(VidId).setup({
            playlist: [{
                stereomode: 'monoscopic',
                file: vidFile,
            }]
        });
        setTimeout(function(){ vidPlay.play(); },300);
    })

    $('.key').click(function(e){
        var that =  $(this);
        var keepattr = that.prev().attr('data-movie');
        $('.bg-key[data-movie='+keepattr+']').trigger('click');
    });

    $('.none-mute').click(function(){
        $(this).fadeOut(200);
        $('.mute').fadeIn(300);
        vid.prop('mute',true);
        
    });

    $('.mute').click(function(){
        $(this).fadeOut(200);
        $('.none-mute').fadeIn(200);
        vid.prop('mute',false);
    });

    // $('.button-res').click(function(){
    //     // $('.navigation').addClass('active');
    //     // $('.button-res div').addClass('active');
    //     // $('.nav li').addClass('active');
    //     // $(this).toggle('.navigation-active');

    //     $('.nav li').foreach((link,index)=>{
    //         if($('.nav li').style.animation){
    //             $('.nav li').style.animation = "";
    //         }else{
    //             $('.nav li').style.animation = `navLinksFade 0.5s ease forwards ${index / 4+0.3}s`;
    //         }
    //     });

    //     $(this).toggle('toggle');
    // });
    navSilde();

})()
function navSilde(){
    var navresbutton = document.querySelector('.button-res');
    var nav = document.querySelector('.navigation');
    var navLinks = document.querySelectorAll('.nav li');
    var butcolor = document.querySelectorAll('.button-res div');

    navresbutton.addEventListener('click',()=>{
        // Toggle Nav
        nav.classList.toggle('navigation-active');
        // Animaton Links
        navLinks.forEach((link,index)=>{
            if(link.style.animation){
                link.style.animation = "";
            }else{
                link.style.animation = `navLinksFade 0.5s ease forwards ${index / 7+0.3}s`;
            }
        });
        // Toggle
        navresbutton.classList.toggle('toggle');
        // butcolor.removeClass('active');
        // $('.button-res div').toggle('toggle');
    })
}

function onResize(){
    //Middle box
    var Ratio = $(window).height() / $(window).width();
    var delPan  = 80;
    if($(window).height() <= 700){
        delPan = 90;
    }
    if(Ratio > 0.61){
        delPan = 20;
    }
    $('.panzoom').css({'margin-top': -(($(window).width()*0.7305)/2 + delPan)});
}