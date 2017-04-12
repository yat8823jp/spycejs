jQuery( function( $ ) {
	var current_scrollY = 0; //コンテンツ位置保存
	$( '.is-hamburger__bt' ).click( function() {
		event.stopPropagation();
		$('html').append('<div class="scrollbar" style="overflow:scroll;"></div>');
		current_scrollY = $( window ).scrollTop();
		$( 'body' ).addClass( 'is-hamburger--open' );
		$( '.is-hamburger__bt' ).toggleClass( 'is-hamburger--active' );
		$( '.is-hamburger__bg' ).toggleClass( 'is-hamburger--active' );
		$( '.is-hamburger__menu' ).toggleClass( 'is-hamburger--active' );
		return false;
	} );
	$( '.is-hamburger__menu' ).click( function() {
		event.stopPropagation();
		$( 'body' ).addClass( 'is-hamburger--open' );
		return false;
	} );
	$( '.is-close__bt, .is-hamburger__bg' ).click( function( e ) {
		e.stopPropagation( e );
		$( 'body' ).removeClass( 'is-hamburger--open' );
		$( 'html, body' ).prop( { scrollTop: current_scrollY } );
		$( '.is-hamburger__bt' ).toggleClass( 'is-hamburger--active' );
		$( '.is-hamburger__menu' ).toggleClass( 'is-hamburger--active' );
		$( '.is-hamburger__bg' ).toggleClass( 'is-hamburger--active' );
		$('.scrollbar').hide();
		event.preventDefault();
		return false;
	} );
} );
