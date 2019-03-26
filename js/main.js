(function(){
    
    /* Full Page*/
    $('#fullpage').fullpage({
		//options here
		autoScrolling:true,
        scrollHorizontally: false,
        
        lockAnchors: false,
        slidesNavigation: true,
        scrollingSpeed: 800,
        autoScrolling:true,
        scrollBar: false,
        fitToSection: false,
	});

	//methods
    $.fn.fullpage.setAllowScrolling(true);
    /* Scale Video */
    if($('.panzoom').length){
        $('.panzoom').panzoom({
            $zoomIn: $(".zoomIn"),
            $zoomOut: $(".zoomOut"),
            animate: true,
            startTransform: 'scale(3)',
            transition: true,
            duration: 1500,
            maxScale: 3,
            minScale: 1,
            increment: 1,
            disablePan:true,  
        });
        $('.panbox').on('wheel',function(e){
            e.preventDefault();
            if(e.originalEvent.deltaY > 0){
                $(".zoomOut").trigger('click');
                $(".welcome").css({'transform': 'translate3d(0px, 100px, 0px)'});
            }else{
                $(".zoomIn").trigger('click');
                $(".welcome").css({'transform': 'translate3d(0px, 0px, 0px)'});
            }
        });
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

    $(".random-fade h3").lettering('lines').children('span').lettering();
    $(".random-fade h3 > span span").each(function(index, element) {
        var delay = Math.random();
        $(this).css({'-webkit-animation-delay': delay + 's', 'animation-delay': delay + 's'});
    });

    $('.location').click(function(e){
        $('.popup-location').addClass('hide');
        // $('.content-video').fadeIn(2000)
        $('.welcome p').fadeIn(2000);
        $('.join').fadeIn(2000);
        $('.scroll-down').fadeIn(2000);
        // $('.demo').revealing();
        $('.random-fade').addClass('move');
    })
    $('.join').click(function(){
        $('.section-1').css({'opacity':'0'});
        $('.section-2').css({'display':'block'});
    })
   

})()