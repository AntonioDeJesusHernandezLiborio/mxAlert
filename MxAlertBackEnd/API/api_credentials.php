<?php
class APICredentials {
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

    public function login($username,$password){
        $this->sql ="CALL sp_login('$username','$password');";
        $select = $this->conn->query($this->sql);

        $resultado = mysqli_num_rows($select);

        $typeNote = array();

        if($resultado>0){
            $row = mysqli_fetch_array($select); 
            $typeNote[] = array(
            'Id'=> $row['cuent_IdCuenta'],
            'nombre'=>$row['cuent_nombre'],
            'tipo_usuario'=>$row['tipoUsu_nombre'],
            'status' => $row['cuent_Status']     
            );  
            $title=array("user"=>$typeNote);
            $json = json_encode($title,JSON_UNESCAPED_UNICODE);
        }else{
            $error []= array('status'=>'Usuario inexistente'); 
            $title=array("user"=>$error);
            $json = json_encode($title,JSON_UNESCAPED_UNICODE);
        }  
        $this->closeConnection();
        return $json;
    }
}