<?php
namespace Response;
class Response {

    private int $test;


    private static $success = array(
        "success" => "true",
        "message" => "request ok"
    );
    private static $fail = array(
        "success" => "false",
        "message" => "request failed"
    );
    function __constructor()
    {  
        
    }
    
    static function response200($object)
    {
        header('HTTP/1.1 200 OK');
        header("Content-Type: application/json");
        header("Set-Cookie: samesite-test=1; expires=3600; path=/auth;HttpOnly;Max-Age=3600");
        header("Set-Cookie: samesite-test=2");
        echo json_encode(["status"=>self::$success,"payload"=>$object]);
        
    }

    static function response400()
    {
        header("HTTP/1.1 400 ");
        header("Content-Type: application/json");
        echo json_encode(["status"=>self::$fail]);

    }

    static function response401()
    {
        header("HTTP/1.1 401 Unauthorized");
        header("Content-Type: application/json");
        echo json_encode(["status"=>self::$fail]);

    }
}