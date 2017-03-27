/*
 * Global variables
 */
var gulp = require( 'gulp' ),
	scss = require( 'gulp-sass' ),
	browserSync = require( 'browser-sync' ),
	plumber = require( 'gulp-plumber' ),//エラー通知
	notify = require( 'gulp-notify' ),//エラー通知
	imagemin = require( 'gulp-imagemin' ),//画像圧縮
	imageminPngquant = require( 'imagemin-pngquant' ),//png画像の圧縮
	pleeease = require( 'gulp-pleeease' ),//ベンダープレフィックス
	useref = require( 'gulp-useref' ),//ファイル結合
	gulpif = require( 'gulp-if' ),// if文
	uglify = require( 'gulp-uglify' ),//js圧縮
	minifyCss = require( 'gulp-cssnano' ),//css圧縮
	del = require( 'del' ),//ディレクトリ削除
	runSequence = require( 'run-sequence' ),//並行処理
	ejs = require( 'gulp-ejs' ),
	sourcemaps = require( 'gulp-sourcemaps' ),
	// watch = require('gulp-watch'),
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
	gulp.src( paths.rootDir + '/top/scss/**/*.scss' )
		.pipe( sourcemaps.init() )
		.pipe( plumber( {
			errorHandler: notify.onError( 'Error: <%= error.message %>' )
		} ) )
		.pipe( scss() )
		.pipe( pleeease( {
			sass: true,
			minifier: false //圧縮の有無 true/false
		} ) )
		.pipe( sourcemaps.write( './' ) )
		.pipe( gulp.dest( paths.rootDir + '/top/css' ) );
});

/*
 * Pleeease
 */
gulp.task( 'pleeease', function() {
	return gulp.src( paths.rootDir + '/top/css/*.css' )
		.pipe( pleeease ( {
			sass: true,
			minifier: false //圧縮の有無 true/false
		} ) )
		.pipe( plumber ( {
			errorHandler: notify.onError( 'Error: <%= error.message %>' )
		} ) )
		.pipe( gulp.dest( paths.rootDir + '/top/css' ) );
});

/*
 * Imagemin
 */
gulp.task( 'imagemin', function(){
	var srcGlob = paths.srcDir + '/**/*.+(jpg|jpeg|png|gif|svg)';
	var dstGlob = paths.dstDir;
	var imageminOptions = {
		optimizationLevel: 7,
		use: imageminPngquant( {quality: '65-80', speed: 1 } )
	};

	gulp.src( srcGlob )
		.pipe( plumber ( {
			errorHandler: notify.onError( 'Error: <%= error.message %>' )
		} ) )
		.pipe( imagemin( imageminOptions ) )
		.pipe( gulp.dest( paths.dstDir ) );
});

/*
 * Useref
 */
gulp.task( 'html', function () {
	return gulp.src( paths.rootDir + '/**/*.+(html|php)' )
		.pipe( useref( {searchPath: ['.', 'dev']} ) )
		.pipe( gulpif( '*.js', uglify() ) )
		.pipe( gulpif( '*.css', minifyCss() ) )
		.pipe( gulp.dest( paths.dstrootDir ) );
});

/*
 * ejs
 */
gulp.task( 'ejs', function () {
	gulp.src( [paths.rootDir + '/ejs/**/*.ejs', '!' + paths.rootDir + '/ejs/**/_*.ejs'] )
		.pipe(plumber({
			errorHandler: notify.onError( 'Error: <%= error.message %>' )
		}))
		.pipe( ejs({}, {ext: '.html'}) )
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
				"/node_modules": "node_modules"
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
		paths.rootDir + '/top/js/**/*.js',
		paths.rootDir + '/top/css/*.css'
	];
	gulp.watch( paths.rootDir + '/ejs/**/*.ejs', ['ejs'] );
	gulp.watch( paths.rootDir + '/top/scss/**/*.scss', ['scss'] );
	gulp.watch( bsList, ['bs-reload'] );
});

/*
 * Build
 */
gulp.task( 'clean', del.bind( null, [paths.dstrootDir] ) );
gulp.task( 'devcopy', function () {
	return gulp.src([
		paths.rootDir + '/**/*.*',
		'!'+ paths.rootDir + '/css/**',
		'!'+ paths.rootDir + '/js/**',
		'!'+ paths.rootDir + '/ejs/**',
		'!'+ paths.rootDir + '/top/scss/**',
		'!'+ paths.rootDir + '/images/**',
		'!'+ paths.rootDir + '/**/*.html'
	], {
		dot: true
	}).pipe( gulp.dest( paths.dstrootDir ) );
});
gulp.task( 'build', ['clean'], function ( cb ) {
	runSequence( 'scss', 'ejs', ['html', 'imagemin', 'devcopy'], cb );
});
