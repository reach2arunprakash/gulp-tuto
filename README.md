Apprendre Gulp
===

Gulp est un système de build comparable à Grunt qui se base sur le système de "stream" de NodeJS pour effectuer des tâches plus ou moins complexes.

Step 0 : Installation
---
La première étape consiste à installer gulp en tant que module global npm et à l'enregristrer parmi les dépendances de développement de votre projet:

	npm install -g gulp
	mkdir myapp
	cd myapp
	npm init
	npm install --save-dev gulp
	
A partir de là Gulp est installé et prêt à exécuter toutes les tâches de build de votre projet. Il manque néanmoins une étape pour que Gulp soit complètement fonctionnel : le `gulpfile.js`

	touch gulpfile.js

Step 1 : Les tâches
---
Le `gulpfile` est un fichier javascript qui va contenir toutes les tâches que gulp va pouvoir effectuer pour vous. La première tâche à configurer est la tâche par défaut. Ajoutez la commande suivante dans votre gulpfile : 

	var gulp = require('gulp');
 
	gulp.task('default', function() {
		console.log('Hello world.');
	});
	
Sauvegardez et exécutez la commande `gulp` vous devriez avoir une sortie qui ressemble à ça : 

	[14:35:37] Using gulpfile ~/Dev/tutorials/jdev2015/gulp-tuto/gulpfile.js
	[14:35:37] Starting 'default'...
	Hello world.
	[14:35:37] Finished 'default' after 106 μs
	
Les tâches Gulp peuvent également être décomposées et chaînées. Modifiez le fichier `gulpfile.js` de la manière suivante :

	var gulp = require('gulp');
	
	gulp.task('hello', function () {
	  console.log("Hello, ");
	});
	
	gulp.task('world', function () {
	  console.log("world!");
	});
	
	gulp.task('default', ['hello', 'world']);

Nous avons défini deux tâches distinctes et la tâche par défaut qui appelle les deux autres. Vous pouvez essayer les commandes suivantes :

	gulp hello
	gulp world
	gulp
	
L'ordre dans lequel les tâches sont chaînées compte, par exemple si on remplace le code de la tâche par défaut avec `gulp.task('default', ['world', 'hello']);`, nous verrons que la tâche `world` est appellée avant la tâche `hello`.

Step 2 : Les instructions de base
---

Gulp propose quelques instructions de base pour la manipulation des fichiers et des dossiers.

* `gulp.src` : sélectionne un ensemble de fichiers sources
* `pipe` : opérateur qui permet de chainer les opérations
* `gulp.dest` : copie le résultat de la chaine de traitement vers un répertoire de destination.

Modifions à présent la structure du répertoire de manière à avoir le squelette d'une application qui ressemblerait à cela : 

	.
	├── README.md
	├── client
	│   ├── app
	│   │   ├── app.js
	│   │   ├── collections
	│   │   │   └── collections.js
	│   │   ├── models
	│   │   │   └── models.js
	│   │   └── views
	│   │       └── views.js
	│   ├── assets
	│   │   ├── favicon.ico
	│   │   ├── images
	│   │   │   └── shlurp.png
	│   │   └── styles
	│   │       └── style.css
	│   └── index.html
	├── gulpfile.js
	├── node_modules
	└── package.json

Editez le fichier `index.html` 

	<!DOCTYPE html>
	<html>
	<head lang="en">
	    <meta charset="UTF-8">
	    <title>My App</title>
	    <link rel="shortcut icon" href="img/favicon.ico">
	    <link rel="stylesheet" type="text/css" href="css/style.css">
	</head>
	<body>
	
		<h1>Gulp rocks!</h1>
	    <p><img src="img/shlurp.png"/></p>
	    
	<!-- Scripts -->
	<script src="js/models/models.js"></script>	<script src="js/collections/collections.js"></script>
	<script src="js/views/views.js"></script>
	<script src="js/app.js"></script>
	<!-- /Scripts -->
	
	</body>
	</html>
		
Editez le fichier `app.js`

	console.log("Application has started..."); 

Editez le fichier `models.js`

	console.log("Models have been loaded.");

Editez le fichier `collections.js`

	console.log("Collections have been loaded.");

Editez le fichier `views.js`

	console.log("Views have been loaded.");

A présent, pour illustrer le fonctionnement des instructions de base de Gulp, nous allons éditer le `gulpfile` de la manière suivante :

	var gulp = require('gulp');

	// Scripts
	gulp.task('scripts', function () {
		return gulp.src('./client/app/**/*.js')
			.pipe(gulp.dest('./dist/js'));
	});

	// Stylesheets
	gulp.task('styles', function () {
		return gulp.src('./client/assets/**/*.css')
			.pipe(gulp.dest('./dist/css'));
	});

	// Images
	gulp.task('images', function () {
		return gulp.src(['./client/assets/**/*.png', './client/assets/**/*.ico'])
			.pipe(gulp.dest('./dist/img'));
	});
	
	// HTML
	gulp.task('html', function () {
		return gulp.src('./client/**/*.html')
			.pipe(gulp.dest('./dist'));
	});
	
	// Default
	gulp.task('default', ['html', 'scripts', 'styles', 'images']);

Nous avons donc défini trois tâches de base qui vont respectivement sélectionner les fichiers de l'application par leur extension et les copier dans le répertoire "dist". La commande par défaut va exécuter toutes ces tâches les unes après les autres.

	$ gulp
	[15:37:18] Using gulpfile ~/Dev/tutorials/gulp/gulp-tuto/gulpfile.js
	[15:37:18] Starting 'html'...
	[15:37:18] Finished 'html' after 5.94 ms
	[15:37:18] Starting 'scripts'...
	[15:37:18] Finished 'scripts' after 1.68 ms
	[15:37:18] Starting 'styles'...
	[15:37:18] Finished 'styles' after 749 μs
	[15:37:18] Starting 'default'...
	[15:37:18] Finished 'default' after 2.49 μs

Un petit coup d'oeil sur le dossier 'dist' qui a été créé : 

	$ tree ./dist
	./dist
	├── css
	│   └── style.css
	├── img
	│   ├── favicon.ico
	│   └── shlurp.png
	├── index.html
	└── js
	    ├── app.js
	    ├── collections
	    │   └── collections.js
	    ├── models
	    │   └── models.js
	    └── views
	        └── views.js

Il ne reste plus qu'à afficher tout ça dans le navigateur :

	$ open ./dist/index.html

Bien que cela puisse déjà s'avérer utile, ce n'est qu'un début.   
Comme nous allons le voir, Gulp peut faire bien plus que ça.


Step 3 : Les plugins
---

Gulp dispose d'une [masse impressionante de plugins](http://gulpjs.com/plugins/) et la communauté des utilisateurs de Gulp continue d'en rajouter en permance.

Les plugins permettent d'appliquer des traitements très variés entre le moment où les fichiers sont sélectionnés par l'instruction `gulp.src`et le moment où ils sont copiés dans avec `gulp.dest`. Ces plugins sont appliqués grâce à l'instruciton `pipe`.

L'instruction type dans Gulp est donc de la forme suivante :

	gulp.src(<selecteurs>, <options>)
		.pipe(plugin1(params))
		.pipe(plugin2(params))
		...
		.pipe(pluginN(params))
		.pipe(gulp.dest(<destination>));

Il existe des plugins pour à peu près tout. Ca peut être pour minifier les scripts ou les feuilles de styles, pour valider la syntaxe du javascript, pour compiler les fichiers coffeescript, less, sass, dart, pour transformer les templates en script JS, pour compresser les images, etc... 

La liste est longue et l'objectif de ce tutoriel n'est pas de les couvrir tous. Nous allons donc nous concentrer sur les plugins les plus utilisés/utiles.

	npm install --save-dev del gulp-less gulp-jshint gulp-concat gulp-uglify
	
Rapidement : 
	
* `gulp-less` : permet de compiler les fichiers less (il existe un équivalent pour sass)
* `gulp-jshint` : permet de valider la qualité du code javascript.
* `gulp-concat` : permet de concaténer plusieurs fichiers en un seul
* `gulp-uglify` : salit le code JS pour empêcher qu'il soit lisible une fois déployé en prod.
* `del` : permet de supprimer des fichiers ou des dossiers

Ces dépendances sont sauvées en tant que dépendances de développement.
Une fois ces dépendances installées, il faut les importer dans le `gulpfile` : 

	var gulp = require('gulp');
	var jshint = require('gulp-jshint');
	var less = require('gulp-less');
	var concat = require('gulp-concat');
	var uglify = require('gulp-uglify');
	var rename = require('gulp-rename');
	var del = require('del');

Pour plus de lisibilité et dans l'esprit du "don't repeat yourself", nous allons mutualiser les chemins de l'application dans un objet JS : 

	var paths = {
		dist    : './dist',
		scripts : './client/app/**/*.js',
		styles  : './client/assets/styles/**/*.less',
		html    : './client/**/*.html',
		images  : ['./client/assets/favicon.ico', './client/assets/images/**/*.*']
	};


Tout d'abord, nous allons rajouter les tâches de "cleaning" qui serviront à supprimer du dossier 'dist' certains fichiers avant l'exécution des tâches : 

	/*
	 * Cleans the dist directory
	 */
	gulp.task('clean:scripts', function (cb) {
		del(paths.dist + '/js', cb);
	});
		
	gulp.task('clean:styles', function (cb) {
		del(paths.dist + '/css', cb);
	});
	
	gulp.task('clean:images', function (cb) {
		del(paths.dist + '/images', cb);
	});
	
	gulp.task('clean:html', function (cb) {
		del(paths.dist + '/**/*.html', cb);
	});
	
Nous allons également renommer le fichier `style.css` en `style.less` et éditer son contenu de manière à avoir :

	@bg-color : pink;
	@fg-color : white;	
	body{
		background-color: @bg-color;
		color:@fg-color;
	}

Ensuite nous allons changer la tâche 'styles' de manière à récupérer les fichiers .less et pas les .css et à les transformer à la volée.

	/*
	 * Compiles less files into css
	 */
	gulp.task('styles', ['clean:styles'], function () {
		return gulp.src(paths.styles)
			.pipe(less())
			.pipe(gulp.dest(paths.dist + '/css'));
	});

De la même manière nous allons pouvoir traiter les fichiers javascript, les valider avec JSLint, les concaténer dans un seul fichier et les minifier pour la prod : 

	/*
	 * Checks the validity of JS code
	 */
	gulp.task('lint', function () {
		return gulp.src(paths.scripts)
	        .pipe(jshint())
	        .pipe(jshint.reporter('default'));
	});

	/*
	 * Concatenates & uglifies JS scripts into a single file
	 */
	gulp.task('scripts', ['clean:scripts'], function () {
		return gulp.src(paths.scripts)
			.pipe(uglify())
			.pipe(concat('scripts.min.js'))
			.pipe(gulp.dest(paths.dist + '/js'));
	});

On met également à jour les autres tâches : 

	/*
	 * Copies html files to dist directory
	 */
	gulp.task('html', ['clean:html'], function () {
		return gulp.src(paths.html)
			.pipe(gulp.dest(paths.dist));
	});

	/*
	 * Copies images files to dist directory
	 */
	gulp.task('images', ['clean:images'], function () {
		return gulp.src(paths.images)
			.pipe(gulp.dest(paths.dist + '/img'));
	});

Pour plus de lisibilité, nous allons créer une tâche 'build' qui construira l'intégralité du répertoire 'dist' : 

	gulp.task('build', [
		'lint', 
		'html', 
		'images', 
		'scripts', 
		'styles'
	]);

	gulp.task('default', ['build']);

On modifie le fichier `./client/index.html`:

	<!DOCTYPE html>
	<html>
	<head lang="en">
	    <meta charset="UTF-8">
	    <title>My App</title>
	    <link rel="shortcut icon" href="img/favicon.ico">
	    <link rel="stylesheet" type="text/css" href="css/style.css">
	</head>
	<body>
	
		<h1>Gulp rocks!</h1>
	    <p><img src="img/shlurp.png"/></p>
	    
	<!-- Scripts -->
	<script src="js/scripts.min.js"></script>
	<!-- /Scripts -->
	
	</body>
	</html>

	
Une fois les modifications faites, nous pouvons vérifier que le tout fonctionne correctement :

	$ gulp
	$ open ./dist/index.html

Vous devriez obtenir un résultat qui ressemble à ça : 
![screenshot](http://puu.sh/iEY3E/54992f328d.png =500x)

Le problème ici vient du fait que si notre client était une véritable Single Page Application alors le script `app.js`devrait être chargé en dernier, or là nous voyons qu'il est appelé en premier. De même, dans le cas de Backbone, il est important que les modèles soient chargés avant les collections sous peine d'avoir une exception JS au chargement de la page. Il faut donc dire à Gulp l'ordre dans lequel les fichiers doivent être chargés. Pour cela nous allons utiliser un tableau pour déclarer nos fichiers au lieu d'une regex : 

	var paths = {
		dist    : './dist',
		scripts : [
	        './client/app/models/models.js',
	        './client/app/collections/collections.js',
	        './client/app/views/views.js',
	        './client/app/app.js'
		],
		styles  : './client/assets/styles/**/*.less',
		html    : './client/**/*.html',
		images  : ['./client/assets/favicon.ico', './client/assets/images/**/*.*']
	};

Avec ce tableau, la concaténation va s'opérer dans le bon ordre :
![screenshot2](http://puu.sh/iEYQF/96fa7a81b7.png =500x)

Step 4 : Les watchers
---

Le `gulpfile` que nous avons réalisé permet de créer une version statique du client, mais il peut être fastidieux de devoir re-générer le répertoire 'dist' à chaque changement. Idéalement, il faudrait que le build se fasse à la volée. C'est précisément le rôle des `watchers`.

Les `watchers` vont détecter les moindres changements sur un ensemble de fichiers et vont déclencher, le cas échéant, les tâches qui leur sont associées.

Reprenons notre `gulpfile` et ajoutons lui donc une tâche `watch` :

	/*
	* Watches any change in source code and updates 
	* the dist directory in real time
	*/
	gulp.task('watch', function () {
	   gulp.watch(paths.scripts, ['lint', 'scripts']);
	   gulp.watch(paths.styles, ['styles']);
	   gulp.watch(paths.html, ['html']);
	   gulp.watch(paths.images, ['images']);
	});

Il faut ensuite mettre à jour la tâche par défaut :

	/*
	* Default task, build everything and watches for changes
	*/
	gulp.task('default', ['build', 'watch']);

L'exécution de la tâche va donner lieu à un processus de type 'loop' qu'il sera possible d'arrêter à tout moment avec le raccourci `CTRL+C`.

	$ gulp build
	$ open ./dist/index.html
	$ gulp watch
	
Maintenant essayons de modifier le fichier `client/index.html` en changeant le texte de la balise `h1`par exemple :

	<h1>Gulp is watching you!</h1>
	
Un simple rafraichissement de la page dans le navigateur (`F5` ou `CTRL+R`) devrait permettre de voir apparaître les changements.
Sympa non ?
