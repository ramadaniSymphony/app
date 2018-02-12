<?php
/**
 * Created by PhpStorm.
 * User: Edon
 * Date: 2/8/2018
 * Time: 6:46 PM
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class Logs extends Model {
	protected $fillable = [
		'fractional_uk', 'decimal_eu', 'moneyline_usa'
	];
}