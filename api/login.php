<?php
require_once './db_config.php';
require('./vendor/autoload.php');
use Firebase\JWT\JWT;
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();
 $key = $_ENV['JWT_SECRET_KEY'];
 $refresh_key = $_ENV['REFRESH_KEY'];
// $payload = array(
//     "id" => "bangnai",
//     "role" => "teacher",
// );

// $jwt = JWT::encode($payload,$key);
// $decoded = JWT::decode($jwt,$key,array('HS256'));

header("Content-Type: application/json");
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials:true');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept,ACCESS_TOKEN');
$cookie_option = [
    'expires' => 0,
    'path' => '/',
    'secure' => true,     // or false
    'httponly' => true,    // or false
    'samesite' => 'None' // None || Lax  || Strict
];

$input = file_get_contents('php://input');
$decode = json_decode($input,true);
if(!$input || $_SERVER['REQUEST_METHOD'] != 'POST') 
{echo json_encode(['status'=>'error']);}



if($_SERVER['REQUEST_METHOD'] !== 'POST')
{  
    
$payload = ['auth' => 'fail'];
echo json_encode($payload);
return;
}



header("HTTP/1.1 200 OK");
$decode = json_decode($input,true);

try{
    $sql = "SELECT user_id,username,password,user_type,student_id from  user_tbl 
            WHERE username = :username ";
    $statement = $db->prepare($sql);
    $result = $statement->execute(
        [
            ':username' => $decode['username'],
        ]   
        );
    $row = $statement->fetch(PDO::FETCH_ASSOC);

    if($result && $statement->rowCount() > 0)
    {        
            $checkPassword = password_verify($decode['password'],$row['password']);
            if($checkPassword) 
         {   
            
            $payload = array(
                "username" => $row['username'],
                "role" => $row['user_type'],
                "id" => $row['user_id'],
                "iat" => time(),
                "nbf" => time()+(60*60)
            );
            $JWT = JWT::encode($payload,$key);
            setcookie('refresh_token',JWT::encode($payload,$refresh_key),60*60*24*7);
            echo json_encode(
                [
                'id'=>$row['user_id'],
                'username'=>$row['username'],
                'role'=>$row['user_type'],
                'auth' => true,
                'ACCESS_TOKEN' => $JWT
                ]);
            }

            else echo json_encode(['false'=>true,'error'=>'Email or Password not correct']);
    }
    else {
        echo json_encode(['false'=>true,'error'=>'Email or Password not correct']);
    }
        
    }
    catch(Exception $e)
    {
        http_response_code(400);
        echo json_encode($e->getMessage());
        // echo json_encode(['error'=>'Username has been taken']);
        exit(-1);
    }
    
//  $dotenv = Dotenv::createImmutable(__DIR__);
//  $dotenv->load();
//  echo json_encode($jwt);



?>