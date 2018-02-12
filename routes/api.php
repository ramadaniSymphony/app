<?php
/**
 * Created by PhpStorm.
 * User: Edon
 * Date: 2/8/2018
 * Time: 5:38 PM
 */

$app->get('/', function () use ($app) {
	return view('index');
});
$app->post('/save', 'LogsController@save');