<?php
require_once('./header.php');
require_once './db_config.php';
use Firebase\JWT\JWT;
 $key = $_ENV['JWT_SECRET_KEY'];
 $refresh_key = $_ENV['REFRESH_KEY'];



$input = file_get_contents('php://input');
$decode = json_decode($input,true);
if(!$input || $_SERVER['REQUEST_METHOD'] !== 'POST') 
{die(json_encode(['status'=>'error']));}



// if($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'OPTIONS')
// {  
    
// $payload = ['auth' => 'fail'];
// die(json_encode($payload));
// return;
// }



$decode = json_decode($input,true);

try{
    header("HTTP/1.1 200 OK");
    $sql = "SELECT user_id,username,password,user_type,student_id from  user_tbl 
            WHERE username = :username AND deleted = 0 ";
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
            // echo $checkPassword;
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
            setcookie('refresh_token',JWT::encode($payload,$key),60*60*24*7);
            die(json_encode(
                [
                
                'id'=>$row['user_id'],
                'username'=>$row['username'],
                'role'=>$row['user_type'],
                'auth' => true,
                'ACCESS_TOKEN' => $JWT
                ]));
            }

            die(json_encode(['false'=>true,'error'=>'Email or Password not correct']));
    }
    else {
        die(json_encode(['false'=>true,'error'=>'Email or Password not correct']));
    }
        
    }
    catch(Exception $e)
    {
        http_response_code(400);
        die(json_encode($e->getMessage()));
        // echo json_encode(['error'=>'Username has been taken']);
        exit(-1);
    }
    
//  $dotenv = Dotenv::createImmutable(__DIR__);
//  $dotenv->load();
//  echo json_encode($jwt);



?>