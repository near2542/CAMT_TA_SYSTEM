<?php
require_once('./header.php');
require_once './db_config.php';
require('./vendor/autoload.php');
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials:true');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept,ACCESS_TOKEN');


$input = file_get_contents('php://input');
$decode = json_decode($input,true);
if(!count((array)($decode)) || $_SERVER['REQUEST_METHOD'] !== 'POST') 
{
    
    echo json_encode(['status'=>'something went wrong']);
    exit(-1);
}

if(is_null($decode['TA_type']) 
|| is_null($decode['email']) 
|| is_null($decode['password'])
|| is_null($decode['firstname'])
|| is_null($decode['lastname'])
|| is_null($decode['tel'])
){
    http_response_code(400);
    echo json_encode(['status'=>'something went wrong']);
  exit(-1);
}

try{
$sql = "INSERT INTO user_tbl VALUES 
('',:username,:pass,:firstname,:lastname,:student_id,:major,:cmu_mail,:line_id,:facebook_link,:tel,:portfolio_link,:user_type,NULL,NULL)";
$statement = $db->prepare($sql);
$result = $statement->execute(
    [
        ':username' => $decode['username'],
        ':pass' => password_hash($decode['password'],PASSWORD_BCRYPT,['cost'=>12]),
        ':firstname' => $decode['firstname'],
        ':lastname' => $decode['lastname'],
        ':student_id' => $decode['student_id'],
        ':major' => $decode['major'],
        ':cmu_mail' => $decode['email'],
        ':line_id' => $decode['line'],
        ':facebook_link' => $decode['facebook'],
        ':tel' => $decode['tel'],
        ':portfolio_link' => $decode['portfolio'],
        ':user_type' => $decode['TA_type']  
    ]   
    );
    if(!$result) throw new Exception('something went wrong');
    http_response_code(200);
    $encode = json_encode($result);
    echo $encode;
}
catch(Exception $e)
{
    http_response_code(400);
    echo json_encode(['error'=>$e->getMessage()]);
}


return;

