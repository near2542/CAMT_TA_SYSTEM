<?php

require_once './db_config.php';
require('./vendor/autoload.php');
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials:true');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept,ACCESS_TOKEN');

use Firebase\JWT\JWT;

$test = 3;
try{
$test = JWT::decode('test','haha',array('HS256'));
}
catch(Exception $e)
{
    $test = "fail but ok";
}


echo $test;


