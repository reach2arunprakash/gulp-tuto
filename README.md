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