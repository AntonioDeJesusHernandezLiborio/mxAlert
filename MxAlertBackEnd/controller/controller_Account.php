<?php
require_once('../db/conexion.php');
require_once('../API/api_Account.php');
require_once('../cors/cors.php');

$method = $_SERVER['REQUEST_METHOD'];

$typeUser = new APIAccount();

switch($method){
    case 'GET':
            echo $typeUser->getData();
        break;
    case 'POST':
            $data = json_decode(file_get_contents("php://input"), true);
            echo $typeUser->insert($data['nombre'],$data['ap'],$data['am'],$data['direccion'],$data['telefono'],$data['usuario'],$data['contraseña'],$data['rol']);
        break;
    case 'PUT':
            $data = json_decode(file_get_contents("php://input"), true);
            echo $typeUser->update($data['id'], $data['nivelusuario']);
        break;
    case 'DELETE':
            echo $typeUser->delete($_REQUEST['id'],$_REQUEST['razon']);
        break;
}
