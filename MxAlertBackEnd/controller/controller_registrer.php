<?php
require_once('../db/conexion.php');
require_once('../API/api_registrer.php');
require_once('../cors/cors.php');

$method = $_SERVER['REQUEST_METHOD'];

$typeUser = new APIRegistrer();
switch($method){

    case 'POST':
            $data = json_decode(file_get_contents("php://input"), true);
            echo $typeUser->create($data['nombre'],$data['ap'],$data['am'],$data['direccion'],$data['telefono'],$data['usuario'],$data['contraseña']);
        break;
}
