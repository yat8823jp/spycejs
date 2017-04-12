jQuery( function( $ ) {
	//init
	var dispW;
	var slickimg = $( '.is-slider--mainvisual' );
	$( window ).on( 'load resize', function() {
		initW();
	} );
	$( '.is-slider--mainvisual' ).slick( {
		autoplay: true,
		dots: true,
		autoplaySpeed: 6000,
		speed: 900,
		arrows: true
	} );
	$( '.is-slider--insert__information' ).slick( {
		arrows: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '30px'
	} );
	$( '.is-slider--insert__pickup' ).slick( {
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
		arrows: false
	} );

	//ウィンドウサイズを取得して画像のサイズにあてる
	function initW() {
		dispW = $( window ).width();
		$( 'body' ).css( { width: dispW } );
		slickimg.find( 'img' ).width( dispW );
	}

	//ドロワーメニュー 開閉
	$( '.p-snavi__menu__item__togglebt' ).click( function() {
		$( window ).on( 'load resize', function() {
			initW();
		} );
		if( $( this ).children( "i" ).hasClass( 'u-arrow--top' ) ) {
			$( this ).children( "i" ).addClass( 'u-arrow--bottom' );
			$( this ).children( "i" ).removeClass( 'u-arrow--top' );
		} else if( $( this ).children( "i" ).hasClass( 'u-arrow--bottom' ) ) {
			$( this ).children( "i" ).addClass( 'u-arrow--top' );
			$( this ).children( "i" ).removeClass( 'u-arrow--bottom' );
		}
		$( this ).parent().next( '.is-open' ).slideToggle( "", function() {
			$( this ).prev().toggleClass( 'u-border--bottom0' );
		} );
		$( this ).parent().next( '.is-close' ).slideToggle( "", function() {
			$( this ).prev().toggleClass( 'u-border--bottom0' );
		} );
		return false;
	} );




	//トップ固定
	$( window ).scroll( function() {
		if( $( window ).scrollTop() > 1 ) {
			$( window ).on( 'load resize', function() {
				initW();
			} );
	  		$( '.l-header' ).addClass( 'fixed' );
		} else {
			$( window ).on( 'load resize', function() {
				initW();
			} );
			if( ! $( '.is-hamburger__bt' ).hasClass( 'is-hamburger--active' ) ) {
				$( '.l-header' ).removeClass( 'fixed' );
			}
		}
	} );

	//高さ揃え
	$( '.is-height .is-height__item' ).heightLine();
});
