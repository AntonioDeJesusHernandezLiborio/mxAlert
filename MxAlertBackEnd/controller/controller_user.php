<?php
require_once('../db/conexion.php');
require_once('../API/api_user.php');
require_once('../cors/cors.php');

$method = $_SERVER['REQUEST_METHOD'];

$typeUser = new APIUser();

switch($method){
    case 'GET':
            $data = json_decode(file_get_contents("php://input"), true);
            echo $typeUser->getData($data['id']);
        break;
    case 'POST':
            $data = json_decode(file_get_contents("php://input"), true);
            echo $typeUser->getData($data['id']);
        break;
    case 'PUT':
            $data = json_decode(file_get_contents("php://input"), true);
            echo $typeUser->update($data['id'], $data['nivelusuario']);
        break;
    case 'DELETE':
            echo $typeUser->delete($_REQUEST['id'],$_REQUEST['razon']);
        break;
}
