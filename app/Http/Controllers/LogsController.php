<?php
/**
 * Created by PhpStorm.
 * User: Edon
 * Date: 2/9/2018
 * Time: 10:22 AM
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LogsController extends Controller {
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		//
	}

	/*
	 * Save the data from the request to the database table (logs)
	 */
	public function save(Request $request) {
		//exit('123');
		$payload = json_decode($request->getContent(), true);
		$result = DB::insert('insert into logs (fractional_uk, decimal_eu, moneyline_usa) values (?, ?, ?)', [$payload['fractional_uk'], $payload['decimal_eu'], $payload['moneyline_usa']]);
		return ($result) ? ["result" => true] : ["result" => false];
	}
}