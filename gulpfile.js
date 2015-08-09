/*
 * Global variables
 */
var gulp = require( 'gulp' ),
	scss = require( 'gulp-ruby-sass' ),
	browserSync = require( 'browser-sync' ),
	plumber = require( 'gulp-plumber' ),//エラー通知
	notify = require( 'gulp-notify' ),//エラー通知
	imagemin = require( 'gulp-imagemin' ),//画像圧縮
	imageminPngquant = require( 'imagemin-pngquant' ),//png画像の圧縮
	pleeease = require( 'gulp-pleeease' ),//ベンダープレフィックス
	useref = require('gulp-useref'),//ファイル結合
	gulpif = require('gulp-if'),// if文
	uglify = require('gulp-uglify'),//js圧縮
	minifyCss = require('gulp-minify-css'),//css圧縮
	del = require('del'),//ディレクトリ削除
	runSequence = require('run-sequence'),//並行処理
	fs = require('fs'),//jsonファイル読み込み
	ejs = require("gulp-ejs"),
	replace = require('gulp-replace'),
	paths = {
		rootDir : 'dev',
		dstrootDir : 'htdocs/',
		srcDir : 'dev/images',
		dstDir : 'htdocs/images',
		serverDir : 'localhost'
	}



/*
 * Compass
 */
gulp.task( 'scss', function() {
	return scss( 'dev/scss/', { style: 'expanded' } )
		.pipe(plumber({
			errorHandler: notify.onError( 'Error: <%= error.message %>' )
		}))
		.pipe( gulp.dest( 'dev/css' ) );
});

/*
 * Pleeease
 */
gulp.task('pleeease', function() {
	return gulp.src( 'dev/css/*.css' )
		.pipe( pleeease({
			sass: true
		}) )
		.pipe( gulp.dest('dev/css/') );
});

/*
 * Imagemin
 */
gulp.task( 'imagemin', function(){
	var srcGlob = paths.srcDir + '/**/*.+(jpg|jpeg|gif|svg)';
	var dstGlob = paths.dstDir;
	var imageminOptions = {
		optimizationLevel: 7
	};

	gulp.src( srcGlob )
		.pipe( imagemin( imageminOptions ) )
		.pipe( gulp.dest( paths.dstDir ) );
});
gulp.task('imageminPngquant', function () {
	gulp.src( paths.srcDir + '/**/*.png' )
		.pipe( imageminPngquant( {quality: '65-80', speed: 1 } )())
		.pipe( gulp.dest( paths.dstDir ) );
});

/*
 * Useref
 */
gulp.task('html', function () {
	var assets = useref.assets();

	return gulp.src( 'dev/**/*.+(html|php|)' )
		.pipe( gulpif( '*.html', replace( '/images', '/' + paths.serverDir + '/images' ) ) )
		.pipe( gulpif( '*.html', replace( 'href="/', 'href="/' + paths.serverDir + '/' ) ) )
		.pipe( assets )
		// .pipe( gulpif( '*.js', uglify() ) )
		// .pipe( gulpif( '*.css', minifyCss() ) )
		.pipe( assets.restore() )
		.pipe( useref() )
		.pipe( gulp.dest( 'htdocs' ) );
});

/*
* ejs
*/
gulp.task('ejs', function () {
	gulp.src(["dev/ejs/*.ejs", '!' + "dev/ejs/_*.ejs"])
		.pipe(ejs())
		.pipe(plumber({
			errorHandler: notify.onError( 'Error: <%= error.message %>' )
		}))
		.pipe( gulp.dest( 'dev' ) );
});


/*
 * Browser-sync
 */
gulp.task( 'browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: 'dev',
			routes: {
				"/bower_components": "bower_components"
			}
		},
		// proxy: "localhost:8888",
		notify: true
	});
});
gulp.task( 'bs-reload', function () {
	browserSync.reload();
});

/*
 * Default
 */
gulp.task( 'default', ['browser-sync'], function() {
	var bsList = [
		'dev/**/*.html',
		'dev/**/*.php',
		'dev/js/**/*.js',
		'dev/css/*.css'
	];
	gulp.watch( 'dev/ejs/**/*.ejs', ['ejs'] );
	gulp.watch( 'dev/scss/**/*.scss', ['scss'] );
	gulp.watch( 'dev/css/*.css', ['pleeease'] );
	gulp.watch( bsList, ['bs-reload']);
});

/*
 * Build
 */
gulp.task( 'clean', del.bind( null, ['htdocs'] ) );
gulp.task( 'devcopy', function () {
	return gulp.src([
		'dev/*.*',
		'!dev/**/*.ejs',
		'!dev/*.html'
	], {
		dot: true
	}).pipe( gulp.dest( 'htdocs' ) );
});
gulp.task( 'build', ['clean'], function ( cb ) {
	runSequence( 'scss', 'ejs', ['html', 'imagemin', 'imageminPngquant', 'devcopy'], cb );
});