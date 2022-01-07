<?php
require_once('./vendor/autoload.php');
require_once('./Class/JWTauth.php');
use Auth\JWTauth;
$test=JWTauth::encode(['2'=>true]);
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials:true');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,ACCESS_TOKEN");
header('Access-Control-Allow-Methods "POST, GET, OPTIONS, DELETE, PUT');
header("Content-Type: application/json; charset=UTF-8");

header("Set-cookie: try22=2");
header("Set-cookie: try=$test");
echo json_encode(['test'=>$test]);