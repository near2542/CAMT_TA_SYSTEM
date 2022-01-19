<?php
require_once('./vendor/autoload.php');
use Dotenv\Dotenv;

$env = Dotenv::createImmutable(__DIR__);
$env->load();
$origin = filter_var($_ENV['PRODUCTION'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ? $_ENV['ALLOW_ORIGIN_PRODUCTION'] : $_ENV['ALLOW_ORIGIN_DEV'];
header("Content-Type: application/json;charset=utf8");
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Credentials:true');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept,ACCESS_TOKEN');
header("Access-Control-Allow-Methods: GET, POST,PUT,PATCH,DELETE");