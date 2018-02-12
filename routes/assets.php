<?php
/**
 * Created by PhpStorm.
 * User: Edon
 * Date: 2/8/2018
 * Time: 5:39 PM
 *
 */
// If the application tries to find files on the node_modules folders, return the contents of that file if it exists
$app->get('node_modules/{jsfile:[@0-9a-zA-Z\-\_\.\/]+\.js$}', function ($jsfile) use ($app){
	$js_file_path = app()->basePath().'/node_modules/'.$jsfile;
	if (file_exists($js_file_path)) {
		$h = fopen($js_file_path, 'r');
		$contents = fread($h, filesize($js_file_path));
		fclose($h);
		return $contents;
	} else {
		exit('404');
	}
});

// If the application tries to find the angular files, return the contents of that file if it exists
$app->get('angular/{jsfile:[@0-9a-zA-Z\-\_\.\/]+\.js$}', function ($jsfile) use ($app){
	$js_file_path = app()->basePath().'/resources/angular/src/'.$jsfile;
	if (file_exists($js_file_path)) {
		$h = fopen($js_file_path, 'r');
		$contents = fread($h, filesize($js_file_path));
		fclose($h);
		return $contents;
	} else {
		exit('404');
	}
});