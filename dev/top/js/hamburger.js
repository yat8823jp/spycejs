jQuery( function( $ ) {
	var current_scrollY; //コンテンツ位置保存
	$( '.is-hamburger__bt' ).click( function() {
		$('html').append('<div class="scrollbar" style="overflow:scroll;"></div>');
		current_scrollY = $( window ).scrollTop();
		$( 'body' ).css( {
			position: 'fixed',
			top: -1 * current_scrollY
		} ).addClass('is-hamburger--open');
		$( '.is-hamburger__bt' ).toggleClass( 'is-hamburger--active' );
		$( '.is-hamburger__bg' ).toggleClass( 'is-hamburger--active' );
		$( '.is-hamburger__menu' ).toggleClass( 'is-hamburger--active' );
	} );
	$( '.is-hamburger__menu' ).click( function() {
		event.stopPropagation();
	} );
	$( '.is-close__bt, .is-hamburger__bg' ).click( function( e ) {
		e.stopPropagation( e );
		bodyCss( current_scrollY );
		// $( '.is-hamburger__bt' ).toggleClass( 'is-hamburger--active' );
		$( '.is-hamburger__menu' ).toggleClass( 'is-hamburger--active' );
		// $( '.is-hamburger__bg' ).fadeTo( 600, 2.0 );
		$( '.is-hamburger__bg' ).toggleClass( 'is-hamburger--active' );
		$('.scrollbar').hide();
		event.preventDefault();
	} );
	function bodyCss( bodyY ) {
		$( 'body' ).css( {
			'position': 'relative',
			'top': 0
		} ).removeClass('is-hamburger--open');
	}
} );
