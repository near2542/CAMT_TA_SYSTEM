<?php
require_once('./header.php');
require_once './db_config.php';

use Firebase\JWT\JWT;

$headers = getallheaders();



$access_token_headers = isset($headers['AUTHORIZATION']) ? $headers['AUTHORIZATION'] : null;

if (!strpos($access_token_headers, 'Bearer: ')) throw ('No Permission');

$ACCESS_TOKEN = substr($access_token_headers, strlen('Bearer: ') - 1);

if (is_null($ACCESS_TOKEN)) {
    http_response_code(401);
    die('No Permission');
}

try {
    $validate = JWT::decode($ACCESS_TOKEN, $_ENV['JWT_SECRET_KEY'], ['HS256']);
} catch (Exception $e) {
    http_response_code(401);
    die('No Permission');
}
echo json_encode(!!$validate);
// $test = JWT::decode();