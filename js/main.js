
var step = 0;
var wheel = true;
var scrolling = false;
var loading = true;


var vid = document.getElementById('myVideo');
var movie = $('.movie');
    
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
        onLeave: function(origin, nextIndex, direction) {
            
            if($(window).width() > 1024){
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
            }else if($(window).width() <= 1024){
                if(!scrolling){
                    
                    return false;
                }else{
                   
                    if (nextIndex == 1) { 
                        $('.scroll-down').fadeIn(100);
                        
                        if(vid.paused){
                            vid.play();
                        }
                    }
                    if(nextIndex == 2){
                        $('.scroll-down').fadeOut(100);
                        $('.monitor').addClass('active');
                    }
                    if(nextIndex == 3){
                        $('.scroll-down').fadeOut(100);
                    }
                    if(nextIndex == 4){
                        return false;
                    }
                }      
            }
            scrolling = true;
        }
    });
    
    if($(window).width() > $(window).height() && $(window).width() <= 1100){
        $('#fullpage').fullpage.setAutoScrolling(false);
    }else{ 
        $('#fullpage').fullpage.setAutoScrolling(true);
    }
    // mute sp
    if($(window).width() <= 1024){
        $('#myVideo').prop('muted',true);
    }
    
    function textMove(){
        var wheight = $(window).height();
        if(wheight >= 900){
            if(step == 0){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 0px, 0px)'});
                $('.logo-fim').fadeIn(200);
                $('.logo-fim-small').fadeOut(100);
            }else if(step == 1){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 150px, 0px)'});
                $('.scroll-down').fadeIn(500);
                $('.logo-fim').fadeOut(200);
                $('.logo-fim-small').fadeOut(100);
                $('.monitor').addClass('active');
            }else if(step == 2){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 250px, 0px)'});
                $('.scroll-down').fadeOut(500);
                $('.logo-fim').fadeOut(200);
                $('.logo-fim-small').fadeIn(200);
            }
        }

        if(wheight >= 800 && wheight <= 900){
            if(step == 0){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 0px, 0px)'});
                $('.logo-fim').fadeIn(200);
                $('.logo-fim-small').fadeOut(100);
            }else if(step == 1){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 100px, 0px)'});
                $('.scroll-down').fadeIn(500);
                $('.logo-fim').fadeOut(200);
                $('.logo-fim-small').fadeOut(100);
                $('.monitor').addClass('active');

            }else if(step == 2){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 200px, 0px)'});
                $('.scroll-down').fadeOut(500);
                $('.logo-fim').fadeOut(200);
                $('.logo-fim-small').fadeIn(200);
            }
        }

        if(wheight>= 768 && wheight<= 800){
            if(step == 0){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 0px, 0px)'});
                $('.logo-fim').fadeIn(200);
                $('.logo-fim-small').fadeOut(100);
            }else if(step == 1){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 100px, 0px)'});
                $('.scroll-down').fadeIn(500);
                $('.logo-fim').fadeOut(200);
                $('.logo-fim-small').fadeOut(100);
                $('.monitor').addClass('active');
            }else if(step == 2){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 150px, 0px)'});
                $('.scroll-down').fadeOut(500);
                $('.logo-fim').fadeOut(200);
                $('.logo-fim-small').fadeIn(200);
            }
        }
        if(wheight < 768){
            if(step == 0){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 0px, 0px)'});
            }else if(step == 1){
                $('.content-video .welcome').css({'transform':'translate3d(0px, 50px, 0px)'});
                $('.scroll-down').fadeIn(500);
                $('.monitor').addClass('active');
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
           
            if(scrolling){
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
        if($(window).width() <= 1024){
            $('.monitor').addClass('active');
            $('#fullpage').fullpage.moveTo(2);
        }
    })

    $('.join').click(function(){
        $('.section-1').css({'display':'none'});
        $('.section-2').fadeIn(1700);
        $('.scroll-down').fadeOut(150);
        $('#myVideo').prop('muted',true);
    })



    $('.box-item-movie a').click(function(e){

        var url = $(this).attr('href');
        if(loading){
            loading = false;
            $('.popup-content').addClass('active');
            $('.back').fadeIn(1500);
            popLoad(url);   
        }
        return false;
    });

    $('.back').click(function(e){
        $('.back').fadeOut(500);
        $('.popup-content').animate({'opacity':0}, 500, 'linear',function(){
            $('.popup-content').html('');
            $('.popup-content').removeClass('active');
        })
    })

    // button-key
    $('.popup-content').on('click',function(e){
        $('.popup-content .bg-key').css(
            {   
                'background-color':'rgba(255, 255, 255, 0.5)',
                'transition':'all 0.8s ease-out',
                'transform':'scale(3.3)'
            },
        );
        // $('.popup-content').fadeOut(600);
        $('.back').fadeOut(500)
        // $('.popup-content .movie').fadeOut(800);

        setTimeout(function(){
            $('.popup-content').removeClass('active');
        },800)

        // $('.popup-content').removeClass('active');


        // Video 3d
        setTimeout(function(){

            $('.popup-video3d').addClass('active');
        },1000)

        var target = $('.bg-key').attr('data-movie');

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
    });

    $('.key').click(function(e){
        var that =  $(this);
        var keepattr = that.prev().attr('data-movie');
        $('.bg-key[data-movie='+keepattr+']').trigger('click');
    });

    $('.none-mute').click(function(){
        // $('.none-mute').addClass('hide');
        $('.mute').addClass('active');
        $('.none-mute').addClass('hide');
        $('#myVideo').prop('muted',true);
        
    });
    $('.mute').click(function(){
        $('.mute').removeClass('active');
        $('.none-mute').removeClass('hide');
        $('#myVideo').prop('muted',false);
    });

    // nav
    navSilde();

   


})()
function navSilde(){
    var navresbutton = document.querySelector('.button-res');
    var nav = document.querySelector('.navigation');
    var navLinks = document.querySelectorAll('.nav li');
    var butcolor = document.querySelectorAll('.button-res div');
    var that = $('.button-res div');
    var godown = $('.scroll-down');
    navresbutton.addEventListener('click',()=>{
        
        // Toggle Nav
        nav.classList.toggle('navigation-active');

        if(that.hasClass('active')){
            that.removeClass('active');
            $('.line1').css({'transform':'rotate(0) translate(0)','transition':'all 0.3s ease-out'});
            $('.line2').css({'opacity':'1','transition':'all 0.3s ease-out'});
            $('.line3').css({'transform':'rotate(0) translate(0)','transition':'all 0.3s ease-out'});
        }
        else{
            that.addClass('active');
            $('.line1').css({'transform':'rotate(-46deg) translate(-4px,5px)','transition':'all 0.3s ease-out'});
            $('.line2').css({'opacity':'0','transition':'all 0.3s ease-out'});
            $('.line3').css({'transform':'rotate(46deg) translate(-7px,-9px)','transition':'all 0.3s ease-out'});
        }

        // scroll
        

        // Animaton Links
        navLinks.forEach((link,index)=>{
            if(link.style.animation){
                link.style.animation = "";
            }else{
                link.style.animation = `navLinksFade 0.5s ease forwards ${index / 7+0.3}s`;
            }      
        });
        // Toggle
        navresbutton.classList.toggle('active');
    })
}
function popLoad(url) {
    $.ajax({url: url, cache: false, success: function(data) {
        $('.popup-content').animate({'opacity':1}, 200, 'linear',function(){
            $('.popup-content').html(data);
            $('.key').on('mouseenter',function(){
                $('.bg-movie').css({'transform':'scale(1.2)'});
            }).on('mouseleave',function(){
                $('.bg-movie').css({'transform':'scale(1)'});
            });    
            loading = true;
        }); 
    }});

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