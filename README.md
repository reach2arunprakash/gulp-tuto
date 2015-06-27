Gulp
===

Gulp est un système de build comparable à Grunt qui se base sur le système de "stream" de NodeJS pour effectuer des tâches plus ou moins complexes.

Installation
---
La première étape consiste à installer gulp en tant que module global npm et à l'enregristrer parmi les dépendances de développement de votre projet:

	npm install -g gulp
	mkdir myapp
	cd myapp
	npm init
	npm install --save-dev gulp
	
A partir de là Gulp est installé et prêt à exécuter toutes les tâches de build de votre projet. Il manque néanmoins une étape pour que Gulp soit complètement fonctionnel : le `gulpfile.js`

	touch gulpfile.js

Les tâches
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

Les instructions de base
---

Gulp propose quelques instructions de base pour la manipulation des fichiers et des dossiers.

* `gulp.src` : sélectionne un ensemble de fichiers sources
* `pipe` : opérateur qui permet de chainer les opérations
* `gulp.dest` : copie le résultat de la chaine de traitement vers un répertoire de destination.

Modifions à présent la structure du répertoire de manière à avoir le squelette d'une application qui ressemblerait à cela : 

	├── client
	│   ├── app
	│   │   └── main.js
	│   ├── assets
	│   │   └── style.css
	│   └── index.html
	├── gulpfile.js
	├── node_modules
	└── package.json
	
A présent, pour illustrer le fonctionnement des instructions de base de Gulp, nous allons éditer le `gulpfile` de la manière suivante :

	var gulp = require('gulp');

	// Scripts
	gulp.task('scripts', function () {
		gulp.src('./client/app/**/*.js')
		.pipe(gulp.dest('./dist'));
	});

	// Stylesheets
	gulp.task('styles', function () {
		gulp.src('./client/assets/**/*.css')
		.pipe(gulp.dest('./dist'));
	});
	
	// HTML
	gulp.task('html', function () {
		gulp.src('./client/**/*.html')
		.pipe(gulp.dest('./dist'));
	});
	
	// Default
	gulp.task('default', ['html', 'scripts', 'styles']);

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
	
Bien que cela puisse déjà s'avérer utile, ce n'est qu'un début. Gulp peut faire bien plus que ça.