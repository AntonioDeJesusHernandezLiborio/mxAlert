<?php
class APIDenuncias {
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
        $this->sql ="CALL sp_denuncia_read();";
        $select = $this->conn->query($this->sql);
        if($select){
            $typeNote = array();
            while ($row = mysqli_fetch_array($select) ) {
                    $typeNote[] = array(
                        'id'=> $row['id'],
                        'descripcion'=>$row['descripcion'],
                        'fecha'=>$row['fecha'],
                        'hora'=>$row['hora'],
                        'estado'=>$row['estado'],
                        'municipio'=>$row['municipio'],
                        'colonia'=>$row['colonia'] ,
                        'calle'=>$row['calle'],
                        'foto'=>$row['foto']       
                    );           
            }
            $title=array("denuncias"=>$typeNote);
            $json = json_encode($title,JSON_UNESCAPED_UNICODE);
        }else{
            $title = array("denuncias"=>$typeNote);
            $error []= array('error'=>'informacion no encontrada'); 
            $json = json_encode($error);
        }  
        
        $this->closeConnection();
        return $json;
    }

    public function insert($descripcion,$foto,$filename,$sourcepat,$estado,$municipio,$colonia,$calle,$clave_denuncia,$clave_cuenta){
        if( ($foto["type"]=='image/jpeg') || ($foto["type"]=='image/png') || ($foto["type"]=='image/jpg') ){
            $ruta = '../img/'.$filename;
            $this->sql = "CALL sp_denuncia_create('$descripcion','$filename','$estado','$municipio','$colonia','$calle','$clave_denuncia','$clave_cuenta')";
        }else{
            $titleMessage = array("msj"=>"errorImage", 
                                  "detailError"=>"el archivo no es valido");
                return json_encode($titleMessage);
        }
        $insert = $this->conn->query($this->sql);
        if($insert){
            $titleMessage=array("msj"=>"success");
            if($filename != ""){
                move_uploaded_file($sourcepat, $ruta);
            }
        }else{
            $titleMessage=array("msj"=>$insert);
        }
        $json = json_encode($titleMessage,JSON_UNESCAPED_UNICODE);
        $this->closeConnection();
        return $json;
    }

    public function update($id,$nivelusuario){
        $this->sql = "CALL sp_accounts_update('$id','$nivelusuario')";
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

    public function delete($id,$razon){
        $this->sql = "CALL sp_accounts_locked('$id','$razon')";
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