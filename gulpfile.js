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
	useref = require( 'gulp-useref' ),//ファイル結合
	gulpif = require( 'gulp-if' ),// if文
	uglify = require( 'gulp-uglify' ),//js圧縮
	minifyCss = require( 'gulp-minify-css' ),//css圧縮
	del = require( 'del' ),//ディレクトリ削除
	runSequence = require( 'run-sequence' ),//並行処理
	ejs = require( 'gulp-ejs' ),
	replace = require( 'gulp-replace' ),
	paths = {
		rootDir : 'dev',
		dstrootDir : 'htdocs',
		srcDir : 'dev/images',
		dstDir : 'htdocs/images',
		serverDir : 'localhost'
	}

/*
 * Sass
 */
gulp.task( 'scss', function() {
	return scss( paths.rootDir + '/scss/', { style: 'expanded' } )
		.pipe(plumber({
			errorHandler: notify.onError( 'Error: <%= error.message %>' )
		}))
		.pipe( gulp.dest( paths.rootDir + '/css' ) );
});

/*
 * Pleeease
 */
gulp.task('pleeease', function() {
	return gulp.src( paths.rootDir + '/css/*.css' )
<<<<<<< HEAD
	.pipe($.plumber({
		errorHandler: function(error) {
			var title = '[task]' + taskName + ' ' + error.plugin;
			var errorMsg = 'error: ' + error.message;
			console.error(title + '\n' + errorMsg); // node-notifierがデスクトップ通知をしてくれる
			notifier.notify({
				title: title,
				message: errorMsg,
				time: 3000
			});
		}
	}))
	.pipe( pleeease({
		sass: true
	}) )
	.pipe( gulp.dest( paths.rootDir + '/css' ) );
=======
		.pipe( pleeease({
			sass: true
		}) )
		.pipe( gulp.dest( paths.rootDir + '/css' ) );
>>>>>>> ec0a622259a5824e4fe83afa08ee3883640d20ee
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

	return gulp.src( paths.rootDir + '/**/*.+(html|php)' )
		.pipe( gulpif( '*.html', replace( '/images', '/' + paths.serverDir + '/images' ) ) )
		.pipe( gulpif( '*.html', replace( 'href="/', 'href="/' + paths.serverDir + '/' ) ) )
		.pipe( assets )
		.pipe( gulpif( '*.js', uglify() ) )
		.pipe( gulpif( '*.css', minifyCss() ) )
		.pipe( assets.restore() )
		.pipe( useref() )
		.pipe( gulp.dest( paths.dstrootDir ) );
});

/*
* ejs
*/
gulp.task( 'ejs', function () {
	gulp.src( [paths.rootDir + '/ejs/*.ejs', '!' + paths.rootDir + '/ejs/_*.ejs'] )
		.pipe(ejs())
		.pipe(plumber({
			errorHandler: notify.onError( 'Error: <%= error.message %>' )
		}))
		.pipe( gulp.dest( paths.rootDir ) );
});


/*
 * Browser-sync
 */
gulp.task( 'browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: paths.rootDir,
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
		paths.rootDir + '/**/*.html',
		paths.rootDir + '/**/*.php',
		paths.rootDir + '/js/**/*.js',
		paths.rootDir + '/css/*.css'
	];
	gulp.watch( paths.rootDir + '/ejs/**/*.ejs', ['ejs'] );
	gulp.watch( paths.rootDir + '/scss/**/*.scss', ['scss'] );
	gulp.watch( paths.rootDir + '/css/*.css', ['pleeease'] );
	gulp.watch( bsList, ['bs-reload']);
});

/*
 * Build
 */
gulp.task( 'clean', del.bind( null, [paths.dstrootDir] ) );
gulp.task( 'devcopy', function () {
	return gulp.src([
		paths.rootDir + '/*.*',
		'!'+ paths.rootDir + '/**/*.ejs',
		'!'+ paths.rootDir + '/*.html'
	], {
		dot: true
	}).pipe( gulp.dest( paths.dstrootDir ) );
});
gulp.task( 'build', ['clean'], function ( cb ) {
	runSequence( 'scss', 'ejs', ['html', 'imagemin', 'imageminPngquant', 'devcopy'], cb );
});