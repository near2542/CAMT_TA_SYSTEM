<?php
namespace Auth;
require_once('./vendor/autoload.php');

use Firebase\JWT\JWT;
use Dotenv\Dotenv;
use Exception;

class JWTauth {
    private static $defaultTime = 3600;
    function __construct()
    {
    }
    public static function encode($payload)
    {
        $payload = [
            "iat" => time(),
            "exp"=> time()+self::$defaultTime,
            "payload"=>$payload,
        ];
    
        return JWT::encode($payload,'haha');
    }

    public static function verify($payload){

        try{
            $decoded = JWT::decode($payload,'haha',array('HS256'));
           
            return $decoded;
        }
        catch(Exception $e){
            echo $e->getMessage();
            return json_encode(false);
        }
       
       
    }
}
