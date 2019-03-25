(function(){
    /* Full Page*/
    $('#fullpage').fullpage({
		//options here
		autoScrolling:true,
		scrollHorizontally: false,
	});

	//methods
    $.fn.fullpage.setAllowScrolling(true);
    /* */

    $('.panzoom').panzoom({
        animate: true,
        contain: 'invert',
        easing: 'ease-in-out',
        transition:true,
        startTransform:'scale(3)',
        maxScale: 3.3,
        minScale: 1,
        increment: 1.1,
        disablePan:true,  
    })

})()