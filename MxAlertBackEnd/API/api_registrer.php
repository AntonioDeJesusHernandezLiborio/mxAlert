<?php
class APIRegistrer {
    private $conn;
    private $db;
    private $sql;

    public function __construct(){
        $this->starDB();
    }
    public function starDB(){
        $this->db = new Conexion();
        $this->conn = $this->db->getConnection();
    }

    public function closeConnection(){
        $this->db->closeConnection( $this->conn );
    }
    public function create($nombre,$ap,$am,$direccion,$telefono,$usuario,$contraseña){

        $clave=md5($contraseña);

        $this->sql = "CALL sp_register('$nombre','$ap','$am','$direccion','$telefono','$usuario','$clave')";
        $insert = $this->conn->query($this->sql);
        if($insert){
            $titleMessage=array("msj"=>"success");
           
        }else{
            $titleMessage=array("msj"=>$insert);
        }
        $json = json_encode($titleMessage,JSON_UNESCAPED_UNICODE);
        $this->closeConnection();
        return $json;
    }
}