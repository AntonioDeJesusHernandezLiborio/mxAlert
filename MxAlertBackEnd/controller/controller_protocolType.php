<?php
require_once('../db/conexion.php');
require_once('../API/api_protocolType.php');
require_once('../cors/cors.php');

$method = $_SERVER['REQUEST_METHOD'];

$typeUser = new APIProtocol();

switch($method){
    case 'GET':
            echo $typeUser->getData();
        break;
    case 'POST':
            $data = json_decode(file_get_contents("php://input"), true);
            echo $typeUser->insert($data['protocolo'],$data['tipo']);
        break;
    case 'PUT':
            $data = json_decode(file_get_contents("php://input"), true);
            echo $typeUser->update($data['id'], $data['protocolo'],$data['tipo']);
        break;
    case 'DELETE':
            echo $typeUser->delete($_REQUEST['id']);
        break;
}
