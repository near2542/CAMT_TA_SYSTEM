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
    $sql = "SELECT user_id,username,password,user_type,student_id from  user_tbl 
            WHERE username = :username AND (deleted = 0 or deleted is null) ";
    $statement = $db->prepare($sql);
    $result = $statement->execute(
        [
            ':username' => $decode['username'],
        ]   
        );
        try{
    $row = $statement->fetch(PDO::FETCH_ASSOC);
        }
        catch(Exception $e)
        {
            die($e->getMessage());
        }

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
                "nbf" => time()+10,
                "exp"=> time() +(60*60),
            );
            $JWT = JWT::encode($payload,$key);
            setcookie('refresh_token',JWT::encode($payload,$refresh_key),time()+60*60*24*7);
            die(json_encode(
                [
                'status'=>'success',
                'ACCESS_TOKEN' => $JWT
                ]));
            }
        
            die(json_encode(['error'=>'Email or Password not correct','status'=>401]));
    }
    else {
        die(json_encode(['error'=>'Email or Password not correct','status'=>401]));
    }
        
    }
    catch(Exception $e)
    {
        die(json_encode($e->getMessage()));
        // echo json_encode(['error'=>'Username has been taken']);
        exit(-1);
    }
    
//  $dotenv = Dotenv::createImmutable(__DIR__);
//  $dotenv->load();
//  echo json_encode($jwt);
