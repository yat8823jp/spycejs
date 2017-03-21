jQuery( function( $ ) {
	$( '.is-hamburger__bt' ).click( function() {
		$('html').append('<div class="scrollbar" style="overflow:scroll;"></div>');
		var scrollsize = window.innerWidth - $('.scrollbar').prop('clientWidth');
		current_scrollY = $( window ).scrollTop();
		if( $( this ).hasClass( 'is-hamburger--active' ) ){
			bodyCss();
			$( 'html, body' ).prop( { scrollTop: now_scrollY} );
			$('.scrollbar').hide();
		} else {
			now_scrollY = $( window ).scrollTop();
			$( 'body' ).css( {
				position: 'fixed',
				top: -1 * current_scrollY
			} );
		}
		$( this ).toggleClass( 'is-hamburger--active' );
		$( '.is-hamburger__bg' ).toggleClass( 'is-hamburger--active' );
		$( '.is-hamburger__menu' ).toggleClass( 'is-hamburger--active' );
		return false;
	} );
	$( '.is-close__bt' ).click( function( e ) {
		e.stopPropagation();
		bodyCss();
		$( 'html, body' ).prop( { scrollTop: current_scrollY } );
		$( '.is-hamburger__bt' ).toggleClass( 'is-hamburger--active' );
		$( '.is-hamburger__menu' ).toggleClass( 'is-hamburger--active' );
		$( '.is-hamburger__bg' ).toggleClass( 'is-hamburger--active' );
		$('.scrollbar').hide();
		return false;
	} );
	function bodyCss() {
		$( 'body' ).css( {
			position: 'static'
		} );
	}
} );
