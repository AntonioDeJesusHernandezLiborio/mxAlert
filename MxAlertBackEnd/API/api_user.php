<?php
class APIUser {
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

     public function getData($id){
        $this->sql ="CALL sp_user_read('$id')";
        $select = $this->conn->query($this->sql);
        if($select){
            $typeNote = array();
            while ($row = mysqli_fetch_array($select) ) {
                    $typeNote[] = array(
                        'id'=> $row['cuent_IdCuenta'],
                        'nombre'=>$row['nombre'],
                        'telefono'=>$row['telefono'],
                        'usuario'=>$row['usuario'],
                        'estado'=>$row['estado'],
                        'tipo_cuenta'=>$row['tipoUsu_nombre'],
                        'fecha'=>$row['fecha'] ,
                        'id_tipo_cuenta'=>$row['cuent_FK_tipUsu_idUsuario'],
                        'cantidad_denuncias'=>$row['cantidadDenuncia']           
                    );           
            }
            $title=array("accounts"=>$typeNote);
            $json = json_encode($title,JSON_UNESCAPED_UNICODE);
        }else{
            $title = array("accounts"=>$typeNote);
            $error []= array('error'=>'informacion no encontrada'); 
            $json = json_encode($error);
        }  
        
        $this->closeConnection();
        return $json;
    }
}