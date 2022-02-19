<?php
require_once('./header.php');
require_once('./db_config.php');

use Firebase\JWT\JWT;

// function refreshTheToken()
// {
    $refreshToken = $_COOKIE['refresh_token'];
    if (!$refreshToken) {
        http_response_code(401);
        die('no permission');
    }
    try {

        $validate = JWT::decode($refreshToken, $_ENV['REFRESH_KEY'],['HS256']);
    
        if ($validate) {
            $payload = array(
                "username" => $validate->username,
                "role" => $validate->role,
                "id" => $validate->id,
                "iat" => time(),
                "nbf" => time() + 10,
                "exp" => time() + (60 * 60),
            );

            $JWT = JWT::encode($payload, $_ENV['JWT_SECRET_KEY']);
            $refreshToken = JWT::encode($payload,$E_ENV['JWT_REFRESH_KEY']);
            echo json_encode(['ACCESS_TOKEN' =>$JWT,'REFRESH_TOKEN'=>$refreshToken]);
         
        }
    } catch (Exception $e) {
       
        throw $e->getMessage();
    }
// }

// die(refreshTheToken());
