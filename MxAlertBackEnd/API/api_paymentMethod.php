<?php
class APIpaymentMethod {
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

     public function getData(){
        $this->sql ="CALL sp_paymentMethod_read();";
        $select = $this->conn->query($this->sql);
        $typeNote = array();
        if($select){
            while ($row = mysqli_fetch_array($select) ) {
                    $typeNote[] = array(
                        'id'=> $row['id'],
                        'nombre'=>$row['nombre']                    
                    );           
            }
            $title=array("paymentMethod"=>$typeNote);
            $json = json_encode($title,JSON_UNESCAPED_UNICODE);
        }else{
            $title = array("paymentMethod"=>$typeNote);
            $error []= array('error'=>'informacion no encontrada'); 
            $json = json_encode($error);
        }  
        
        $this->closeConnection();
        return $json;
    }

    public function insert($nombre){
        $this->sql = "CALL sp_paymentMethod_create('$nombre')";
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

    public function update($id, $nombre){
        $this->sql = "CALL sp_paymentMethod_update('$id','$nombre')";
        $update = $this->conn->query($this->sql);
        if($update){
            $titleMessage=array("msj"=>"success");
           
        }else{
            $titleMessage=array("msj"=>$update);
        }
        $json = json_encode($titleMessage,JSON_UNESCAPED_UNICODE);
        $this->closeConnection();
        return $json;
    }

    public function delete($id){
        $this->sql = "CALL sp_paymentMethod_delete('$id')";
        $delete = $this->conn->query($this->sql);
        if($delete){
            $titleMessage=array("msj"=>"success");
           
        }else{
            $titleMessage=array("msj"=>$delete);
        }
        $json = json_encode($titleMessage,JSON_UNESCAPED_UNICODE);
        $this->closeConnection();
        return $json;
    } 
}