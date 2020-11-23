<?php
require_once('../db/conexion.php');
require_once('../API/api_credentials.php');
require_once('../cors/cors.php');

$method = $_SERVER['REQUEST_METHOD'];

$login = new APICredentials();

switch($method){
    case 'POST':
            $data = json_decode(file_get_contents("php://input"), true);
            echo $login->login($data['usuario'],$data['contrasena']);
        break;
}
