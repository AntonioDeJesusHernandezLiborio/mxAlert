<?php
require_once('../db/conexion.php');
require_once('../API/api_denuncias.php');
require_once('../cors/cors.php');


$option = $_POST['option'];

$typeUser = new APIDenuncias();

switch($option){
    case 'getData':
            echo $typeUser->getData();
        break;
    case 'insert':
            $foto=$_FILES['file-imagen'];
            $filename=$_FILES["file-imagen"]["name"];
            $surcepat=$_FILES["file-imagen"]["tmp_name"];
            echo $typeUser->insert($_POST['descripcion'],$foto,$filename,$surcepat,$_POST['estado'],$_POST['municipio'],$_POST['colonia'],$_POST['calle'],$_POST['clave_denuncia'],$_POST['clave_cuenta']);
        break;
    case 'update':
            echo $typeUser->update($_POST['id'],$_POST['clave_cuenta']);
        break;
    case 'delete':
            echo 'SIN METODO';//$typeUser->delete($_POST['id']);
        break;

}
