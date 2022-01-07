<?php
require_once './db_config.php';
require('./vendor/autoload.php');
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials:true');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept,ACCESS_TOKEN');
header("Access-Control-Allow-Methods: GET, POST,PUT,PATCH,DELETE,OPTIONS");
if($_SERVER['REQUEST_METHOD'] === 'GET')
{
    try{
        $sql = "SELECT * from user_tbl  u
        INNER JOIN major m ON u.major_id = m.major_id  
        WHERE  user_type = 4 and u.deleted = 0;";
        $row = $db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($row);
    }
    catch(Exception $e)
    {
        http_response_code(400);
        echo json_encode($e->getMessage());
    }

    exit(-1);
}


if($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $input = file_get_contents('php://input');
$decode = json_decode($input,true);
if(!count((array)($decode)) || $_SERVER['REQUEST_METHOD'] !== 'POST') 
{
    
    echo json_encode(['status'=>'something went wrong']);
    exit(-1);
}
if( is_null($decode['cmu_mail']) 
|| is_null($decode['password'])
|| is_null($decode['f_name'])
|| is_null($decode['l_name'])
|| is_null($decode['tel'])
){
    http_response_code(400);
    echo json_encode(['status'=>'something went wrong']);
  exit(-1);
}

try{
$sql = "INSERT INTO user_tbl (user_id,username,password,f_name,l_name,major_id,cmu_mail,line_id,facebook_link,tel,user_type) VALUES 
('',:username,:pass,:firstname,:lastname,:major,:cmu_mail,:line_id,:facebook_link,:tel,4)";
$statement = $db->prepare($sql);
$result = $statement->execute(
    [
        ':username' => $decode['username'],
        ':pass' => password_hash($decode['password'],PASSWORD_BCRYPT,['cost'=>12]),
        ':firstname' => $decode['f_name'],
        ':lastname' => $decode['l_name'],
        ':major' => $decode['major_id'],
        ':cmu_mail' => $decode['cmu_mail'],
        ':line_id' => $decode['line_id'],
        ':facebook_link' => $decode['facebook_link'],
        ':tel' => $decode['tel'],
    ]   
    );
    http_response_code(200);
    $encode = json_encode($result);
    echo $encode;
}
catch(Exception $e)
{
    http_response_code(400);
    echo json_encode([$e->getMessage()]);
}

}


else if($_SERVER['REQUEST_METHOD'] === 'PATCH')
{
    $input = file_get_contents('php://input');
$decode = json_decode($input,true);

if( is_null($decode['cmu_mail']) 
|| is_null($decode['f_name'])
|| is_null($decode['l_name'])
|| is_null($decode['tel'])
){
    http_response_code(400);
    echo json_encode(['status'=>'something went wrong']);
  exit(-1);
}

try{
// $sql = "INSERT INTO user_tbl (user_id,username,password,f_name,l_name,major,cmu_mail,line_id,facebook_link,tel,user_type) VALUES 
// ('',:username,:pass,:firstname,:lastname,:major,:cmu_mail,:line_id,:facebook_link,:tel,4)";
$sql = "UPDATE user_tbl SET username=:username,
                            f_name=:firstname,
                            l_name=:lastname,
                            major_id=:major,
                            tel=:tel,
                            cmu_mail=:cmu_mail,
                            line_id=:line_id,
                            facebook_link=:facebook_link
        
";

$bindingParams =  [
    ':user_id'=> $decode['user_id'],
    ':username' => $decode['username'],
    ':firstname' => $decode['f_name'],
    ':lastname' => $decode['l_name'],
    ':major' => $decode['major_id'],
    ':cmu_mail' => $decode['cmu_mail'],
    ':line_id' => $decode['line_id'],
    ':facebook_link' => $decode['facebook_link'],
    ':tel' => $decode['tel'],
];


if(isset($decode['password'])) 
{
 $sql .= ",password=:pass";
 $bindingParams[':pass'] = password_hash($decode['password'],PASSWORD_BCRYPT,['cost'=>12]);
}
$sql .= " WHERE user_id = :user_id;";
$statement = $db->prepare($sql);
$result = $statement->execute(
     $bindingParams
    );
    http_response_code(200);
    $encode = json_encode($result);
    echo $encode;
}
catch(Exception $e)
{
    http_response_code(400);
    echo json_encode([$e->getMessage()]);
}

}

else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
   echo $_SERVER['REQUEST_METHOD'];


    $sql = "UPDATE user_tbl SET 
                deleted=1
                WHERE user_id=:id;";
    $statement = $db->prepare($sql);
    $result = $statement->execute([
        ':id' => $id,
    ]);

    echo json_encode($result);
}
