jQuery( function( $ ) {
	$( '.is-slider--mainvisual' ).slick( {
		autoplay: true,
		dots: true,
		arrows: false,
		autoplaySpeed: 6000,
		speed: 900
	} );
	$( '.is-slider--insert__information' ).slick( {
		autoplay: true,
		arrows: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '30px'
	} );
	$( '.is-slider--insert__pickup' ).slick( {
		autoplay: true,
		arrows: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '80px'
	} );
	$( '.is-slider--ranking' ).slick( {
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		arrows: false
	} );

	//ドロワーメニュー 開閉
	$( '.p-snavi__menu__item__togglebt' ).click( function() {
		if( $( this ).children( "i" ).hasClass( 'u-arrow--top' ) ) {
			$( this ).children( "i" ).addClass( 'u-arrow--bottom' );
			$( this ).children( "i" ).removeClass( 'u-arrow--top' );
		} else if( $( this ).children( "i" ).hasClass( 'u-arrow--bottom' ) ) {
			$( this ).children( "i" ).addClass( 'u-arrow--top' );
			$( this ).children( "i" ).removeClass( 'u-arrow--bottom' );
		}
		$( this ).parent().next( '.is-open' ).slideToggle();
		$( this ).parent().next( '.is-close' ).slideToggle();
	} );

	//トップ固定
	$( window ).scroll( function() {
		if( $( window ).scrollTop() > 1 ) {
	  		$( '.l-header' ).addClass( 'fixed' );
		} else {
			$( '.l-header' ).removeClass( 'fixed' );
		}
	} );
});
