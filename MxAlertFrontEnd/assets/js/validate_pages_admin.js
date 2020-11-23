const administracion = "Administración";
var tipo_user = localStorage.getItem("tipo");
if (tipo_user != administracion) {
    localStorage.removeItem("tipo");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    window.location.href = './login.html';
}
    
      
