<?php
require_once('./vendor/autoload.php');

use Firebase\JWT\JWT;
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

 $secret = $dotenv['JWT_SECRET_KEY'];
 $defaultTime = 3600;
    
function encode($payload)
{
    global $defaultTime;
    global $secret;
    $payload = [
        "iat" => time(),
        "exp" => time() + $defaultTime,
        "payload" => $payload,
    ];

    return JWT::encode($payload, $secret);
}


function verify($payload){
    global $secret;
    try{
        $decoded = JWT::decode($payload,$secret,array('HS256'));
       
        return $decoded;
    }
    catch(Exception $e){
        echo $e->getMessage();
        return json_encode(false);
    }
}