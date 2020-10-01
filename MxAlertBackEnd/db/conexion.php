<?php
 class Conexion {
    private $connection;
    private $host = 'localhost';
    private $database = "dbmxalert";
    private $userName = "root";
    private $pwd = "";

    public function __construct() {
        $this->connection = mysqli_connect($this->host, $this->userName, $this->pwd, $this->database);
     }

     public function closeConnection($cnn){
        mysqli_close($cnn);
     }

     public function getConnection(){
         return $this->connection;
     }
}