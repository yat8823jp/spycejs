jQuery( function( $ ) {
	$( '.is-slider--mainvisual' ).slick( {
		autoplay: true,
		dots: true,
		arrows: false
	} );
	$( '.is-slider--insert' ).slick( {
		autoplay: true,
		arrows: false
	} );
	$( '.is-slider--ranking' ).slick( {
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		arrows: false
	} );

	$( window ).scroll( function() {
		if( $( window ).scrollTop() > 50 ) {
	  		$( '.l-header' ).addClass( 'fixed' );
		} else {
			$( '.l-header' ).removeClass( 'fixed' );
		}
	} );

});
