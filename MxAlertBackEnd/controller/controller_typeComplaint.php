<?php
require_once('../db/conexion.php');
require_once('../API/api_typeComplaint.php');
require_once('../cors/cors.php');

$method = $_SERVER['REQUEST_METHOD'];

$typeUser = new APITypeComplaint();

switch($method){
    case 'GET':
            echo $typeUser->getData();
        break;
    case 'POST':
            $data = json_decode(file_get_contents("php://input"), true);
            echo $typeUser->insert($data['nombre']);
        break;
    case 'PUT':
            $data = json_decode(file_get_contents("php://input"), true);
            echo $typeUser->update($data['id'], $data['nombre']);
        break;
    case 'DELETE':
            echo $typeUser->delete($_REQUEST['id']);
        break;
}
