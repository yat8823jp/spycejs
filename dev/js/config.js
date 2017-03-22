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

	//ドロワーメニュー 開閉
	$( '.p-snavi__menu__item__bt' ).click( function() {
		if( $( this ).children().hasClass( 'u-arrow--top' ) ) {
			$( this ).children( '.u-arrow--top' ).addClass( 'u-arrow--bottom' );
			$( this ).children( '.u-arrow--top' ).removeClass( 'u-arrow--top' );
		} else if( $( this ).children().hasClass( 'u-arrow--bottom' ) ) {
			$( this ).children( '.u-arrow--bottom' ).addClass( 'u-arrow--top' );
			$( this ).children( '.u-arrow--bottom' ).removeClass( 'u-arrow--bottom' );
		}
		$( this ).parent().next( '.is-close' ).slideToggle();
	} );

	//トップ固定
	$( window ).scroll( function() {
		if( $( window ).scrollTop() > 50 ) {
	  		$( '.l-header' ).addClass( 'fixed' );
		} else {
			$( '.l-header' ).removeClass( 'fixed' );
		}
	} );

});
